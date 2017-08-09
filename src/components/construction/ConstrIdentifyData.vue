<template>
<div>
  <h4>Indentificare lucrare</h4>
  <table class="table">
    <tbody>

  <tr>
    <td class="data-label">Anul ultimei inventarieri</td>
    <td class="data-val">{{ last_inventory_year }}</td>
  </tr>
  <tr>
    <td class="data-label">Ys ultima inventariere</td>
    <td class="data-val">{{ last_inventory_ys }}</td>
  </tr>
  <tr>
    <td class="data-label">Cod cadastral</td>
    <td class="data-val">{{ getConstructionCadastralCode() }}</td>
  </tr>
  <tr>
    <td class="data-label">Cod lucrare</td>
    <td class="data-val">{{ construction.gd.construction_code }}</td>
  </tr>
  <tr>
    <td class="data-label">Latitudine</td>
    <td class="data-val">{{ getConstructionLatitude() }}</td>
  </tr>
  <tr>
    <td class="data-label">Longitude</td>
    <td class="data-val">{{ getConstructionLongitude() }}</td>
  </tr>
<tr>
  <td class="data-label">An construcție</td>
  <td class="data-val">{{ construction.gd.construction_year }}</td>
</tr>
<tr>
  <td class="data-label">Ani inventariere</td>
  <td class="data-val">
    <template v-for="(data, index) in inventoryYearsLinks">
      <template v-if="data.isLink"><router-link :to="{ name: 'construction-year-inventory', params: {id:construction._id, year: data.year}}">{{data.year}}</router-link>&nbsp;</template>
      <template v-else>{{data.year}} </template>
  </template>
  </td>
</tr>
<tr>
  <td class="data-label">Ani reparații</td>
  <td class="data-val">{{ reparationYears }}</td>
</tr>
<tr>
  <td class="data-label">Arie protejată</td>
  <td class="data-val">{{ construction.gd.protected_area ? construction.gd.protected_area_name : "nu" }}</td>
</tr>
<tr>
  <td class="data-label">Județ</td>
  <td class="data-val">{{ construction.gd.adminlocation.county }}</td>
</tr>
<tr>
  <td class="data-label">Localitate</td>
  <td class="data-val">{{ construction.gd.adminlocation.city }}</td>
</tr>
<tr>
  <td class="data-label">Proprietar</td>
  <td class="data-val">{{ construction.gd.owner }}</td>
</tr>
</tbody>
</table>
</div>
</template>

<script>

import constructionMixin from './../../mixins/construction'
import inventoryMixin from './../../mixins/inventory'

export default{
  mixins: [ constructionMixin, inventoryMixin ],
  props: [ 'construction', 'inventory' ],

  data() {
    return {
      inventoryObserver: null,
      inventoryYears: []
    }
  },

  methods: {

  },

  computed: {
    last_inventory_year: function(){
      let year = ''
      if(this.construction.current_inventory && this.construction.current_inventory.year){
        year = this.construction.current_inventory.year
      }
      return year
    },

    last_inventory_ys: function(){
      let ys = ''
      if(this.construction.current_inventory && this.construction.current_inventory.ys){
        ys = this.construction.current_inventory.ys
      }
      return ys
    },

    inventoryYearsLinks: function(){
      let linksList = []
      let declaredInventoris = Array.isArray( this.construction.gd.inventory_years ) ? this.construction.gd.inventory_years : []
      let recordedInventories = [ this.construction.current_inventory.year ] // inventoris with recorded data
      this.construction.inventories_archive.forEach( inv => recordedInventories.push(inv.year) )
      let inventories = recordedInventories.concat( declaredInventoris)

      // remove duplicates
      inventories = inventories.filter((element, index, self) => { return self.indexOf(element) === index && !isNaN(parseFloat(element)) && isFinite(element) })
      // sort
      inventories.sort((a, b) => a - b)

      inventories.forEach( year => {
        if( recordedInventories.includes(year) ){
          linksList.push({year: year, isLink:true})
        }else{
          linksList.push({year: year, isLink:false})
        }
      })
      return linksList

    },

    reparationYears: function(){
      return this.construction.gd.reparation_years.join(' ')
    }

  },

  components: {
  },

  watch: {

  },



}
</script>

<style>
</style>
