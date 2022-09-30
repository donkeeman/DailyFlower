<template>
    <div id="app">
        <Header></Header>
    </div>
</template>

<script lang="ts">
import Header from "@/components/Header.vue";
export default {
    components: {
        Header,
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
