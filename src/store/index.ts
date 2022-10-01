import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";

Vue.use(Vuex);

// 윤년인지 검사
const month = [0, 31, 29, 31, 30, 31, 30, 31, 31, 30, 31, 30];

export const INITIALIZE_DATE = "INITIALIZE_DATE";
export const SET_FLOWER = "SET_FLOWER";
export const GET_FLOWER_DATA = "GET_FLOWER_DATA";

export default new Vuex.Store({
    state: {
        today: {
            month: 0,
            day: 0,
            dateNo: 0,
        },
        flowerData: {
            flowerName: "",
            flowerLanguage: "",
            flowerImg: [],
        },
    },
    mutations: {
        // 페이지를 열 때마다 오늘의 날짜를 얻어와서 초기화
        [INITIALIZE_DATE](state) {
            const date = new Date();
            const days =
                month.slice(0, date.getMonth() + 1).reduce((a, b) => a + b, 0) +
                date.getDate();
            state.today = {
                month: date.getMonth() + 1,
                day: date.getDate(),
                dateNo: days,
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
                console.log(result);
                const flowerImg = [
                    result.getElementsByTagName("imgUrl1")[0].textContent,
                    result.getElementsByTagName("imgUrl2")[0].textContent,
                    result.getElementsByTagName("imgUrl3")[0].textContent,
                ];

                const flowerName =
                    result.getElementsByTagName("flowNm")[0].textContent;
                const flowerLanguage =
                    result.getElementsByTagName("flowLang")[0].textContent;
                commit(SET_FLOWER, {
                    flowerName,
                    flowerLanguage,
                    flowerImg,
                });
                return;
            } catch (error) {
                console.error(error);
            }
        },
    },
    modules: {},
});
