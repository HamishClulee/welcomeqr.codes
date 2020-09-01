import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import { QAuth } from './api/auth'
import { QEdit } from './api/editor'

Vue.config.productionTip = false

new Vue({
    router,
    store,
    render: h => h(App),
}).$mount('#app')

const qAuth = new QAuth(store)
Vue.prototype.$QAuth = qAuth
Vue.prototype.$QEdit = new QEdit()

export default qAuth