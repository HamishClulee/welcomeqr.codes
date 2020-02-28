import Vue from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'
import { QAuth } from './api/auth'
import { QEdit } from './api/editor'
import { QSite } from './api/site'

Vue.config.productionTip = false

const qAuth = new QAuth()
Vue.prototype.$QAuth = qAuth
Vue.prototype.$QEdit = new QEdit()
Vue.prototype.$QSite = new QSite()

new Vue({
    router,
    store,
    render: h => h(App),
}).$mount('#app')

export default qAuth