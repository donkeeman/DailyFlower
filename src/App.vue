<template>
    <div id="app">
        <Header></Header>
        <TodayFlower></TodayFlower>
    </div>
</template>

<script lang="ts">
import Header from "@/components/Header.vue";
import TodayFlower from "./components/TodayFlower.vue";
export default {
    components: {
        Header,
        TodayFlower,
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
