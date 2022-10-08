<template>
    <article class="searchContainer" :style="setFontColor">
        <h2>검색하기</h2>
        <form class="searchForm">
            <fieldset class="fieldset range">
                <legend class="a11yHidden">날짜 또는 범위 선택</legend>
                <label for="single">
                    <input
                        v-model="isRange"
                        type="radio"
                        name="isRange"
                        id="single"
                        :value="false"
                    />
                    날짜
                </label>
                <label for="range">
                    <input
                        v-model="isRange"
                        type="radio"
                        name="isRange"
                        id="range"
                        :value="true"
                    />
                    범위
                </label>
            </fieldset>
            <fieldset class="fieldset search">
                <label class="message" for="date" v-if="!isRange">
                    날짜를 선택해 주세요.
                </label>
                <label class="message" for="date" v-else>
                    날짜 범위를 선택해 주세요.
                </label>
                <select name="date" v-model="startMonth" class="select">
                    <option
                        v-for="(_, index) in MONTH"
                        :key="index"
                        :value="index"
                    >
                        {{ index + 1 }}
                    </option>
                </select>
                <span>월</span>
                <select v-model="startDay" class="select">
                    <option v-for="i in MONTH[startMonth]" :key="i" :value="i">
                        {{ i }}
                    </option>
                </select>
                <span>일</span>
                <template v-if="isRange">
                    <span class="divide">~</span>
                    <select name="date" v-model="endMonth" class="select">
                        <option
                            v-for="(_, index) in MONTH"
                            :key="index"
                            :value="index"
                        >
                            {{ index + 1 }}
                        </option>
                    </select>
                    <span>월</span>
                    <select v-model="endDay" class="select">
                        <option
                            v-for="i in MONTH[endMonth]"
                            :key="i"
                            :value="i"
                        >
                            {{ i }}
                        </option>
                    </select>
                    <span>일</span>
                </template>
            </fieldset>
            <button
                type="button"
                @click="isRange ? showResult() : redirectToResult()"
                class="button search"
            >
                검색
            </button>
        </form>
        <section v-if="resultArr.length !== 0 && isRange">
            <h3 class="a11yHidden">검색 결과</h3>
            <ol class="resultSection">
                <li v-for="num in sliceResult()" :key="num">
                    <FlowerResult
                        @redirect="redirectToResult"
                        :searchFor="num"
                    />
                </li>
            </ol>
            <button
                type="button"
                class="button more"
                v-if="resultArr.length >= 10 * resultCount"
                @click="resultCount++"
            >
                더보기
            </button>
        </section>
    </article>
</template>

<script lang="ts">
import FlowerResult from "./FlowerResult.vue";
import { mapState } from "vuex";

const MONTH = [31, 29, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

const calculateDataNo = (month: number, day: number): number => {
    return MONTH.slice(0, month).reduce((a, b) => a + b, 0) + day;
};

export default {
    data(): unknown {
        return {
            MONTH: MONTH,
            resultArr: [],
            isRange: false,
            selectedMonth: 0,
            selectedDay: 1,
            startMonth: 0,
            startDay: 1,
            endMonth: 0,
            endDay: 1,
            resultCount: 1,
        };
    },
    computed: {
        ...mapState(["defaultColor"]),
        setFontColor(): unknown {
            return {
                "--font-color": this.defaultColor.font,
            };
        },
    },
    methods: {
        redirectToResult(dataNo = 0): void {
            if (dataNo === 0) {
                dataNo = calculateDataNo(this.startMonth, this.startDay);
            }
            this.$router.push({
                path: "/info/" + dataNo,
            });
        },
        showResult(): void {
            this.resultCount = 1;
            this.resultArr.length = 0;
            this.resultArr = [];
            const startDate = calculateDataNo(this.startMonth, this.startDay);
            let endDate = calculateDataNo(this.endMonth, this.endDay);
            if (startDate === endDate) {
                this.redirectToResult(startDate);
            }
            if (startDate > endDate) {
                endDate += 366;
            }
            for (let i = startDate; i <= endDate; i++) {
                if (i > 366) {
                    this.resultArr.push(i - 366);
                } else {
                    this.resultArr.push(i);
                }
            }
        },
        sliceResult(): Array<number> {
            return this.resultArr.slice(0, 10 * this.resultCount);
        },
    },
    components: {
        FlowerResult,
    },
};
</script>

<style lang="scss">
.searchContainer {
    .button {
        @include setFontSize(16);
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
        @include flex(row, 48, center, center);
        .fieldset {
            border: none;
            word-break: keep-all;
            label,
            span {
                @include setFontSize(20);
                margin: 0 4px;
                vertical-align: middle;
                display: inline-block;
            }
            .message {
                display: block;
            }
            input[type="radio"] {
                accent-color: rgb(var(--font-color));
                width: 20px;
                height: 20px;
                vertical-align: -4px;
            }
            .select {
                @include setFontSize(14);
                display: inline-block;
                height: 32px;
                padding: 0 10px 0 20px;
                margin: 0;
                border: 2px solid $GRAY;
                border-radius: 6px;
                background-color: $WHITE;
            }
        }
    }
    .resultSection {
        width: 100%;
        @include flex(row, 12, center);
        flex-wrap: wrap;
    }
    .more {
        margin-top: 20px;
        width: 100%;
    }
}

@media screen and (max-width: 800px) {
    .searchContainer {
        .searchForm {
            gap: 12px;
            .fieldset {
                .message,
                .divide {
                    display: block;
                }
            }
        }
    }
}

@media screen and (max-width: 500px) {
    .searchContainer {
        padding: 24px 5% 12px;
        .searchForm {
            margin: 20px auto;
            @include flex(column, 24, space-between, center);
            .fieldset {
                .select {
                    padding: 0 4px 0 8px;
                }
            }
            .button {
                padding: 8px 8px 4px;
                width: 100%;
            }
        }
        .resultSection {
            flex-direction: column;
        }
    }
}
</style>
