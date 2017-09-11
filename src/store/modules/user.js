// ========= state =========
const state = {
  user: null
}


// ========= getters =========
const getters = {
  isAuthenticated: state => state.user !== null,
  user: state => state.user
}


// ========= actions =========
const actions = {
  setUser({ commit }, user){
      commit('setUser', user)
  },
}


// ========= mutations =========
const mutations = {
  setUser(state, user){
    state.user = user
  }

}


export default {
  state,
  getters,
  actions,
  mutations
}
