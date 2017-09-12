<template>
  <div>
    <h2>Inventariere {{inventory.year}} Ys: {{inventory.ys}}</h2>

    <sector-inventory
    v-for="sector in inventory.sectors"
    :key = "sector.sector_nr"
    :sector-inventory = "sector"
    ></sector-inventory>

    <final-spur-long-inventory v-if="construction.cd.has_final_spur" :inventory = "inventory"></final-spur-long-inventory>

    <observ-and-causes
    :construction = "construction"
    :inventory = "inventory"
    ></observ-and-causes>

  </div>
</template>

<script>

import SectorInventory from './SectorInventory.vue'
import FinalSpurLongInventory from './FinalSpurLongInventory.vue'

import ObservAndCauses from './ObservAndCauses.vue'

export default{
  props: [ 'construction', 'inventory'],

  data() {
    return {

    }
  },

  methods: {

  },

  computed: {

  },

  components: {
    SectorInventory,
    FinalSpurLongInventory,
    ObservAndCauses
  },

  watch: {

  },


}
</script>

<style>
</style>
