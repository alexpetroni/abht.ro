<template>
    <div class="row">
      <div class="col-sm-12">
        <h3>Fișă inventariere anul  {{ inventory.year }} lucrare transversală {{ construction.gd.basin_name }} {{ getConstructionCadastralCode() }}#{{ construction.gd.construction_code }}</h3>
      </div>

      <div class="col-sm-12 col-md-4">
          <constr-identify-data
          :construction = "construction"
          :inventory = "inventory"
          ></constr-identify-data>
      </div>

      <div class="col-sm-12 col-md-4">
          <constr-inventory-images
          :construction = "construction"
          :inventory = "inventory"
          ></constr-inventory-images>
      </div>

      <div class="col-sm-12">
          <dam
          :construction = "construction"
          ></dam>
      </div>

      <div class="col-sm-12">
          <trans-inventory
          :construction = "construction"
          :inventory = "inventory"
          ></trans-inventory>
      </div>
  </div>
</template>

<script>
import constructionMixin from './../../mixins/construction'

import ConstrIdentifyData from './ConstrIdentifyData.vue'
import Dam from './Dam.vue'
import TransInventory from './../inventory/TransInventory.vue'

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
    Dam,
    TransInventory,
    ConstrInventoryImages
  },

  watch: {

  },


}
</script>

<style>
</style>
