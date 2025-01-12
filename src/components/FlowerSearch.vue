<template>
    <article class="searchContainer" :style="setFontColor">
        <h2>검색하기</h2>
        <form class="searchForm">
            <fieldset class="fieldset range">
                <legend class="a11yHidden">검색 필터</legend>
                <select
                    class="select type"
                    v-model="searchType"
                    @change="clearResult"
                >
                    <option value="date">날짜 (단일)</option>
                    <option value="range">날짜 (범위)</option>
                    <option value="name">꽃 이름</option>
                    <option value="lang">꽃말</option>
                </select>
            </fieldset>
            <!-- 날짜, 날짜 범위 등 날짜 검색인 경우 -->
            <fieldset
                class="fieldset date"
                v-if="searchType === 'date' || searchType === 'range'"
            >
                <legend class="a11yHidden">검색 정보 입력</legend>
                <label class="message" for="date" v-if="searchType === 'date'">
                    날짜를 선택해 주세요.
                </label>
                <label class="message" for="date" v-else>
                    날짜 범위를 선택해 주세요.
                </label>
                <select name="date" v-model="startMonth" class="select date">
                    <option
                        v-for="(_, index) in monthArr"
                        :key="index"
                        :value="index"
                    >
                        {{ index + 1 }}
                    </option>
                </select>
                <span>월</span>
                <select v-model="startDay" class="select date">
                    <option
                        v-for="i in monthArr[startMonth]"
                        :key="i"
                        :value="i"
                    >
                        {{ i }}
                    </option>
                </select>
                <span>일</span>
                <template v-if="searchType === 'range'">
                    <span class="divide">~</span>
                    <select name="date" v-model="endMonth" class="select date">
                        <option
                            v-for="(_, index) in monthArr"
                            :key="index"
                            :value="index"
                        >
                            {{ index + 1 }}
                        </option>
                    </select>
                    <span>월</span>
                    <select v-model="endDay" class="select date">
                        <option
                            v-for="i in monthArr[endMonth]"
                            :key="i"
                            :value="i"
                        >
                            {{ i }}
                        </option>
                    </select>
                    <span>일</span>
                </template>
            </fieldset>
            <!-- 꽃 이름, 꽃말 등 input:text인 경우 -->
            <fieldset class="fieldset text" v-else>
                <label
                    for="search"
                    class="message"
                    v-if="searchType === 'name'"
                >
                    꽃 이름을 입력해 주세요.
                </label>
                <label
                    for="search"
                    class="message"
                    v-else-if="searchType === 'lang'"
                >
                    꽃말을 입력해 주세요.
                </label>
                <input
                    type="text"
                    id="search"
                    :placeholder="
                        searchType === 'name'
                            ? '한글 또는 영어로 작성해 주세요.'
                            : '한글로 작성해 주세요.'
                    "
                    v-model="searchWord"
                    @keydown="searchByEnter"
                />
            </fieldset>
            <button type="button" @click="showResult" class="button search">
                검색
            </button>
        </form>
        <section v-if="searchType !== 'date'">
            <h3 class="a11yHidden">검색 결과</h3>
            <template v-if="isSearching">
                <Loading />
            </template>
            <template v-else>
                <p class="noResult" v-if="resultArr[0] === -1">
                    검색 결과가 없습니다.
                </p>
                <ol class="resultList" v-else>
                    <template v-if="searchType === 'range'">
                        <li v-for="num in sliceResult()" :key="num">
                            <FlowerResult
                                @redirect="redirectToResult"
                                :searchFor="num"
                            />
                        </li>
                    </template>
                    <template v-else>
                        <li v-for="(result, i) in sliceResult()" :key="i">
                            <FlowerResult
                                @redirect="redirectToResult"
                                :resultElem="result"
                            />
                        </li>
                    </template>
                </ol>
                <button
                    type="button"
                    class="button more"
                    v-if="resultArr.length > 10 * resultCount"
                    @click="resultCount++"
                >
                    더보기
                </button>
            </template>
        </section>
    </article>
</template>

<script lang="ts">
import FlowerResult from "./FlowerResult.vue";
import Loading from "./Loading.vue";
import { mapState } from "vuex";
import { getDataByKorName, getDataByEngName, getDataByLang } from "@/store";

