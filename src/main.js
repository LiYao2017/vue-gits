// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import 'mint-ui/lib/style.css'
import MintUI from 'mint-ui'
import App from './App'
import router from './router'
import http from './api/http'
Vue.config.productionTip = false
Vue.use(MintUI)
/* eslint-disable no-new */
Vue.prototype.axios = http

new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
