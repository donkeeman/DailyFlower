import Vue from "vue";
import VueRouter, { RouteConfig } from "vue-router";
import TodayFlower from "@/components/TodayFlower.vue";
import FlowerSearch from "@/components/FlowerSearch.vue";
import FlowerInfo from "@/components/FlowerInfo.vue";

Vue.use(VueRouter);

const routes: Array<RouteConfig> = [
    { path: "/", component: TodayFlower },
    { path: "/search", component: FlowerSearch },
    { path: "/info/:dataNo", component: FlowerInfo },
];

const router = new VueRouter({
    mode: "history",
    base: process.env.BASE_URL,
    routes,
});

export default router;
