import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";

Vue.use(Vuex);

const FONT_COLOR = {
    SPRING: "78, 148, 79",
    SUMMER: "59, 154, 225",
    FALL: "170, 74, 48",
    WINTER: "100, 99, 143",
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
            elem = elem.replace(/<[/]*p>|\r|\n|amp;/g, "").replace(".'", ".");
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

const getData = async (queryString: string): Promise<Document> => {
    const response = await axios.get(axios.defaults.baseURL + queryString);
    const data = await response.data;
    const result = new DOMParser().parseFromString(data, "text/xml");
    return result;
};

export const getDataByToday = async (): Promise<Document> => {
    const queryString = `/selectTodayFlower01?serviceKey=${process.env.VUE_APP_SERVICE_KEY}`;
    return await getData(queryString);
};

export const getDataByDate = async (dataNo: number): Promise<Document> => {
    const queryString = `/selectTodayFlowerView01?serviceKey=${process.env.VUE_APP_SERVICE_KEY}&dataNo=${dataNo}`;
    return await getData(queryString);
};

export const getDataByKorName = async (name: string): Promise<Document> => {
    const queryString = `/selectTodayFlowerList01?serviceKey=${process.env.VUE_APP_SERVICE_KEY}&numOfRows=366&searchType=1&searchWord=${name}`;
    return await getData(queryString);
};

export const getDataByEngName = async (name: string): Promise<Document> => {
    const queryString = `/selectTodayFlowerList01?serviceKey=${process.env.VUE_APP_SERVICE_KEY}&numOfRows=366&searchType=3&searchWord=${name}`;
    return await getData(queryString);
};

export const getDataByLang = async (lang: string): Promise<Document> => {
    const queryString = `/selectTodayFlowerList01?serviceKey=${process.env.VUE_APP_SERVICE_KEY}&numOfRows=366&searchType=4&searchWord=${lang}`;
    return await getData(queryString);
};

export const SET_FLOWER = "SET_FLOWER";
export const GET_FLOWER_DATA = "GET_FLOWER_DATA";
export const SET_DEFAULT_COLOR = "SET_DEFAULT_COLOR";

export default new Vuex.Store({
    state: {
        flowerData: {
            month: 0,
            day: 0,
            dataNo: 0,
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
        [SET_FLOWER](state, data) {
            state.flowerData = data;
        },
        [SET_DEFAULT_COLOR](state) {
            if (
                state.flowerData.dataNo >= 61 &&
                state.flowerData.dataNo <= 152
            ) {
                state.defaultColor.font = FONT_COLOR.SPRING;
                state.defaultColor.background = BACKGROUND_COLOR.SPRING;
            } else if (
                state.flowerData.dataNo >= 153 &&
                state.flowerData.dataNo <= 244
            ) {
                state.defaultColor.font = FONT_COLOR.SUMMER;
                state.defaultColor.background = BACKGROUND_COLOR.SUMMER;
            } else if (
                state.flowerData.dataNo >= 245 &&
                state.flowerData.dataNo <= 335
            ) {
                state.defaultColor.font = FONT_COLOR.FALL;
                state.defaultColor.background = BACKGROUND_COLOR.FALL;
            } else {
                state.defaultColor.font = FONT_COLOR.WINTER;
                state.defaultColor.background = BACKGROUND_COLOR.WINTER;
            }
        },
    },
    actions: {
        async [GET_FLOWER_DATA]({ commit }, number = 0) {
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
                let result;
                if (!number) {
                    result = await getDataByToday();
                } else {
                    result = await getDataByDate(number);
                }
                const month =
                    result.getElementsByTagName("fMonth")[0].textContent;
                const day = result.getElementsByTagName("fDay")[0].textContent;
                const dataNo =
                    result.getElementsByTagName("dataNo")[0].textContent;
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
                    dataNo,
                    sctName,
                    language,
                    imgArray,
                    content,
                    use,
                    grow,
                    type,
                });
                commit(SET_DEFAULT_COLOR);
                return;
            } catch (error) {
                console.error(error);
            }
        },
    },
    modules: {},
});
