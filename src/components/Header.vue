<template>
    <header class="header" :style="setBackgroundColor">
        <h1 class="title">나날꽃</h1>
        <router-link to="/" class="logo">
            <img src="@/assets/img/logo.png" alt="logo" />
        </router-link>
        <nav>
            <ul class="nav fullscreen">
                <li><router-link to="/search">날짜로 검색하기</router-link></li>
                <li>
                    <router-link :to="getRandom">랜덤으로 보기</router-link>
                </li>
            </ul>
            <ul class="nav mobile">
                <li><router-link to="/search">검색</router-link></li>
                <li>
                    <router-link :to="getRandom">랜덤</router-link>
                </li>
            </ul>
        </nav>
    </header>
</template>

<script lang="ts">
import { mapState } from "vuex";

export default {
    computed: {
        ...mapState(["defaultColor"]),
        getRandom(): string {
            let randomNo = Math.floor(Math.random() * 366) + 1;
            if (randomNo === this.$route.params.dataNo) {
                randomNo = Math.floor(Math.random() * 366) + 1;
            }
            return "/info/" + randomNo;
        },
        setBackgroundColor(): unknown {
            return {
                "--background-color": this.defaultColor.background,
            };
        },
    },
};
</script>

<style lang="scss">
.header {
    box-sizing: border-box;
    position: fixed;
    width: 100%;
    top: 0;
    left: 0;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 12px 10%;
    background-color: $WHITE;
    border-bottom: 2px solid var(--background-color);
    z-index: 50;
    .logo {
        display: block;
        width: 120px;
        height: 40px;
        img {
            width: 100%;
        }
    }
    .title {
        @include a11yHidden();
    }
    .nav {
        &.mobile {
            display: none;
        }
        &.fullscreen {
            display: flex;
        }
        align-items: center;
        gap: 40px;
        padding-top: 7px;
        li {
            position: relative;
            &:not(:first-child)::before {
                display: block;
                position: absolute;
                top: 0;
                left: 0;
                content: "";
                margin-left: -20px;
                width: 1.5px;
                height: 80%;
                background-color: $BLACK;
            }
            a {
                @include setFontSize(20);
                display: block;
            }
        }
    }
}

@media screen and (max-width: 500px) {
    .header {
        .nav {
            &.fullscreen {
                display: none;
            }
            &.mobile {
                display: flex;
            }
        }
    }
}
</style>
