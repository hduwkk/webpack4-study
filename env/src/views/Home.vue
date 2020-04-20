<template>
  <div class="home-container">
    <p>{{ title }}</p>
    <!-- <img class="img" src="@/assets/imgs/a.jpg" alt="" /> -->
    <img class="img" :src="img" alt="" />
    <img class="img" src="../assets/imgs/b.jpeg" alt="" />
  </div>
</template>
<script>
import img from '../assets/imgs/b.jpeg'
export default {
  data() {
    return {
      title: '你2好呀大傻瓜'
    }
  },
  created() {
    this.img = img
    console.log(1)
  }
}
</script>
<style lang="scss">
.home-container {
  display: flex;
}
.img {
  display: block;
  max-width: 100px;
}
</style>
