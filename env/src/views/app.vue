<template>
  <div>
    <v-header></v-header>
    <router-view></router-view>
    <div class="button" @click="click">
      {{ lodash ? 'Lodash加载' : '点我' }}
    </div>
    <v-footer></v-footer>
  </div>
</template>
<script>
import VHeader from '../components/header.vue'
import VFooter from '../components/footer.vue'
export default {
  components: {
    VHeader,
    VFooter
  },
  data() {
    return {
      lodash: false
    }
  },
  methods: {
    click() {
      console.log(6666666)
      import('lodash').then(_ => {
        console.log(_)
        this.lodash = true
      })
    }
  }
}
</script>
<style lang="scss" scoped>
.button {
  display: block;
  color: #fff;
  background-color: rgb(6, 74, 153);
  text-align: center;
  line-height: 1.6;
  font-size: 20px;
  width: 220px;
  padding: 4px 0;
  border-radius: 4px;
  margin: 20px auto;
}
</style>
