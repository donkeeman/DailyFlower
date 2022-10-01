<template>
    <div id="app">
        <Header></Header>
        <main class="main">
            <template v-if="getPath === ''">
                <TodayFlower></TodayFlower>
            </template>
            <template v-else-if="getPath === 'info'">
                <FlowerInfo></FlowerInfo>
            </template>
        </main>

        <!-- 검색, 검색 결과 페이지 추가 -->
    </div>
</template>

<script lang="ts">
import Header from "@/components/Header.vue";
import TodayFlower from "./components/TodayFlower.vue";
import FlowerInfo from "./components/FlowerInfo.vue";
export default {
    components: {
        Header,
        TodayFlower,
        FlowerInfo,
    },
    computed: {
        getPath(): string {
            return this.$route.path.split("/")[1];
        },
    },
};
</script>

<style lang="scss">
#app {
    @include commonFont;
    width: 100vw;
    height: 100vh;
    background-color: $BACKGROUND_SPRING;
}
</style>
