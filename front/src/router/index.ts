import Vue from 'vue'
import VueRouter from 'vue-router'

/** Website routes */
const home = () => import('../views/home.vue')
const pricing = () => import('../views/pricing.vue')

/** Auth routes */
const auth = () => import('../views/auth.vue')
const login = () => import('../views/auth/login.vue')
const signup = () => import('../views/auth/signup.vue')
const reset = () => import('../views/auth/reset.vue')
const forgot = () => import('../views/auth/forgot.vue')

/** Account routes */
const account = () => import('../views/account/account.vue')

/** Tester routes */


/** Create App routes */
const wapp = () => import('../views/wapp.vue')
const create = () => import('../views/wapp/create.vue')
const manage = () => import('../views/wapp/manage.vue')
const preview = () => import('../views/wapp/preview.vue')

/** Site routes */
const terms = () => import('../views/terms.vue')
const privacy = () => import('../views/privacy.vue')
const contact = () => import('../views/contact.vue')

/** Misc plumbing routes */
const notfound = () => import('../views/notfound.vue')
const testhtml = () => import('../views/testhtml.vue')

import overwritemetas from '../utils/seo'

Vue.use(VueRouter)

const routes = [
    // -------------------------------------------------------------------
    // --------------------------- SITE
    // -------------------------------------------------------------------
    {
        path: '/',
        name: 'home',
        component: home,
        beforeEnter: (to: any, from: any, next: any) => {
            overwritemetas({
                title: 'Welcome QR | Description',
                description: `Brief description of how Welcome QR functions and the benefits it can provide to customers.`,
                index: true,
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
                description: `Brief description of how Welcome QR Codes prices it's products. Gives details of different plans and tiers offered and the services included in each tier.`,
                index: true,
            }, next)
        },
    },
    {
        path: '/contact',
        name: 'contact',
        component: contact,
        beforeEnter: (to: any, from: any, next: any) => {
            overwritemetas({
                title: 'Welcome QR | Contact Us',
                description: `Get in touch with us about; bug reports, feature requests, account queries or kind words of encoragement. We would love to hear from you!`,
                index: true,
            }, next)
        },
    },
    // -------------------------------------------------------------------
    // --------------------------- ACCOUNT
    // -------------------------------------------------------------------
    {
        path: '/account',
        name: 'account',
        component: account,
        beforeEnter: (to: any, from: any, next: any) => {
            overwritemetas({
                title: 'Welcome QR | Account',
                description: `Manage all the information we need to keep your account working as intended`,
                index: true,
            }, next)
        },
    },
    // -------------------------------------------------------------------
    // --------------------------- AUTH
    // -------------------------------------------------------------------
    {
        path: '/auth',
        name: 'auth',
        component: auth,
        redirect: { name: 'login' },
        children: [
            {
                path: '/auth/login',
                name: 'login',
                component: login,
                beforeEnter: (to: any, from: any, next: any) => {
                    overwritemetas({
                        title: 'Login ~ Signup',
                        description: `Login and Signup here!`,
                        index: true,
                    }, next)
                },
            },
            {
                path: '/auth/signup',
                name: 'signup',
                component: signup,
                beforeEnter: (to: any, from: any, next: any) => {
                    overwritemetas({
                        title: 'Login ~ Signup',
                        description: `Login and Signup here!`,
                        index: true,
                    }, next)
                },
            },
            {
                path: '/auth/reset',
                name: 'reset',
                component: reset,
                beforeEnter: (to: any, from: any, next: any) => {
                    overwritemetas({
                        title: 'Login ~ Signup',
                        description: `Login and Signup here!`,
                        index: true,
                    }, next)
                },
            },
            {
                path: '/auth/forgot',
                name: 'forgot',
                component: forgot,
                beforeEnter: (to: any, from: any, next: any) => {
                    overwritemetas({
                        title: 'Login ~ Signup',
                        description: `Login and Signup here!`,
                        index: true,
                    }, next)
                },
            },
        ],
    },
    // -------------------------------------------------------------------
    // --------------------------- APP
    // -------------------------------------------------------------------
    {
        path: '/app',
        name: 'wapp',
        component: wapp,
        redirect: '/app/manage',
        beforeEnter: (to: any, from: any, next: any) => {
            overwritemetas({
                title: '',
                description: ``,
                index: false,
            }, next)
        },
        children: [
            {
                path: '/app/manage',
                name: 'manage',
                component: manage,
                beforeEnter: (to: any, from: any, next: any) => {
                    overwritemetas({
                        title: 'Welcome QR | Manage',
                        description: `Where the magic happens, create a new downloadable QR code and associate website and content.`,
                        index: true,
                    }, next)
                },
            },
            {
                path: '/app/create',
                name: 'create',
                component: create,
                beforeEnter: (to: any, from: any, next: any) => {
                    overwritemetas({
                        title: 'Welcome QR | Create Your Site',
                        description: `Where the magic happens, create a new downloadable QR code and associate website and content.`,
                        index: true,
                    }, next)
                },
            },
            {
                path: '/app/preview',
                name: 'preview',
                component: preview,
                beforeEnter: (to: any, from: any, next: any) => {
                    overwritemetas({
                        title: 'Welcome QR | Preview',
                        description: `Where the magic happens, create a new downloadable QR code and associate website and content.`,
                        index: true,
                    }, next)
                },
            },
        ],
    },
    // -------------------------------------------------------------------
    // --------------------------- REGULATORY
    // -------------------------------------------------------------------
    {
        path: '/privacy',
        name: 'privacy',
        component: privacy,
        beforeEnter: (to: any, from: any, next: any) => {
            overwritemetas({
                title: 'Welcome QR | Privacy Policy',
                description: `Brief description of how Welcome QR Codesmanages and takes care of your data and your datas security.`,
                index: true,
            }, next)
        },
    },
    {
        path: '/terms-and-conditions',
        name: 'terms',
        component: terms,
        beforeEnter: (to: any, from: any, next: any) => {
            overwritemetas({
                title: 'Welcome QR | Terms and Conditions',
                description: `Brief description of how Welcome QR Codes does business in a legal sense, information on your rights and our methods of operation`,
                index: true,
            }, next)
        },
    },
    {
        path: '/testhtml',
        name: 'testhtml',
        component: testhtml,
        beforeEnter: (to: any, from: any, next: any) => {
            overwritemetas({
                title: '',
                description: '',
                index: false,
            }, next)
        },
    },
    // -------------------------------------------------------------------
    // --------------------------- PLUMBING
    // -------------------------------------------------------------------
    {
        path: '*',
        name: 'notfound',
        component: notfound,
        beforeEnter: (to: any, from: any, next: any) => {
            overwritemetas({
                title: '',
                description: '',
                index: false,
            }, next)
        },
    },
]

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes,
    scrollBehavior (to, from, savedPosition) {
        return savedPosition ? savedPosition : { x: 0, y: 0 }
    },
})

export default router
