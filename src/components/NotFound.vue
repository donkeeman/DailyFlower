<template>
    <article class="notFoundContainer">
        <h2 class="a11yHidden">404 에러</h2>
        <img src="@/assets/img/404.png" />
        <p class="message">페이지를 찾을 수 없습니다.</p>
        <div class="linkWrapper">
            <a @click="$router.back()">이전 페이지</a>
            <router-link to="/">메인 페이지</router-link>
        </div>
    </article>
</template>

<script lang="ts">
export default {};
</script>

<style lang="scss" scoped>
.notFoundContainer {
    @include container(900, 10);
    padding: 48px 5% 36px;
    text-align: center;
    .message {
        @include setFontSize(32);
        margin: 30px auto;
        word-break: keep-all;
    }
    .linkWrapper {
        display: flex;
        justify-content: center;
        align-items: center;
        gap: 24px;
        a {
            @include setFontSize(20);
            text-decoration: underline;
            cursor: pointer;
        }
    }
}
</style>
