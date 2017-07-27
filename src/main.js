import Vue from 'vue'
import App from './App.vue'

import VueLazyload from 'vue-lazyload'

import router from './router'
import store from './store'


new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
