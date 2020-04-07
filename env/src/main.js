import vue from 'vue'
import router from './router'
import App from './views/app.vue'

new vue({
  router,
  render: h => h(App)
}).$mount('#app')
