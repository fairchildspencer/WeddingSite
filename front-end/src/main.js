import Vue from 'vue'
import App from './App.vue'
import router from './router'

let data = {
  user: null
}

new Vue({
  data,
  router,
  render: h => h(App)
}).$mount('#app')
