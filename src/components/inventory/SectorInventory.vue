<template>
  <div>
    <h4>Sector {{ sectorInventory.sector_nr}}</h4>
    <h4>Avarii radier sector</h4>
    <table class="table table-bordered abht-table text-center">
      <thead>
        <tr class="first-row">
          <td colspan="2">Fisuri</td>
          <td>Desprinderi</td>
          <td colspan="2">Eroziuni</td>
        </tr>

        <tr>
          <td>nr</td>
          <td>% afectat</td>
          <td>% desprins</td>
          <td>adancime (cm)</td>
          <td>% afectat</td>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>{{ sectorInventory.apron_craks_nr }}</td>
          <td>{{ sectorInventory.apron_damage_percent }}</td>
          <td>{{ sectorInventory.apron_displaced }}</td>
          <td>{{ sectorInventory.apron_abrasion_deep }}</td>
          <td>{{ sectorInventory.apron_abrasion_percent }}</td>
        </tr>
      </tbody>
    </table>


    <h4>Avarii ziduri de conducere</h4>
    <table class="table table-bordered abht-table text-center">
      <thead>
        <tr class="first-row">
          <td rowspan="2"></td>
          <td colspan="2">Fisuri orizontale</td>
          <td colspan="2">Fisuri verticale</td>
          <td>Desprinderi</td>
          <td colspan="2">Eroziuni</td>
        </tr><tr class="icas-secondary-thead">
          <td>nr</td>
          <td>lungime(m)</td>
          <td>nr</td>
          <td>lungime(m)</td>
          <td>%</td>
          <td>adancime(cm)</td>
          <td>%</td>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>Zid stanga</td>
          <td>{{ sectorInventory.sidewall_left_horiz_craks_nr }}</td>
          <td>{{ sectorInventory.sidewall_left_horiz_length }}</td>
          <td>{{ sectorInventory.sidewall_left_vert_craks_nr }}</td>
          <td>{{ sectorInventory.sidewall_left_vert_length }}</td>
          <td>{{ sectorInventory.sidewall_left_displaced }}</td>
          <td>{{ sectorInventory.sidewall_left_abrasion_deep }}</td>
          <td>{{ sectorInventory.sidewall_left_abrasion_percent }}</td>
        </tr>
        <tr>
          <td>Zid dreapta</td>
          <td>{{ sectorInventory.sidewall_right_horiz_craks_nr }}</td>
          <td>{{ sectorInventory.sidewall_right_horiz_length }}</td>
          <td>{{ sectorInventory.sidewall_right_vert_craks_nr }}</td>
          <td>{{ sectorInventory.sidewall_right_vert_length }}</td>
          <td>{{ sectorInventory.sidewall_right_displaced }}</td>
          <td>{{ sectorInventory.sidewall_right_abrasion_deep }}</td>
          <td>{{ sectorInventory.sidewall_right_abrasion_percent }}</td>
        </tr>
      </tbody>
    </table>

    <h4>Avarii pinteni</h4>
    <table class="table table-bordered abht-table text-center">
      <thead>
        <tr class="first-row">
          <td rowspan="2">Nr. pinten</td>

          <td colspan="2">Fisuri orizontale</td>
          <td colspan="2">Fisuri verticale</td>
          <td colspan="3">Desprinderi %</td>
          <td colspan="2">Eroziuni</td>
        </tr>

        <tr>
          <td>nr</td>
          <td>lungime(m)</td>
          <td>nr</td>
          <td>lungime(m)</td>
          <td>stanga</td>
          <td>dreapta</td>
          <td>centru</td>
          <td>h(cm)</td>
          <td>%</td>
        </tr>
      </thead>
      <tbody>
        <tr v-for="spur in sectorInventory.spurs">
          <td>{{ spur.spur_nr }}</td>
          <td>{{ spur.spur_horiz_craks_nr }}</td>
          <td>{{ spur.spur_horiz_craks_lenght }}</td>
          <td>{{ spur.spur_vert_craks_nr }}</td>
          <td>{{ spur.spur_vert_craks_lenght }}</td>
          <td>{{ spur.spur_displaced_left }}</td>
          <td>{{ spur.spur_displaced_right }}</td>
          <td>{{ spur.spur_displaced_center }}</td>
          <td>{{ spur.spur_abrasion_percent }}</td>
          <td>{{ spur.spur_abrasion_deep }}</td>
        </tr>
      </tbody>
    </table>


    <h4>Disfuncţionalităţi</h4>
    <table class="table table-bordered abht-table text-center">
      <thead>
        <tr class="first-row">
          <td colspan="2">Colmatare radier</td>
          <td>Reducere sect. aval</td>
        </tr>

        <tr class="icas-secondary-thead">
          <td>%SU</td>
          <td>%Srad</td>
          <td>%</td>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>{{ sectorInventory.disf_colmat_su_percent }}</td>
          <td>{{ sectorInventory.disf_colmat_srad_percent }}</td>
          <td>{{ sectorInventory.disf_section_dim_perecent }}</td>
        </tr>
      </tbody>
    </table>

  </div>
</template>

<script>

export default{
  props: ['sectorInventory'],

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
