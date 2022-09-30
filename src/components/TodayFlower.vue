<template>
    <div class="todayContainer">
        <!-- v-if로 데이터를 다 불러오면 띄우기 -->
        <!-- api 에러났을 경우에는 잠시후 다시 시도해 주세요 띄우기 -->
        <!-- 데이터 불러왔는지 체크하는 변수와 데이터가 에러인지 체크하는 변수 추가하기 -->
        <h2>오늘의 꽃</h2>
        <div class="imgWrapper">
            <img :src="flowerData.flowerImg[0]" alt="꽃 사진" />
        </div>
        <strong class="flowerName" title="꽃 이름">{{
            flowerData.flowerName
        }}</strong>
        <p class="flowerLanguage" title="꽃말">
            " {{ flowerData.flowerLanguage }} "
        </p>
        <router-link :to="'/info/' + today.dateNo" class="infoLink"
            >자세히 알아보기</router-link
        >
    </div>
</template>

<script lang="ts">
import { mapState } from "vuex";
import { INITIALIZE_DATE, GET_FLOWER_DATA } from "@/store";
export default {
    computed: {
        ...mapState(["today", "flowerData"]),
    },
    methods: {},
    mounted(): void {
        this.$store.commit(INITIALIZE_DATE);
        this.$store.dispatch(GET_FLOWER_DATA, this.$store.state.today.dateNo);
    },
};
</script>

<style lang="scss">
.todayContainer {
    @include container(900, 12);
    padding: 36px 0 32px;
    .imgWrapper {
        margin: 16px auto 20px;
        width: 405px;
        img {
            width: 100%;
        }
    }
    h2 {
        @include commonFont(32, $FONT_SPRING);
    }
    .flowerName {
        @include commonFont(40, $FONT_SPRING);
    }
    .flowerLanguage {
        @include commonFont(24, $FONT_SPRING);
        margin: 12px auto 44px;
    }
    .infoLink {
        @include commonFont(20, $FONT_SPRING);
        text-decoration: underline;
    }
}
</style>
