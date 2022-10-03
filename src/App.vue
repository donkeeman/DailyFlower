<template>
    <div id="app">
        <Header></Header>
        <main class="main">
            <template v-if="getPath === ''">
                <TodayFlower />
            </template>
            <template v-else-if="getPath === 'info'">
                <router-view :key="$route.fullPath">
                    <FlowerInfo />
                </router-view>
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
    width: 100%;
    height: 100vh;
    background-color: $BACKGROUND_SPRING;
    font-family: "ChosunGs", "GangwonEdu_OTFBoldA";
}

.main {
    box-sizing: border-box;
    padding: 0 20px;
    display: flex;
    align-items: center;
    background-color: $BACKGROUND_SPRING;
}

.a11yHidden {
    @include a11yHidden();
}
</style>
