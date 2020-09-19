import Vue from 'vue'
import VueRouter from 'vue-router'

import systemRoutes from './module/system'

Vue.use(VueRouter)

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [...systemRoutes],
})

export default router
