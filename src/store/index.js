import Vue from 'vue'
import Vuex from 'vuex'

import * as actions from './actions'
import * as getters from './getters'

import construction from './modules/construction'
import inventory from './modules/inventory'
import error from './modules/error'

Vue.use(Vuex)

export default new Vuex.Store({
  actions,
  getters,
  modules: {
    construction,
    inventory,
    error
  }
})