export default {
    data(): unknown {
        return {
            monthArr: [31, 29, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31],
            searchType: "date",
            resultArr: [],
            selectedMonth: 0,
            selectedDay: 1,
            startMonth: 0,
            startDay: 1,
            endMonth: 0,
            endDay: 1,
            resultCount: 1,
            searchWord: "",
            isSearching: false,
        };
    },
    computed: {
        ...mapState(["defaultColor"]),
        setFontColor() {
            return {
                "--font-color": this.defaultColor.font,
            };
        },
    },
    methods: {
        searchByEnter(e: KeyboardEvent): void {
            if (e.key === "Enter") {
                e.preventDefault();
                this.showResult();
            }
        },
        showResult(): void {
            switch (this.searchType) {
                case "date":
                    this.redirectToResult();
                    break;
                case "range":
                    this.showResultByDate(
                        this.calculateDataNo(this.startMonth, this.startDay),
                        this.calculateDataNo(this.endMonth, this.endDay)
                    );
                    break;
                case "name":
                    this.showResultByText(this.searchWord);
                    break;
                case "lang":
                    this.showResultByText(this.searchWord);
                    break;
            }
        },
        redirectToResult(dataNo = 0): void {
            if (dataNo === 0) {
                dataNo = this.calculateDataNo(this.startMonth, this.startDay);
            }
            this.$router.push({
                path: "/info/" + dataNo,
            });
        },
        showResultByDate(startDate: number, endDate: number): void {
            this.clearResult();
            this.isSearching = true;
            if (startDate === endDate) {
                this.redirectToResult(startDate);
            }
            if (startDate > endDate) {
                endDate += 366;
            }
            const numArr = [];
            for (let i = startDate; i <= endDate; i++) {
                if (i > 366) {
                    numArr.push(i - 366);
                } else {
                    numArr.push(i);
                }
            }
            this.resultArr = numArr.length ? numArr : [-1];
            this.isSearching = false;
        },
        async showResultByText(word: string): Promise<void> {
            this.clearResult();
            word = word.trim();
            if (!word) {
                this.resultArr = [-1];
                return;
            }
            this.isSearching = true;
            let result;
            if (this.searchType === "name") {
                if (/[A-Za-z ]/g.test(word)) {
                    result = await getDataByEngName(word);
                } else {
                    result = await getDataByKorName(word);
                }
            } else {
                result = await getDataByLang(word);
            }
            const elemArr = Array.from(
                result.getElementsByTagName("result")
            ).reverse();
            this.resultArr = elemArr.length ? elemArr : [-1];
            this.isSearching = false;
        },
        sliceResult(): Array<number> {
            return this.resultArr.slice(0, 10 * this.resultCount);
        },
        calculateDataNo(month: number, day: number): number {
            return (
                this.monthArr
                    .slice(0, month)
                    .reduce((a: number, b: number) => a + b, 0) + day
            );
        },
        clearResult(): void {
            this.resultCount = 1;
            this.resultArr.length = 0;
            this.resultArr = [];
        },
    },
    components: {
        FlowerResult,
        Loading,
    },
};
</script>

<style lang="scss">
.searchContainer {
    .button {
        @include setFontSize(18);
        font-family: "ChosunGs", "GangwonEdu_OTFBoldA";
        border: 2px solid $GRAY;
        border-radius: 10px;
        padding: 8px 16px 4px;
        &:hover {
            background-color: $GRAY;
        }
    }
    @include container(900, 12);
    text-align: center;
    padding: 48px 2% 36px;
    h2 {
        @include setFontSize(32);
        color: rgb(var(--font-color));
    }
    .searchForm {
        margin: 40px auto;
        @include flex(row, 64, center, center);
        .fieldset {
            border: none;
            word-break: keep-all;
            label,
            span {
                @include setFontSize(24);
                display: inline-block;
                margin: 0 4px;
                &.divide {
                    margin-right: 8px;
                }
                vertical-align: middle;
            }
            .message {
                display: block;
                margin-bottom: 8px;
            }
            .select {
                @include setFontSize(16);
                display: inline-block;
                height: 32px;
                margin: 0;
                border: 2px solid $GRAY;
                border-radius: 6px;
                background-color: $WHITE;
                &.date {
                    padding: 0 10px 0 20px;
                }
                &.type {
                    padding: 0 10px;
                }
            }
            input[type="text"] {
                @include setFontSize(16);
                display: inline-block;
                height: 32px;
                padding: 0 10px;
                margin: 0;
                border: 2px solid $GRAY;
                border-radius: 6px;
                background-color: $WHITE;
                &::placeholder {
                    font-family: "ChosunGs", "GangwonEdu_OTFBoldA";
                    font-style: italic;
                }
            }
        }
    }
    .loadingWrapper {
        height: 300px;
    }
    .noResult {
        @include flex(row, 0, center, center);
        @include setFontSize(32);
        height: 300px;
    }
    .resultList {
        width: 100%;
        @include flex(row, 12, center);
        flex-wrap: wrap;
    }
    .more {
        margin-top: 20px;
        width: 100%;
    }
}

@media screen and (max-width: 850px) {
    .searchContainer {
        padding: 24px 5% 12px;
        .searchForm {
            margin: 20px auto;
            @include flex(column, 36, space-between, center);
            .fieldset {
                label,
                span {
                    @include setFontSize(24);
                }
                .message {
                    margin-bottom: 12px;
                }
                .divide {
                    margin: 4px 0 0 0;
                }
                .select {
                    padding: 0 4px 0 8px;
                    @include setFontSize(18);
                }
                input[type="text"] {
                    @include setFontSize(18);
                }
            }
            .button {
                width: 100%;
                padding: 10px 0 6px;
            }
            .resultSection {
                flex-direction: column;
            }
        }
    }
}

@media screen and (max-width: 600px) {
    .searchContainer {
        .searchForm {
            .fieldset {
                .divide {
                    display: block;
                }
            }
        }
    }
}
</style>
