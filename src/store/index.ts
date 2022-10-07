import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";

Vue.use(Vuex);

const FONT_COLOR = {
    SPRING: "#4e944f",
    SUMMER: "#3b9ae1",
    FALL: "#aa4a30",
    WINTER: "#64638f",
};

const BACKGROUND_COLOR = {
    SPRING: "#b4e197",
    SUMMER: "#b2dffb",
    FALL: "#e89f71",
    WINTER: "#cbc9ff",
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

export const MONTH = [31, 29, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

export const calculateDataNo = (month: number, day: number): number => {
    return MONTH.slice(0, month).reduce((a, b) => a + b, 0) + day;
};

export const getData = async (dataNo: number): Promise<Document> => {
    const queryString = `?serviceKey=${process.env.VUE_APP_SERVICE_KEY}&dataNo=${dataNo}`;
    const response = await axios.get(axios.defaults.baseURL + queryString);
    const data = await response.data;
    const result = new DOMParser().parseFromString(data, "text/xml");
    return result;
};

export const INITIALIZE_DATE = "INITIALIZE_DATE";
export const SET_FLOWER = "SET_FLOWER";
export const GET_FLOWER_DATA = "GET_FLOWER_DATA";
export const SET_DEFAULT_COLOR = "SET_DEFAULT_COLOR";

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
        defaultColor: {
            font: FONT_COLOR.SPRING,
            background: BACKGROUND_COLOR.SPRING,
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
        },
        [SET_DEFAULT_COLOR](state, dataNo) {
            if (dataNo >= 61 && dataNo <= 152) {
                state.defaultColor.font = FONT_COLOR.SPRING;
                state.defaultColor.background = BACKGROUND_COLOR.SPRING;
            } else if (dataNo >= 153 && dataNo <= 244) {
                state.defaultColor.font = FONT_COLOR.SUMMER;
                state.defaultColor.background = BACKGROUND_COLOR.SUMMER;
            } else if (dataNo >= 245 && dataNo <= 335) {
                state.defaultColor.font = FONT_COLOR.FALL;
                state.defaultColor.background = BACKGROUND_COLOR.FALL;
            } else {
                state.defaultColor.font = FONT_COLOR.WINTER;
                state.defaultColor.background = BACKGROUND_COLOR.WINTER;
            }
        },
    },
    actions: {
        async [GET_FLOWER_DATA]({ commit }, dataNo) {
            commit(SET_FLOWER, {
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
            });
            try {
                const result = await getData(dataNo);
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
                commit(SET_DEFAULT_COLOR, dataNo);
                return;
            } catch (error) {
                console.error(error);
            }
        },
    },
    modules: {},
});
