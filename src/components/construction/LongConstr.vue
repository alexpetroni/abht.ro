<template>
  <div class="row">
    <div class="col-sm-12">
      <h3>Fișă inventariere anul  {{ inventory.year }} canal de evacuare {{ construction.gd.basin_name }} {{ getConstructionCadastralCode() }}#{{ construction.gd.construction_code }}</h3>
    </div>

    <div class="col-sm-12 col-md-4">
      <constr-identify-data
      :construction = "construction"
      :inventory = "inventory"
      ></constr-identify-data>
    </div>

    <div class="col-sm-12 col-md-4">
        <construction-on-map
        :construction = "construction"
        :inventory = "inventory"
        ></construction-on-map>
    </div>

    <div class="col-sm-12 col-md-4">
        <constr-inventory-images
        :construction = "construction"
        :inventory = "inventory"
        ></constr-inventory-images>
    </div>

    <div class="col-sm-12">
      Canal de evacuare cu {{ construction.cd.sectors.length }} {{ construction.cd.sectors.length == 1 ? 'sector' : 'sectoare' }}, lungime totală de {{ construction.cd.total_length }} m, {{ construction.cd.has_final_spur ? 'cu' : 'fără'}} pinten terminal
    </div>

    <div class="col-sm-12">
      <sector
      v-for="(sector, index) in construction.cd.sectors"
      :sector="sector"
      ></sector>
    </div>

    <div class="col-sm-12" v-if="construction.cd.has_final_spur">
      <h4>Pinten terminal</h4>
      <table  class="table table-bordered abht-table text-center">
        <thead>
          <tr class="first-row">
            <td>Material de construcție</td>
            <td>Înălțime zid cond. Hz(m)</td>
            <td>Lungime pinten Bp(m)</td>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>{{ getConstrMaterialBySlug('mat_final_spur', construction.cd.final_spur.mat_final_spur, 'name') }}</td>
            <td>{{ construction.cd.final_spur.sidewall_height }}</td>
            <td>{{ construction.cd.final_spur.spur_length }}</td>
          </tr>
        </tbody>
      </table>
    </div>

    <div class="col-sm-12">
      <long-inventory
      :construction = "construction"
      :inventory = "inventory"
      ></long-inventory>
    </div>
  </div>
</template>

<script>
import constructionMixin from './../../mixins/construction'

import ConstrIdentifyData from './ConstrIdentifyData.vue'
import ConstructionOnMap from './ConstructionOnMap.vue'
import Sector from './Sector.vue'
import LongInventory from './../inventory/LongInventory.vue'

import ConstrInventoryImages from './ConstrInventoryImages.vue'

export default{
  mixins: [ constructionMixin ],
  props: [ 'construction', 'inventory' ],

  data() {
    return {

    }
  },

  methods: {

  },

  computed: {

  },

  components: {
    ConstrIdentifyData,
    ConstructionOnMap,
    Sector,
    LongInventory,
    ConstrInventoryImages
  },

  watch: {

  },


}
</script>

<style>
</style>
