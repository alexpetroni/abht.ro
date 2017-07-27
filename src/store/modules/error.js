// ========= state =========
const state = {
  errorMsg: ''
}


// ========= getters =========
const getters = {
  errorMsg: state => state.errorMsg
}


// ========= actions =========
const actions = {
  setupErrorMsg({ commit }, msg){
      commit('setupErrorMsg', msg)
  },
}


// ========= mutations =========
const mutations = {
  setupErrorMsg(state, msg){
    state.errorMsg = msg
  }

}


export default {
  state,
  getters,
  actions,
  mutations
}
