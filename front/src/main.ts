import Vue from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'
import { QAuth } from './api/auth'
import { QEdit } from './api/editor'

Vue.config.productionTip = false

const qAuth = new QAuth()
Vue.prototype.$QAuth = qAuth

const qEdit = new QEdit()
Vue.prototype.$QEdit = qEdit

new Vue({
    router,
    store,
    render: h => h(App),
}).$mount('#app')

export default qAuth