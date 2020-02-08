import Vue from 'vue'
import VueRouter from 'vue-router'
import isAuthed from '../api/auth'
import { EventBus } from '../EventBus'
import app from '../main'

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
                description: `Brief description of how Welcome QR functions and the benefits it can provide to customers.`,
                noindex: true,
            }, next)
        },
    },
    {
        path: '/auth',
        name: 'auth',
        component: auth,
    },
    {
        path: '/pricing',
        name: 'pricing',
        component: pricing,
        beforeEnter: (to: any, from: any, next: any) => {
            overwritemetas({
                title: 'Welcome QR | Pricing',
                description: `Brief description of how Welcome QR Codes prices it's products. Gives details of different plans and tiers offered and the services included in each tier.`,
                noindex: true,
            }, next)
        },
    },
    {
        path: '/create',
        name: 'create',
        component: create,
        beforeEnter: (to: any, from: any, next: any) => {
            EventBus.$emit('globalspinner', true)
            const yup = () => {
                EventBus.$emit('globalspinner', false)
                overwritemetas({
                    title: 'Welcome QR | Create New QR',
                    description: `Where the magic happens, create a new dowmloadable QR code and associate website and content`,
                    noindex: true,
                }, next)
        
            }
            const nup = () => {
                next('/auth')
                EventBus.$emit('globalspinner', false)
            }
            isAuthed(yup, nup, app)
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
  
    },
})

export default router
