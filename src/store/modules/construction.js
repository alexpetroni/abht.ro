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
  ysDistributionBasin: { updated: false, data: [] ,totalConstructions: 0 },
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


  ysDistributionCondition: state => state.ysDistributionCondition,
  ysDistributionAge: state => state.ysDistributionAge,
  ysDistributionDecade: state => state.ysDistributionDecade,
  ysDistributionBasin: state => state.ysDistributionBasin,
  ysDistributionYe: state => state.ysDistributionYe,
  ysDistributionMaterials: state => state.ysDistributionMaterials
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

    let req = { url: '/charts/ys-distribution-condition', data: state.constrFilters }
    axios._get(req)
    .then(response => {
      commit(types.UPDATE_CHART_YS_DISTRIBUTION_CONDITION, response.data)
      console.log('response  fetchYsDistributionConditionData', response.data)
    })
    .catch(err => console.log(err))
  },


  fetchYsDistributionAgeData({state, commit }){
    console.log('fetchYsDistributionAgeData')

    let req = { url: '/charts/ys-distribution-age', data: state.constrFilters }
    axios._get(req)
    .then(response => {
      commit(types.UPDATE_CHART_YS_DISTRIBUTION_AGE, response.data)
      console.log('response  fetchYsDistributionAgeData', response.data)
    })
    .catch(err => console.log(err))
  },

  fetchYsDistributionDecadeData({state, commit }){
    console.log('fetchYsDistributionDecadeData')

    let req = { url: '/charts/ys-distribution-decade', data: state.constrFilters }
    axios._get(req)
    .then(response => {
      commit(types.UPDATE_CHART_YS_DISTRIBUTION_DECADE, response.data)
      console.log('response  fetchYsDistributionDecadeData', response.data)
    })
    .catch(err => console.log(err))
  },


  fetchYsDistributionBasinData({state, commit }){
    console.log('fetchYsDistributionBasinData')

    let req = { url: '/charts/ys-distribution-basin', data: state.constrFilters }
    axios._get(req)
    .then(response => {
      commit(types.UPDATE_CHART_YS_DISTRIBUTION_BASIN, response.data)
      console.log('response  fetchYsDistributionBasinData', response.data)
    })
    .catch(err => console.log(err))
  },


  fetchYsDistributionYeData({state, commit }){
    console.log('fetchYsDistributionYeData')

    let req = { url: '/charts/ys-distribution-ye', data: state.constrFilters }
    axios._get(req)
    .then(response => {
      commit(types.UPDATE_CHART_YS_DISTRIBUTION_YE, response.data)
      console.log('response  fetchYsDistributionYeData', response.data)
    })
    .catch(err => console.log(err))
  },


  fetchYsDistributionMaterialsData({state, commit }){
    console.log('fetchYsDistributionMaterialsData')

    let req = { url: '/charts/ys-distribution-materials', data: state.constrFilters }
    axios._get(req)
    .then(response => {
      commit(types.UPDATE_CHART_YS_DISTRIBUTION_MATERIALS, response.data)
      console.log('response  fetchYsDistributionMaterialsData', response.data)
    })
    .catch(err => console.log(err))
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
    state.ysDistributionBasin = { updated: false, data: [] },
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
    state.ysDistributionBasin = { updated: false, data: [] },
    state.ysDistributionYe = { updated: false, data: [] },
    state.ysDistributionMaterials = { updated: false, data: [] }
  },

  [types.EMPTY_CONSTRUCTIONS_LIST](state){
    state.constrList = []
  },



  [types.UPDATE_CHART_YS_DISTRIBUTION_CONDITION](state, data){
    state.ysDistributionCondition = { updated: true, data }
  },

  [types.UPDATE_CHART_YS_DISTRIBUTION_AGE](state, data){
    state.ysDistributionAge = { updated: true, data }
  },

  [types.UPDATE_CHART_YS_DISTRIBUTION_DECADE](state, data){
    state.ysDistributionDecade = { updated: true, data }
  },

  [types.UPDATE_CHART_YS_DISTRIBUTION_BASIN](state, data){
    state.ysDistributionBasin = { updated: true, data:data.constructionsArr, totalConstructions: data.totalConstructions }
  },

  [types.UPDATE_CHART_YS_DISTRIBUTION_YE](state, data){
    state.ysDistributionYe = { updated: true, data }
  },

  [types.UPDATE_CHART_YS_DISTRIBUTION_MATERIALS](state, data){
    state.ysDistributionMaterials = { updated: true, data }
  },



}


export default {
  state,
  getters,
  actions,
  mutations
}
