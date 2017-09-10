import Vue from 'vue'
import Router from 'vue-router'

import Admin from './../components/Admin.vue'
//
import Home from './../components/page/Home.vue'
// //
import ErrorComponent from './../components/page/ErrorComponent.vue'
// //
import ConstructionsSelect from './../components/construction/ConstructionsSelect.vue'
import ConstructionsList from './../components/construction/ConstructionsList.vue'
import Construction from './../components/construction/Construction.vue'


import ChartDistributionYsCondition from './../components/charts/ChartDistributionYsCondition.vue'
import ChartYsDistributionAge from './../components/charts/ChartYsDistributionAge.vue'
import ChartYsDistributionDecade from './../components/charts/ChartYsDistributionDecade.vue'
import ChartYsDistributionBasin from './../components/charts/ChartYsDistributionBasin.vue'
import ChartYsDistributionMaterials from './../components/charts/ChartYsDistributionMaterials.vue'
import ChartYsDistributionYe from './../components/charts/ChartYsDistributionYe.vue'

// //
import EditorNewTransConstr from './../components/construction/editors/EditorNewTransConstr.vue'
import EditorNewLongConstr from './../components/construction/editors/EditorNewLongConstr.vue'
import EditorConstruction from'./../components/construction/editors/EditorConstruction.vue'
// //
import EditorInventory from './../components/inventory/editors/EditorInventory.vue'



Vue.use(Router)

const adminChildren = [
  { path: 'construction/new/transversal' , name: 'new-transversal-construction' , component: EditorNewTransConstr },
  { path: 'construction/new/longitudinal', name: 'new-longitudinal-construction', component: EditorNewLongConstr },
  { path: 'construction/:id/edit', name: 'edit-construction', component: EditorConstruction,  props: true },

  { path: 'construction/:id/new-inventory', name: 'add-inventory' , component: EditorInventory, props: true },
  { path: 'construction/:id/inventory/:year/edit', name: 'edit-inventory' , component: EditorInventory, props: true },

]

export default new Router({
  routes: [
      { path: '/' , component: ConstructionsSelect, name: 'home' },
      { path: '/constructions-select' , component: ConstructionsSelect, name: 'constructions-select' },
      { path: '/constructions-list' , component: ConstructionsList, name: 'constructions-list' },
      { path: '/constructions/:id/inventory/:year' , component: Construction, name: 'construction-year-inventory', props: true },
      { path: '/constructions/:id' , component: Construction, name: 'construction', props: true },

      { path: '/charts/ys-distribution-condition' , component: ChartDistributionYsCondition, name: 'ys-distribution-condition'},
      { path: '/charts/ys-distribution-age' , component: ChartYsDistributionAge, name: 'ys-distribution-age'},
      { path: '/charts/ys-distribution-decade' , component: ChartYsDistributionDecade, name: 'ys-distribution-decade'},
      { path: '/charts/ys-distribution-basin' , component: ChartYsDistributionBasin, name: 'ys-distribution-basin'},
      { path: '/charts/ys-distribution-ye' , component: ChartYsDistributionYe, name: 'ys-distribution-ye'},
      { path: '/charts/ys-distribution-materials' , component: ChartYsDistributionMaterials, name: 'ys-distribution-materials'},

      { path: '/admin' , component: Admin, children: adminChildren },
      { path: '/error' , component: ErrorComponent, name: 'error' },

  ]
})
