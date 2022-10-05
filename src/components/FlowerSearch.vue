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
            <fieldset v-if="isRange === false">
                <label for="date"> 날짜를 선택해 주세요. </label>
                <select name="date" v-model="selectedMonth">
                    <option
                        v-for="(_, index) in MONTH"
                        :key="index"
                        :value="index"
                    >
                        {{ index + 1 }}월
                    </option>
                </select>
                <select v-model="selectedDay">
                    <option
                        v-for="i in MONTH[selectedMonth]"
                        :key="i"
                        :value="i"
                    >
                        {{ i }}일
                    </option>
                </select>
            </fieldset>
            <button type="button" @click="redirectToResult($event)">
                검색
            </button>
        </form>
        <!-- <section>
            <ol>
                <li v-for="(num, index) in queryArr" :key="index">
                    <FlowerResult :searchFor="num" />
                </li>
            </ol>
        </section> -->
    </article>
</template>

<script lang="ts">
// import FlowerResult from "./FlowerResult.vue";
import { MONTH, calculateDataNo } from "@/store";
export default {
    data(): unknown {
        return {
            MONTH: MONTH,
            queryArr: [],
            isRange: false,
            selectedMonth: 0,
            selectedDay: 1,
        };
    },
    methods: {
        redirectToResult(e: Event): boolean {
            e.stopPropagation();
            e.preventDefault();
            const startDate = calculateDataNo(
                this.selectedMonth,
                this.selectedDay
            );
            this.$router.push({
                path: "/info/" + startDate,
            });
            return false;
        },
    },
    components: {
        // FlowerResult,
    },
};
</script>

<style lang="scss">
.searchContainer {
    @include container(1240, 10);
    padding: 48px 5% 36px;
}
</style>
