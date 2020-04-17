<template>
    <div>Home
        <!-- <img class="img" src="@/assets/imgs/a.jpg" alt="" /> -->
        <img class="img" :src="img" alt="" />
        <img class="img" src="../assets/imgs/b.jpeg" alt="">
    </div>
</template>
<script>
import img from '../assets/imgs/b.jpeg'
export default {
    created () {
        this.img = img
        console.log(img, 'img')
    }
}
</script>
<style lang="scss">
.img {
    display: block;
    max-width: 100px;
}
</style>
