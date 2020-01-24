import Vue from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'

import Unicon from 'vue-unicons'
import { uniBold, uniItalic, uniLink, uniUnderline, uniArrowCircleDown } from 'vue-unicons/src/icons'

Unicon.add([uniBold, uniItalic, uniLink, uniUnderline, uniArrowCircleDown])
Vue.use(Unicon)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')
