import Vue from 'vue'
import App from './App.vue'

import VueLazyload from 'vue-lazyload'
import * as VueGoogleMaps from 'vue2-google-maps'

import store from './store'
import router from './router'




Vue.use(VueLazyload)

Vue.use(VueGoogleMaps, {
   load: {
     key: 'AIzaSyA0Gh987mNFsoIuc6XAX6-HVdG3Wl6j3cA',
     // v: 'OPTIONAL VERSION NUMBER',
     // libraries: 'places', //// If you need to use place input
   }
 });

new Vue({
  el: '#app',
    store,
  router,

  render: h => h(App)
})
