import Vue from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'
import { QAuth } from './api/auth'

Vue.config.productionTip = false

const qAuth = new QAuth()

new Vue({
    router,
    store,
    render: h => h(App),
}).$mount('#app')

export default qAuth