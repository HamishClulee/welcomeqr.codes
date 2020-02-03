import Vue from 'vue'
import VueRouter from 'vue-router'
import { EventBus } from '../EventBus'
const home = () => import('../views/home.vue')

const create = () => import('../views/create/create.vue')
const editor = () => import('../views/create/subs/editor.vue')
const qrdetails = () => import('../views/create/subs/qrdetails.vue')
const preview = () => import('../views/create/subs/preview.vue')
const pricing = () => import('../views/pricing.vue')
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
    redirect: '/create/details',
    beforeEnter: (to: any, from: any, next: any) => {

      overwritemetas({
        title: 'Welcome QR | Create New QR',
        description: `Where the magic happens, create a new dowmloadable QR code and 
        associate website and content`,
        noindex: true,
      }, next)

    },
    children: [
      {
        path: '/create/details',
        name: 'qrdetails',
        component: qrdetails,
      },
      {
        path: '/create/editor',
        name: 'editor',
        component: editor,
      },
      {
        path: '/create/preview',
        name: 'preview',
        component: preview,
      }
    ]
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

router.beforeEach((to, from, next) => {

  const publicPages = ['/', '/pricing']
  const authRequired = !publicPages.includes(to.path)
  
  debugger

  const loggedIn = localStorage.getItem('user')

  if (authRequired && !loggedIn) {

    EventBus.$emit('opensitemodal', 'login')

  } else {

    next()

  }
  
})

export default router
