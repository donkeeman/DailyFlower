<template>
    <article class="infoContainer">
        <h2 class="date">{{ flowerData.month }}월 {{ flowerData.day }}일</h2>
        <div class="upperWrapper">
            <div class="imgWrapper">
                <img
                    v-for="(imgSrc, index) in flowerData.imgArray"
                    :key="index"
                    :src="imgSrc"
                    alt="꽃 사진"
                    class="imgs"
                />
            </div>
            <section class="contentSection">
                <div class="nameWrapper">
                    <h3 class="a11yHidden">꽃 이름</h3>
                    <p class="flowerName">
                        {{ flowerData.korName }}
                    </p>
                    <div class="subNameWrapper">
                        <h3 class="a11yHidden">꽃 영문 이름</h3>
                        <p class="subName eng">
                            {{ flowerData.engName }}
                        </p>
                        <h3 class="a11yHidden">꽃 학명</h3>
                        <p class="subName sct">
                            {{ flowerData.sctName }}
                        </p>
                    </div>
                </div>
                <hr />
                <h3 class="a11yHidden">꽃말</h3>
                <strong class="flowerLanguage">
                    " {{ flowerData.language }} "
                </strong>
                <h3 class="a11yHidden">꽃 정보</h3>
                <p
                    class="flowerInfo"
                    v-for="(content, index) in flowerData.content"
                    :key="index"
                    v-html="content + '.'"
                ></p>
            </section>
        </div>
        <section>
            <h3 class="subTitle">* 꽃 자생처</h3>
            <p class="subInfo" v-html="flowerData.type + '.'"></p>
            <h3 class="subTitle">* 꽃 기르는 법</h3>
            <p class="subInfo" v-html="flowerData.grow + '.'"></p>
            <h3 class="subTitle">* 꽃 용도</h3>
            <p class="subInfo" v-html="flowerData.use + '.'"></p>
        </section>
    </article>
</template>

<script lang="ts">
import { mapState } from "vuex";
import { GET_FLOWER_DATA } from "@/store";
export default {
    computed: {
        ...mapState(["flowerData"]),
    },
    mounted(): void {
        this.$store.dispatch(GET_FLOWER_DATA, this.$route.params.dataNo);
    },
};
</script>

<style lang="scss" scoped>
.infoContainer {
    @include container(1240, 10);
    padding: 48px 5% 36px;
    .date {
        @include commonFont(32, $FONT_SPRING);
        text-align: center;
    }
    .upperWrapper {
        display: flex;
        gap: 24px;
        margin: 36px auto 0;
        .imgWrapper {
            position: relative;
            /* 추후 미디어쿼리로 이미지 사이즈와 레이아웃 변경하기 */
            width: 405px;
            height: 315px;
            object-fit: cover;
            flex: 0 0 405px;
            .imgs {
                position: absolute;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
            }
        }
        .contentSection {
            flex: 1 0 0;
        }
        .nameWrapper {
            display: flex;
            gap: 12px;
            .flowerName {
                @include commonFont(40, $FONT_SPRING);
            }
            .subNameWrapper {
                display: flex;
                flex-direction: column;
                .subName {
                    @include commonFont(20, $FONT_SPRING);
                    line-height: 100%;
                    &.sct {
                        line-height: 80%;
                    }
                }
            }
        }
        hr {
            width: 100%;
            height: 0.5px;
            background-color: $FONT_SPRING;
            margin: 10px 0 22px;
        }
        .flowerLanguage {
            @include commonFont(26, $FONT_SPRING);
            display: block;
            margin-bottom: 18px;
        }
        .flowerInfo {
            @include commonFont(18);
            word-break: keep-all;
            margin: 10px 0;
            line-height: 150%;
        }
    }
    .subTitle {
        @include commonFont(24);
        margin-top: 24px;
    }
    .subInfo {
        @include commonFont(18);
        word-break: keep-all;
        margin: 10px 0;
        padding-left: 20px;
        line-height: 150%;
    }
}

@media screen and (max-width: 1000px) {
    .infoContainer {
        .upperWrapper {
            gap: 12px;
            .imgWrapper {
                width: 270px;
                height: 210px;
                flex: 0 1 270px;
            }
            .nameWrapper {
                gap: 6px;
            }
        }
    }
}

@media screen and (max-width: 800px) {
    .infoContainer {
        padding: 24px 5% 8px;
        .upperWrapper {
            flex-direction: column;
            gap: 24px;
            align-items: center;
            margin-top: 18px;
            .imgWrapper {
                width: 405px;
                height: 315px;
                gap: 0;
                flex: 0 1 auto;
            }
            .nameWrapper {
                flex-direction: column;
                text-align: center;
            }
            .flowerLanguage {
                text-align: center;
            }
            .contentSection {
                text-align: center;
                flex: 0 1 auto;
            }
        }
    }
}

@media screen and (max-width: 500px) {
    .infoContainer {
        .upperWrapper {
            .imgWrapper {
                width: 270px;
                height: 210px;
                gap: 0;
                flex: 0 1 auto;
            }
        }
    }
}
</style>
