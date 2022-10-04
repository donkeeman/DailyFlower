<template>
    <div id="app" :style="setBackgroundColor">
        <Header></Header>
        <main class="main" :style="setBackgroundColor">
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
import { mapState } from "vuex";
export default {
    components: {
        Header,
        TodayFlower,
        FlowerInfo,
    },
    computed: {
        ...mapState(["defaultColor"]),
        getPath(): string {
            return this.$route.path.split("/")[1];
        },
        setBackgroundColor(): unknown {
            return {
                "--background-color": this.defaultColor.background,
            };
        },
    },
};
</script>

<style lang="scss">
#app {
    width: 100%;
    height: 100vh;
    background-color: var(--background-color);
    font-family: "ChosunGs", "GangwonEdu_OTFBoldA";
    color: $BLACK;
}

.main {
    box-sizing: border-box;
    padding: 0 20px;
    display: flex;
    align-items: center;
    background-color: var(--background-color);
}

.a11yHidden {
    @include a11yHidden();
}
</style>
