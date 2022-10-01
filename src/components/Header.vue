<template>
    <header class="header">
        <h1 class="title">나날꽃</h1>
        <router-link to="/" class="logo">
            <img src="@/assets/img/logo.png" alt="logo" />
        </router-link>
        <nav>
            <ul class="nav">
                <li><router-link to="/search">날짜로 검색하기</router-link></li>
                <li><router-link to="/info/1">랜덤으로 보기</router-link></li>
            </ul>
        </nav>
    </header>
</template>

<script lang="ts">
export default {};
</script>

<style lang="scss">
.header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 12px 10%;
    background-color: $WHITE;
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
        display: flex;
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
                @include commonFont(20);
                display: block;
            }
        }
    }
}
</style>
