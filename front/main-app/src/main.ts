import 'vue-multiselect/dist/vue-multiselect.min.css'
import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import { QAuth } from './api/auth'
import { QAdmin } from './api/admin'
import { QEdit } from '../../shared/api/editor'

Vue.config.productionTip = false

Vue.prototype.$QAdmin = new QAdmin()
Vue.prototype.$QEdit = new QEdit()

Vue.config.errorHandler = (error, vm, info) => {
    Vue.prototype.$QAdmin.clientsideerror({
        time: new Date(),
        userAgent: navigator.userAgent,
        error, info,
    })
}

window.onerror = (message, url, line, column, error) => {
    Vue.prototype.$QAdmin.clientsideerror({
        time: new Date(),
        userAgent: navigator.userAgent,
        message, url, line, column, error,
    })
    return false
}

new Vue({
    router,
    store,
    render: h => h(App),
}).$mount('#app')

const qAuth = new QAuth(store)
Vue.prototype.$QAuth = qAuth
export default qAuth