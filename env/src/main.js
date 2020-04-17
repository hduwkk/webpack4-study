import vue from 'vue'
import router from './router/index.js'
import App from './views/app.vue'

window.vm = new vue({
  created () {
    // this.modules = modules || 'fuck you!'
  },
  router,
  render: h => h(App)
}).$mount('#app')
