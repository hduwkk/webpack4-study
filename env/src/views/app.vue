<template>
    <div class="title">
        你好呀222
        <router-view></router-view>
    </div>
</template>
<script>
export default {
    created () {
        console.log(6666666)
    }
}
</script>
<style lang="scss" scoped>
.title {
    color: red;
}
</style>
