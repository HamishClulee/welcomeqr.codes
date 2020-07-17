import Vue from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'
import { QAuth } from './api/auth'
import { QEdit } from './api/editor'

import GoogleAuth from 'vue-google-oauth2'

Vue.use(GoogleAuth, {
    clientId: `${process.env.VUE_APP_GOOGLE_CLIENT_ID}.apps.googleusercontent.com`,
    scope: 'profile email',
    prompt: 'select_account',
})

Vue.config.productionTip = false

const qAuth = new QAuth()
Vue.prototype.$QAuth = qAuth
Vue.prototype.$QEdit = new QEdit()

new Vue({
    router,
    store,
    render: h => h(App),
}).$mount('#app')

export default qAuth