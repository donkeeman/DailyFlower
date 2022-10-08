<template>
    <div class="loadingWrapper" :style="setFontColor">
        <!-- 5초가 지나도 데이터가 없으면 다시 시도 메시지 출력 -->
        <p class="loading" v-if="!isFailed">불러오는 중...</p>
        <template v-else>
            <p class="failed">
                데이터를 불러오는 데 실패했습니다.<br />잠시 후 다시 시도해
                주세요.
            </p>
            <div class="linkWrapper" v-if="!isResult">
                <a @click="$router.back()">이전 페이지</a>
                <router-link to="/">메인 페이지</router-link>
            </div>
            <!-- 다시 시도 버튼은 테스트 필요 -->
            <!-- <button
                type="button"
                class="button"
                @click="$emit('retry', searchFor)"
                v-else
            >
                다시 시도
            </button> -->
        </template>
    </div>
</template>

<script lang="ts">
import { mapState } from "vuex";

export default {
    data(): unknown {
        return {
            isFailed: false,
        };
    },
    props: ["isResult", "searchFor"],
    created(): void {
        setTimeout(() => {
            this.isFailed = true;
        }, 10000);
    },
    computed: {
        ...mapState(["defaultColor"]),
        setFontColor(): unknown {
            return {
                "--font-color": this.defaultColor.font,
            };
        },
    },
};
</script>

<style lang="scss" scoped>
.loadingWrapper {
    @include flex(column, 20, center, center);
    text-align: center;
    height: 550px;
    .loading,
    .failed {
        font-size: 32px;
        color: $BLACK;
    }
    .linkWrapper {
        @include flex(row, 24, center, center);
        a {
            @include setFontSize(20);
            text-decoration: underline;
            cursor: pointer;
            color: rgb(var(--font-color));
        }
    }
    .button {
        z-index: 30;
    }
}
</style>
