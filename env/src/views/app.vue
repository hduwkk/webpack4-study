<template>
  <div>
    <v-header></v-header>
    <div class="title" @click="click">hello-world</div>
    <router-view></router-view>
    <v-footer></v-footer>
  </div>
</template>
<script>
import VHeader from '../components/header.vue'
import VFooter from '../components/footer.vue'
export default {
  components: {
    VHeader,
    VFooter,
  },
  methods: {
    click() {
      console.log(6666666)
      import('lodash').then(_ => {
          console.log(_)
      })
    },
  },
}
</script>
<style lang="scss" scoped>
.title {
  color: red;
}
</style>
