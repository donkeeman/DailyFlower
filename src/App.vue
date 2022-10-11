<template>
    <div id="app" :style="setColor">
        <Header></Header>
        <main class="main">
            <template v-if="getPath === ''">
                <TodayFlower />
            </template>
            <template
                v-else-if="
                    getPath === 'info' &&
                    parseInt($route.params.dataNo) >= 1 &&
                    parseInt($route.params.dataNo) <= 366
                "
            >
                <router-view :key="$route.fullPath">
                    <FlowerInfo />
                </router-view>
            </template>
            <template v-else-if="getPath === 'search'">
                <router-view :key="$route.fullPath">
                    <FlowerSearch />
                </router-view>
            </template>
            <template v-else>
                <NotFound />
            </template>
        </main>
        <img src="@/assets/img/meta.png" alt="메타 태그 이미지" class="meta" />
    </div>
</template>

<script lang="ts">
import Header from "@/components/Header.vue";
import TodayFlower from "./components/TodayFlower.vue";
import FlowerInfo from "./components/FlowerInfo.vue";
import FlowerSearch from "./components/FlowerSearch.vue";
import NotFound from "./components/NotFound.vue";
import { mapState } from "vuex";
import { StyleValue } from "@vue/runtime-dom";
export default {
    components: {
        Header,
        TodayFlower,
        FlowerInfo,
        FlowerSearch,
        NotFound,
    },
    computed: {
        ...mapState(["defaultColor"]),
        getPath(): string {
            return this.$route.path.split("/")[1];
        },
        setColor(): StyleValue {
            return {
                "--font-color": this.defaultColor.font,
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
    padding-top: 64px;
    background-color: var(--background-color);
    font-family: "ChosunGs", "GangwonEdu_OTFBoldA";
    color: $BLACK;
    scrollbar-color: rgba(var(--font-color), 0.6) transperant;
    scrollbar-width: thin;
    overflow-y: scroll;
}

.main {
    box-sizing: border-box;
    padding: 0 20px;
    @include flex(row, 0, normal, center);
    background-color: var(--background-color);
}

.a11yHidden {
    @include a11yHidden();
}

.meta {
    display: none;
}

@media screen and (max-width: 300px) {
    #app {
        background-color: $WHITE;
    }
    .main {
        padding: 0;
        margin: 0;
        background-color: $WHITE;
        overflow-x: hidden;
    }
}

::-webkit-scrollbar {
    width: 12px;
}

::-webkit-scrollbar-thumb {
    background-color: rgba(var(--font-color), 0.6);
}

::-webkit-scrollbar-button {
    width: 0;
    height: 0;
}

::-webkit-scrollbar-track {
    background-color: transparent;
}
</style>
