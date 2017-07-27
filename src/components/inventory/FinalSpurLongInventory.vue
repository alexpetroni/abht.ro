<template>
<div>
  <h4>Avarii pinten terminal</h4>
<table class="table table-bordered abht-table text-center">
          <thead>
          <tr class="first-row">
            <td colspan="2">Decastrare</td>
            <td colspan="2">Afuieri</td>
            <td colspan="2">Fisuri orizontale</td>
            <td colspan="2">Fisuri verticale</td>
            <td colspan="3">Desprinderi %</td>
            <td colspan="2">Eroziuni</td>
          </tr>

          <tr>

            <td>stanga</td>
            <td>dreapta</td>
            <td>H(m)</td>
            <td>%</td>
            <td>nr</td>
            <td>lungime(m)</td>
            <td>nr</td>
            <td>lungime(m)</td>
            <td>stanga</td>
            <td>dreapta</td>
            <td>centru</td>
            <td>H</td>
            <td>%</td>
          </tr>
          </thead>
          <tbody>
            <tr>
            <td>{{ inventory.final_spur.final_spur_decastr_left }}</td>
            <td>{{ inventory.final_spur.final_spur_decastr_right }}</td>
            <td>{{ inventory.final_spur.final_spur_afuieri_height }}</td>
            <td>{{ inventory.final_spur.final_spur_afuieri_percent }}</td>
            <td>{{ inventory.final_spur.final_spur_horiz_craks_nr }}</td>
            <td>{{ inventory.final_spur.final_spur_horiz_craks_lenght }}</td>
            <td>{{ inventory.final_spur.final_spur_vert_craks_nr }}</td>
            <td>{{ inventory.final_spur.final_spur_vert_craks_lenght }}</td>
            <td>{{ inventory.final_spur.final_spur_displaced_left }}</td>
            <td>{{ inventory.final_spur.final_spur_displaced_right }}</td>
            <td>{{ inventory.final_spur.final_spur_displaced_center }}</td>
            <td>{{ inventory.final_spur.final_spur_abrasion_percent }}</td>
            <td>{{ inventory.final_spur.final_spur_abrasion_deep }}</td>
          </tr>
        </tbody>
      </table>
</div>
</template>

<script>

export default{
  props: ['inventory'],

  data() {
    return {

    }
  },

  methods: {

  },

  computed: {

  },

  components: {

  },

  watch: {

  },


}
</script>

<style>
</style>
