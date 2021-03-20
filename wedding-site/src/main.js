import Vue from 'vue'
import App from './App.vue'
import router from './router'
import itemData from '../public/data/registry_data.json'

let data = {
  items: itemData,
  reserved: [],
  addresses: []
}

new Vue({
  router,
  data,
  render: h => h(App)
}).$mount('#app')
