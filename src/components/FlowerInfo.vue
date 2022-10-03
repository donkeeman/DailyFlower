<template>
    <article class="infoContainer">
        <router-link class="link prev" :to="getPrevLink" title="이전"
            >&lt;</router-link
        >
        <router-link class="link next" :to="getNextLink" title="다음"
            >&gt;</router-link
        >
        <h2 class="date">{{ flowerData.month }}월 {{ flowerData.day }}일</h2>
        <div class="upperWrapper">
            <div class="imgAlbum">
                <div class="imgWrapper">
                    <img
                        :src="thumbnail || flowerData.imgArray[0]"
                        alt="꽃 사진"
                        class="thumbnail"
                    />
                </div>
                <ul class="imgArray">
                    <li
                        v-for="(imgSrc, index) in flowerData.imgArray"
                        :key="index"
                        @click="changeImg(imgSrc)"
                    >
                        <img :src="imgSrc" alt="꽃 사진" class="imgs" />
                    </li>
                </ul>
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
                    v-html="content"
                ></p>
            </section>
        </div>
        <section>
            <h3 class="subTitle">* 꽃 자생처</h3>
            <p class="subInfo" v-html="flowerData.type"></p>
            <h3 class="subTitle">* 꽃 기르는 법</h3>
            <p class="subInfo" v-html="flowerData.grow"></p>
            <h3 class="subTitle">* 꽃 용도</h3>
            <p class="subInfo" v-html="flowerData.use"></p>
        </section>
    </article>
</template>

<script lang="ts">
import { mapState } from "vuex";
import { GET_FLOWER_DATA } from "@/store";
export default {
    data(): unknown {
        return {
            thumbnail: "",
        };
    },
    computed: {
        ...mapState(["flowerData"]),
        getPrevLink(): string {
            if (this.$route.params.dataNo === "1") {
                return "/info/366";
            } else {
                return "/info/" + (parseInt(this.$route.params.dataNo) - 1);
            }
        },
        getNextLink(): string {
            if (this.$route.params.dataNo === "366") {
                return "/info/1";
            } else {
                return "/info/" + (parseInt(this.$route.params.dataNo) + 1);
            }
        },
    },
    mounted(): void {
        this.$store.dispatch(GET_FLOWER_DATA, this.$route.params.dataNo);
    },
    methods: {
        changeImg(imgSrc: string): void {
            this.thumbnail = imgSrc;
        },
    },
};
</script>

<style lang="scss" scoped>
.infoContainer {
    @include container(1240, 10);
    padding: 48px 5% 36px;
    position: relative;
    .link {
        @include setFont(128, $FONT_SPRING);
        position: fixed;
        top: 50%;
        z-index: 100;
        opacity: 60%;
        &.prev {
            left: 40px;
        }
        &.next {
            right: 40px;
        }
    }
    .date {
        @include setFont(32, $FONT_SPRING);
        text-align: center;
    }
    .upperWrapper {
        display: flex;
        gap: 24px;
        margin: 36px auto 0;
        .imgAlbum {
            .imgWrapper {
                position: relative;
                /* 추후 미디어쿼리로 이미지 사이즈와 레이아웃 변경하기 */
                width: 405px;
                height: 315px;
                object-fit: cover;
                flex: 0 0 405px;
                display: flex;
                .thumbnail {
                    position: absolute;
                    top: 0;
                    left: 0;
                    width: 100%;
                    height: 100%;
                }
            }
            .imgArray {
                margin-top: 10px;
                display: flex;
                justify-content: space-between;
                .imgs {
                    width: 128px;
                    cursor: pointer;
                }
            }
        }
        .contentSection {
            flex: 1 0 0;
        }
        .nameWrapper {
            display: flex;
            gap: 12px;
            .flowerName {
                @include setFont(40, $FONT_SPRING);
            }
            .subNameWrapper {
                display: flex;
                flex-direction: column;
                .subName {
                    @include setFont(20, $FONT_SPRING);
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
            @include setFont(26, $FONT_SPRING);
            display: block;
            margin-bottom: 18px;
        }
        .flowerInfo {
            @include setFont(18);
            word-break: keep-all;
            margin-top: 10px;
            line-height: 150%;
        }
    }
    .subTitle {
        @include setFont(24);
        margin-top: 24px;
    }
    .subInfo {
        @include setFont(18);
        word-break: keep-all;
        margin: 10px 0;
        padding-left: 20px;
        line-height: 150%;
    }
}

@media screen and (max-width: 1500px) {
    .infoContainer {
        .link {
            &.prev {
                left: 20px;
            }
            &.next {
                right: 20px;
            }
        }
    }
}

@media screen and (max-width: 1000px) {
    .infoContainer {
        .link {
            &.prev {
                left: 0;
            }
            &.next {
                right: 0;
            }
        }
        .upperWrapper {
            gap: 12px;
            .imgAlbum {
                .imgWrapper {
                    width: 270px;
                    height: 210px;
                    flex: 0 1 270px;
                }
                .imgArray {
                    .imgs {
                        width: 84px;
                    }
                }
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
        .link {
            &.prev {
                left: -10px;
            }
            &.next {
                right: -10px;
            }
        }
        .upperWrapper {
            flex-direction: column;
            gap: 24px;
            align-items: center;
            margin-top: 18px;
            .imgAlbum {
                .imgWrapper {
                    width: 405px;
                    height: 315px;
                    gap: 0;
                    flex: 0 1 auto;
                }
                .imgArray {
                    .imgs {
                        width: 128px;
                    }
                }
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
            .imgAlbum {
                .imgWrapper {
                    width: 270px;
                    height: 210px;
                    gap: 0;
                    flex: 0 1 auto;
                }
            }
            .imgArray {
                .imgs {
                    width: 84px;
                }
            }
        }
    }
}
</style>
