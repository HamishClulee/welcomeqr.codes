import Vue from 'vue'
import VueRouter from 'vue-router'
const home = () => import('../views/home.vue')

const create = () => import('../views/create/create.vue')
const editor = () => import('../views/create/subs/editor.vue')
const qrdetails = () => import('../views/create/subs/qrdetails.vue')
const preview = () => import('../views/create/subs/preview.vue')

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
    redirect: '/create/details',
    beforeEnter: (to: any, from: any, next: any) => {

      overwritemetas({
        title: 'Welcome QR | Create New QR',
        description: `Where the magic happens, create a new dowmloadable QR code and associate website and content`,
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
})

export default router
