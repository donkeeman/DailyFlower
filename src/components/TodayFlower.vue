<template>
    <article class="todayContainer" :style="setFontColor">
        <template v-if="flowerData.korName === ''">
            <Loading
                :retry="
                    () => {
                        $store.dispatch(GET_FLOWER_DATA);
                    }
                "
            />
        </template>
        <template v-else>
            <h2>오늘의 꽃</h2>
            <div class="imgWrapper">
                <img :src="flowerData.imgArray[0]" alt="꽃 사진" />
            </div>
            <h3 class="a11yHidden">꽃 이름</h3>
            <strong class="flowerName">{{ flowerData.korName }}</strong>
            <h3 class="a11yHidden">꽃말</h3>
            <p class="flowerLanguage">" {{ flowerData.language }} "</p>
            <router-link :to="'/info/' + flowerData.dataNo" class="infoLink">
                자세히 알아보기
            </router-link>
        </template>
    </article>
</template>

<script lang="ts">
import { mapState } from "vuex";
import { GET_FLOWER_DATA } from "@/store";
import Loading from "./Loading.vue";
import { StyleValue } from "@vue/runtime-dom";
export default {
    computed: {
        ...mapState(["flowerData", "defaultColor"]),
        setFontColor(): StyleValue {
            return {
                "--font-color": this.defaultColor.font,
            };
        },
    },
    mounted(): void {
        this.$store.dispatch(GET_FLOWER_DATA);
    },
    components: {
        Loading,
    },
};
</script>

<style lang="scss" scoped>
.todayContainer {
    @include container(900, 12);
    color: rgb(var(--font-color));
    text-align: center;
    padding: 44px 8% 32px;
    .imgWrapper {
        margin: 22px auto 26px;
        width: 405px;
        img {
            width: 100%;
        }
    }
    h2 {
        @include setFontSize(32);
    }
    .flowerName {
        @include setFontSize(40);
    }
    .flowerLanguage {
        @include setFontSize(24);
        margin: 12px auto 44px;
    }
    .infoLink {
        @include setFontSize(20);
        text-decoration: underline;
    }
}

@media screen and (max-width: 500px) {
    .todayContainer {
        .imgWrapper {
            margin: 16px auto 20px;
            width: 270px;
            img {
                width: 100%;
            }
        }
    }
}

@media screen and (max-width: 300px) {
    .todayContainer {
        padding: 30px 0;
    }
}
</style>
