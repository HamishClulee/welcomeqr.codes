import './style/index.sass'
import Vue from 'vue'
import App from './App.vue'
import { QEdit } from '../../shared/api/editor'

Vue.config.productionTip = false

Vue.prototype.$QEdit = new QEdit()

new Vue({
    render: (h) => h(App),
}).$mount('#app')
