import Vue from 'vue'
import VueRouter from 'vue-router'

import isAuthed from '../api/auth'

const home = () => import('../views/home.vue')
const create = () => import('../views/create.vue')
const pricing = () => import('../views/pricing.vue')
const auth = () => import('../views/auth.vue')
const notfound = () => import('../views/notfound.vue')

import overwritemetas from '../utils/seo'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: home,
    beforeEnter: (to: any, from: any, next: any) => {

      overwritemetas({
        title: 'Welcome QR | Description',
        description: `Brief description of how the product functions. Feature list, 
        benefits, small explanation of pricing and other info`,
        noindex: true,
      }, next)

    },
  },
  {
    path: '/auth',
    name: 'auth',
    component: auth
  },
  {
    path: '/pricing',
    name: 'pricing',
    component: pricing,
    beforeEnter: (to: any, from: any, next: any) => {

      overwritemetas({
        title: 'Welcome QR | Pricing',
        description: `Breif description of how Welcome QR Codes is priced, what 
        different plans and tiers are offered and the services included in each tier and plan.`,
        noindex: true,
      }, next)

    },
  },
  {
    path: '/create',
    name: 'create',
    component: create,
    beforeEnter: (to: any, from: any, next: any) => {

      const app = document.getElementById('app')
      if (app) app.innerHTML = '<h1 style="font-size: 10em;">FUCK YEAH G</h1>'

      const yup = () => {

        overwritemetas({
          title: 'Welcome QR | Create New QR',
          description: `Where the magic happens, create a new dowmloadable QR code and 
          associate website and content`,
          noindex: true,
        }, next)

      }

      const nup = () => {

        next('/auth')

      }

      isAuthed(yup, nup)

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
  scrollBehavior (to, from, savedPosition) {

    if (savedPosition) {

      return savedPosition
    
    } else {

      return { x: 0, y: 0 }
        
    }
  
  }
})

export default router
