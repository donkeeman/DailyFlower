import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";

Vue.use(Vuex);

// 윤년인지 검사
const monthArr = [0, 31, 29, 31, 30, 31, 30, 31, 31, 30, 31, 30];

const calculateDataNo = (month: number, day: number): number => {
    return monthArr.slice(0, month + 1).reduce((a, b) => a + b, 0) + day;
};

const breakLine = (str: string): Array<string> => {
    return str
        ?.split(/다\. /g)
        .map((elem, index, arr) => {
            elem = elem.replace(/<[/]*p>|\r|\n|amp;/g, "");
            if (index !== arr.length - 1) {
                return elem + "다.";
            } else {
                return elem;
            }
        })
        .filter((elem) => elem !== "")
        .map((elem) => {
            if (elem.slice(-1) !== ".") {
                return elem + ".";
            } else {
                return elem;
            }
        });
};

const upperFirstChar = (str: string): string => {
    return str[0].toUpperCase() + str.slice(1);
};

export const INITIALIZE_DATE = "INITIALIZE_DATE";
export const SET_FLOWER = "SET_FLOWER";
export const GET_FLOWER_DATA = "GET_FLOWER_DATA";

export default new Vuex.Store({
    state: {
        today: {
            month: 0,
            day: 0,
            dataNo: 0,
        },
        flowerData: {
            month: 0,
            day: 0,
            korName: "",
            engName: "",
            sctName: "",
            language: "",
            imgArray: [],
            content: "",
            use: "",
            grow: "",
            type: "",
        },
    },
    mutations: {
        // 페이지를 열 때마다 오늘의 날짜를 얻어와서 초기화
        [INITIALIZE_DATE](state) {
            const date = new Date();
            state.today = {
                month: date.getMonth() + 1,
                day: date.getDate(),
                dataNo: calculateDataNo(date.getMonth(), date.getDate()),
            };
        },
        [SET_FLOWER](state, data) {
            state.flowerData = data;
            // Vue.set(state.flowerData, "flowerName", name);
        },
    },
    actions: {
        async [GET_FLOWER_DATA]({ commit }, dataNo) {
            const queryString = `?serviceKey=${process.env.VUE_APP_SERVICE_KEY}&dataNo=${dataNo}`;
            try {
                const response = await axios.get(
                    axios.defaults.baseURL + queryString
                );
                const data = await response.data;
                const result = new DOMParser().parseFromString(
                    data,
                    "text/xml"
                );
                const month =
                    result.getElementsByTagName("fMonth")[0].textContent;
                const day = result.getElementsByTagName("fDay")[0].textContent;
                const korName =
                    result.getElementsByTagName("flowNm")[0].textContent;
                const engName = upperFirstChar(
                    result.getElementsByTagName("fEngNm")[0]
                        .textContent as string
                );
                const sctName = upperFirstChar(
                    result.getElementsByTagName("fSctNm")[0]
                        .textContent as string
                );
                const language = result
                    .getElementsByTagName("flowLang")[0]
                    .textContent?.replace(".", "");
                const imgArray = [];
                for (let i = 0; i < 3; i++) {
                    imgArray.push(
                        result.getElementsByTagName(`imgUrl${i + 1}`)[0]
                            .textContent
                    );
                }
                const content = breakLine(
                    result.getElementsByTagName("fContent")[0]
                        .textContent as string
                );
                const use = breakLine(
                    result.getElementsByTagName("fUse")[0].textContent as string
                ).join("<br>");
                const grow = breakLine(
                    result.getElementsByTagName("fGrow")[0]
                        .textContent as string
                ).join("<br>");
                const type = breakLine(
                    result.getElementsByTagName("fType")[0]
                        .textContent as string
                ).join("<br>");
                commit(SET_FLOWER, {
                    month,
                    day,
                    korName,
                    engName,
                    sctName,
                    language,
                    imgArray,
                    content,
                    use,
                    grow,
                    type,
                });
                return;
            } catch (error) {
                console.error(error);
            }
        },
    },
    modules: {},
});
