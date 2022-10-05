<template>
    <article class="searchContainer">
        <h2>검색하기</h2>
        <form>
            <fieldset>
                <legend class="a11yHidden">날짜 또는 범위 선택</legend>
                <input
                    v-model="isRange"
                    type="radio"
                    name="isRange"
                    id="single"
                    :value="false"
                />
                <label for="isRange">날짜</label>
                <input
                    v-model="isRange"
                    type="radio"
                    name="isRange"
                    id="range"
                    :value="true"
                />
                <label for="isRange">범위</label>
            </fieldset>
            <fieldset>
                <label for="date" v-if="!isRange">
                    날짜를 선택해 주세요.
                </label>
                <label for="date" v-else> 날짜 범위를 선택해 주세요. </label>
                <select name="date" v-model="startMonth">
                    <option
                        v-for="(_, index) in MONTH"
                        :key="index"
                        :value="index"
                    >
                        {{ index + 1 }}월
                    </option>
                </select>
                <select v-model="startDay">
                    <option v-for="i in MONTH[startMonth]" :key="i" :value="i">
                        {{ i }}일
                    </option>
                </select>
                <template v-if="isRange">
                    <span>~</span>
                    <select name="date" v-model="endMonth">
                        <option
                            v-for="(_, index) in MONTH"
                            :key="index"
                            :value="index"
                        >
                            {{ index + 1 }}월
                        </option>
                    </select>
                    <select v-model="endDay">
                        <option
                            v-for="i in MONTH[endMonth]"
                            :key="i"
                            :value="i"
                        >
                            {{ i }}일
                        </option>
                    </select>
                </template>
            </fieldset>
            <button
                type="button"
                @click="
                    isRange
                        ? showResult()
                        : $refs.result.redirectResult(
                              calculateDataNo(startMonth, startDay)
                          )
                "
            >
                검색
            </button>
        </form>
        <section v-if="resultArr.length !== 0">
            <ol>
                <li v-for="num in resultArr" :key="num">
                    <FlowerResult ref="result" :searchFor="num" />
                </li>
            </ol>
        </section>
        <FlowerResult :searchFor="1" />
    </article>
</template>

<script lang="ts">
import FlowerResult from "./FlowerResult.vue";
import { MONTH, calculateDataNo } from "@/store";
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
        };
    },
    methods: {
        showResult(): void {
            this.resultArr.length = 0;
            this.resultArr = [];
            const startDate = calculateDataNo(this.startMonth, this.startDay);
            let endDate = calculateDataNo(this.endMonth, this.endDay);
            if (startDate === endDate) {
                this.redirectToResult();
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
    },
    components: {
        FlowerResult,
    },
};
</script>

<style lang="scss">
.searchContainer {
    @include container(1240, 10);
    padding: 48px 5% 36px;
}
</style>
