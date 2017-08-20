import * as types from './../mutation-types'
import * as axios from './../../api'

import isEqual from 'lodash/isEqual';



// ========= state =========
const state = {
  listUpToDate: false,

  constrList: {
    items: [],
    total: 0,
    page: 0,
    itemsPerPage: 50
  },

  constrFilters: {},

  countiesList: [],
  cadastralListLevel_0: [],



  ysDistributionCondition: { updated: false, data: [] },
  ysDistributionAge:{ updated: false, data: [] },
  ysDistributionDecade: { updated: false, data: [] },
  ysDistributionYe: { updated: false, data: [] },
  ysDistributionMaterials: { updated: false, data: [] }

}


// ========= getters =========
const getters = {
  listUpToDate: state => state.listUpToDate,
  constructionsList: state => state.constrList,
  constrFilters: state => state.constrFilters,

  countiesList: state => state.countiesList,
  cadastralListLevel_0: state => state.cadastralListLevel_0,
}


// ========= actions =========
const actions = {

  initializeData({state, commit}){
    let req = { url: 'app-initialize' }
    axios._get(req)
    .then(response => {
      commit(types.INITIALIZE_APP_DATA, response.data)
      console.log('counties ')
      console.log(response.data)
    })
    .catch(err => console.log(err))
  },


  updateConstructionsSelectionFilters({state, commit}, query){
    commit(types.UPDATE_SELECTION_CRITERIA, query)
  },


  prepareConstructionsList({ state, commit, dispatch }, query ){
    console.log('prepareConstructionsList ', query)
    console.log(' state.constrFilters ', state.constrFilters )
    if(!isEqual(query, JSON.parse(JSON.stringify(state.constrFilters)))){
       console.log('update query in store')
      commit(types.UPDATE_SELECTION_CRITERIA, query)
    }

    if(!state.listUpToDate){
      dispatch('fetchConstructionsList')
    }else{
      console.log(' prepareConstructionsList => already loaded')
    }
  },


  fetchConstructionsList({ state, commit }){
    commit(types.EMPTY_CONSTRUCTIONS_LIST)
    let req = { url:'constructions', data: state.constrFilters }
    axios._get(req)
    .then( response => {
      commit(types.UPDATE_CONSTRUCTIONS_LIST, response.data)
    })
    .catch(err => console.log(err))
  },

  invalidateConstructionsList({ commit } ){
    commit(types.MARK_CONSTRUCTIONS_LIST_OBSOLETE)
  },



  // ==================== Charts ====================

  fetchYsDistributionConditionData({state, commit }){
    console.log('fetchYsDistributionConditionData')
  },



}


// ========= mutations =========
const mutations = {
  [types.INITIALIZE_APP_DATA](state, data){
    console.log('initializez')
    console.log(data)
    state.countiesList = data.countiesList
    state.cadastralListLevel_0 = data.cadastralListLevel_0
  },

  [types.UPDATE_CONSTRUCTIONS_LIST](state, constrArr){
    state.constrList = constrArr
    state.listUpToDate = true
  },

  [types.UPDATE_SELECTION_CRITERIA](state, query){
    console.log('updated ', query)
    state.constrFilters = query

    state.listUpToDate = false

    state.ysDistributionCondition = { updated: false, data: [] },
    state.ysDistributionAge = { updated: false, data: [] },
    state.ysDistributionDecade = { updated: false, data: [] },
    state.ysDistributionYe = { updated: false, data: [] },
    state.ysDistributionMaterials = { updated: false, data: [] }
  },

  [types.MARK_CONSTRUCTIONS_LIST_OBSOLETE](state){
    if(state.listUpToDate){
      state.listUpToDate = false
    }

    state.ysDistributionCondition = { updated: false, data: [] },
    state.ysDistributionAge = { updated: false, data: [] },
    state.ysDistributionDecade = { updated: false, data: [] },
    state.ysDistributionYe = { updated: false, data: [] },
    state.ysDistributionMaterials = { updated: false, data: [] }
  },

  [types.EMPTY_CONSTRUCTIONS_LIST](state){
    state.constrList = []
  },

}


export default {
  state,
  getters,
  actions,
  mutations
}
