<template>
    <article class="todayContainer" :style="setFontColor">
        <!-- v-if로 데이터를 다 불러오면 띄우기 -->
        <!-- api 에러났을 경우에는 잠시후 다시 시도해 주세요 띄우기 -->
        <!-- 데이터 불러왔는지 체크하는 변수와 데이터가 에러인지 체크하는 변수 추가하기 -->
        <h2>오늘의 꽃</h2>
        <div class="imgWrapper">
            <img :src="flowerData.imgArray[0]" alt="꽃 사진" />
        </div>
        <h3 class="a11yHidden">꽃 이름</h3>
        <strong class="flowerName">{{ flowerData.korName }}</strong>
        <h3 class="a11yHidden">꽃말</h3>
        <p class="flowerLanguage">" {{ flowerData.language }} "</p>
        <router-link :to="'/info/' + today.dataNo" class="infoLink">
            자세히 알아보기
        </router-link>
    </article>
</template>

<script lang="ts">
import { mapState } from "vuex";
import { INITIALIZE_DATE, GET_FLOWER_DATA } from "@/store";
export default {
    computed: {
        ...mapState(["today", "flowerData", "defaultColor"]),
        setFontColor(): unknown {
            return {
                "--font-color": this.defaultColor.font,
            };
        },
    },
    mounted(): void {
        this.$store.commit(INITIALIZE_DATE);
        this.$store.dispatch(GET_FLOWER_DATA, this.$store.state.today.dataNo);
    },
};
</script>

<style lang="scss" scoped>
.todayContainer {
    @include container(900, 12);
    color: var(--font-color);
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
</style>
