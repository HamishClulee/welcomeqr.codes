import Vue from 'vue'
import VueRouter from 'vue-router'
import home from '../views/home.vue'
import create from '../views/create.vue'
import notfound from '../views/notfound.vue'

import overwritemetas from '../utils/seo'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: home,
    beforeEnter: (to: any, from: any, next: any) => {

      overwritemetas({
        title: 'Welcome QR | description',
        description: `Breif description of how the product functions. Feature list, 
        benefits, small explanation of pricing and other info`,
        noindex: true,
      }, next)

    },
  },
  {
    path: '/create',
    name: 'create',
    component: create,
    beforeEnter: (to: any, from: any, next: any) => {

      overwritemetas({
        title: 'Welcome QR | Create New QR',
        description: `Where the magic happens, create a new dowmloadable QR code and associate website and content`,
        noindex: true,
      }, next)

    },
  },
  {
    path: '*',
    name: 'notfound',
    component: notfound,
    beforeEnter: (to: any, from: any, next: any) => {

      overwritemetas({
        title: '',
        description: '',
        noindex: true,
      }, next)

    },
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
})

export default router
