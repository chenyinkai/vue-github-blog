import Vue from 'vue'
import router from './router'
import App from './App.vue'
import filter from './utils/filter'

filter(Vue)

Vue.config.devtools = process.env.NODE_ENV !== 'production'

const app = new Vue({
  el: '#app',
  router,
  render: h => h(App)
})

export { app, router }
