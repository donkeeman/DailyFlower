<template>
    <article class="resultContainer" :style="setFontColor" @click="redirectToResult(searchFor)">
        <img />
        <p>{{ month }}월 {{ day }}일</p>
        <p>{{ flowerName }}</p>
    </article>
</template>

<script lang="ts">
import { getData } from "@/store";
import { mapState } from "vuex";

export default {
    props: ["searchFor", "redirectResult"],
    data(): unknown {
        return {
            month: 0,
            day: 0,
            flowerName: "",
            img: "",
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
        redirectToResult(dataNo: number): void {
            this.$router.push({
                path: "/info/" + dataNo,
            });
        },
    },
    async mounted(): void {
        const result = await getData(this.searchFor);
        this.flowerName = result.getElementsByTagName("flowNm")[0].textContent;
        this.month = result.getElementsByTagName("fMonth")[0].textContent;
        this.day = result.getElementsByTagName("fDay")[0].textContent;
        this.img = result.getElementsByTagName("imgUrl1")[0].textContent;
    },
};
</script>

<style lang="scss">
.resultContainer {
    @include container(300, 10);
    border: 1.5px solid $BLACK;
    cursor: pointer;
}
</style>
