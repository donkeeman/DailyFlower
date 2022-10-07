<template>
    <article class="infoContainer">
        <template v-if="flowerData.korName === ''">
            <Loading />
        </template>
        <template v-else>
            <router-link
                class="link prev"
                :to="getPrevLink"
                :style="setFontColor"
                title="이전"
                >&lt;</router-link
            >
            <router-link
                class="link next"
                :to="getNextLink"
                :style="setFontColor"
                title="다음"
                >&gt;</router-link
            >
            <h2 class="date" :style="setFontColor">
                {{ flowerData.month }}월 {{ flowerData.day }}일
            </h2>
            <div class="upperWrapper" :style="setFontColor">
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
        </template>
    </article>
</template>

<script lang="ts">
import { mapState } from "vuex";
import { GET_FLOWER_DATA } from "@/store";
import Loading from "./Loading.vue";
export default {
    data(): unknown {
        return {
            thumbnail: "",
        };
    },
    computed: {
        ...mapState(["flowerData", "defaultColor", "testColor"]),
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
        setFontColor(): unknown {
            return {
                "--font-color": this.defaultColor.font,
            };
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
    components: {
        Loading,
    },
};
</script>

<style lang="scss" scoped>
.infoContainer {
    @include container(1240, 10);
    padding: 48px 5% 36px;
    position: relative;
    .link {
        @include setFontSize(128);
        position: fixed;
        top: 50%;
        z-index: 100;
        color: rgba(var(--font-color), 0.6);
        &.prev {
            left: 40px;
        }
        &.next {
            right: 40px;
        }
    }
    .date {
        @include setFontSize(32);
        font-size: 32px;
        text-align: center;
        color: rgb(var(--font-color));
    }
    .upperWrapper {
        @include flex(row, 24);
        margin: 36px auto 0;
        color: rgb(var(--font-color));
        .imgAlbum {
            .imgWrapper {
                position: relative;
                width: 405px;
                height: 315px;
                object-fit: cover;
                flex: 0 0 405px;
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
                @include flex(row, 0, space-between);
                object-fit: cover;
                .imgs {
                    width: 128px;
                    height: 100%;
                    cursor: pointer;
                }
            }
        }
        .contentSection {
            flex: 1 0 0;
        }
        .nameWrapper {
            @include flex(row, 12);
            .flowerName {
                @include setFontSize(40);
            }
            .subNameWrapper {
                @include flex(column);
                .subName {
                    @include setFontSize(20);
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
            background-color: rgb(var(--font-color));
            margin: 10px 0 22px;
        }
        .flowerLanguage {
            @include setFontSize(26);
            display: block;
            margin-bottom: 18px;
        }
        .flowerInfo {
            @include setFontSize(18);
            color: $BLACK;
            word-break: keep-all;
            margin-top: 10px;
            line-height: 150%;
        }
    }
    .subTitle {
        @include setFontSize(24);
        margin-top: 24px;
    }
    .subInfo {
        @include setFontSize(18);
        word-break: keep-all;
        margin-top: 10px;
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
                .imgArray {
                    .imgs {
                        width: 84px;
                    }
                }
            }
        }
    }
}

@media screen and (max-width: 300px) {
    .infoContainer {
        padding: 20px 0 10px;
    }
}
</style>
