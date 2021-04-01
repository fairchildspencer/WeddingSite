import Vue from 'vue'
import VueRouter from 'vue-router'
import Address from '../views/Address.vue'
import Registry from '../views/Registry.vue'
import Reserved from '../views/Reserved.vue'
import AllAddresses from '../views/AllAddresses.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Address',
    component: Address
  },
  {
    path: '/Registry',
    name: 'Registry',
    component: Registry
  },
  {
    path: '/Reserved',
    name: 'Reserved',
    component: Reserved
  },
  {
    path: '/AllAddresses',
    name: 'AllAddresses',
    component: AllAddresses
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
