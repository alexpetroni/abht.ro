import Vue from 'vue'
import App from './App.vue'

import lazy from 'vue-lazyload'

import router from './router'
import store from './store'


new Vue({
  el: '#app',
  router,
  store,
  lazy,
  render: h => h(App)
})
