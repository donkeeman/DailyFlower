<template>
    <div class="loadingWrapper">
        <p class="loading">불러오는 중...</p>
    </div>
</template>

<script lang="ts">
export default {};
</script>

<style lang="scss">
.loadingWrapper {
    @include flex(row, 0, center, center);
    height: 550px;
    .loading {
        font-size: 32px;
        color: $BLACK;
    }
}
</style>
