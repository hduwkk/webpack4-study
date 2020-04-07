import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

const routes = [
  {
    path: '/',
    component: Home,
  }
]

Vue.use(VueRouter)

export default new VueRouter({ routes })
