<template>
    <article class="resultContainer" @click="$emit('redirect', searchFor)">
        <img :src="img" alt="꽃 사진" class="thumbnail" />
        <div class="textWrapper">
            <p class="date">{{ month }}월 {{ day }}일</p>
            <p class="flowerName">{{ flowerName }}</p>
        </div>
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
    @include container(320, 0);
    border: 2px solid $GRAY;
    cursor: pointer;
    @include flex(row, 0, normal, center);
    padding: 6px 10px;
    gap: 20px;
    &:hover {
        transform: translateY(-4px);
        transition: transform 0.2s;
    }

    .thumbnail {
        width: 90px;
    }
    .textWrapper {
        color: $BLACK;
        @include flex(column, 4, space-between);
        padding-top: 4px;
        text-align: left;
        .date {
            @include setFontSize(24);
        }
        .flowerName {
            @include setFontSize(20);
        }
    }
}

@media screen and (max-width: 400px){
    .resultContainer{
        width: 240px;
    }
}
</style>
