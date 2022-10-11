<template>
    <article
        class="resultContainer"
        @click="
            flowerName && month && day && img && $emit('redirect', searchFor)
        "
    >
        <template v-if="flowerName && month && day && img">
            <img :src="img" alt="꽃 사진" class="thumbnail" />
            <div class="textWrapper">
                <p class="date">{{ month }}월 {{ day }}일</p>
                <p class="flowerName">{{ flowerName }}</p>
            </div>
        </template>
        <template v-else>
            <!-- <Loading :isResult="true" :dataNo="searchFor" @retry="returnData" /> -->
            <Loading :isResult="true" />
        </template>
    </article>
</template>

<script lang="ts">
import { getDataByDate } from "@/store";
import { mapState } from "vuex";
import Loading from "./Loading.vue";

export default {
    props: ["searchFor"],
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
    methods: {
        async returnData(dataNo: number): Promise<Document | undefined> {
            return await getDataByDate(dataNo);
        },
    },
    async mounted(): void {
        const result = await this.returnData(this.searchFor);
        if (result) {
            this.flowerName =
                result.getElementsByTagName("flowNm")[0].textContent;
            this.month = result.getElementsByTagName("fMonth")[0].textContent;
            this.day = result.getElementsByTagName("fDay")[0].textContent;
            this.img = result.getElementsByTagName("imgUrl1")[0].textContent;
        }
    },
    components: {
        Loading,
    },
};
</script>

<style lang="scss">
.resultContainer {
    .loadingWrapper {
        padding-top: 8px;
        height: 86px;
        text-align: left;
        gap: 4px;
        align-items: flex-start;
        .failed {
            @include setFontSize(16);
        }
    }
    @include container(320, 0);
    border: 2px solid $GRAY;
    cursor: pointer;
    @include flex(row, 20, normal, center);
    padding: 6px 10px;
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

@media screen and (max-width: 400px) {
    .resultContainer {
        width: 240px;
    }
}
</style>
