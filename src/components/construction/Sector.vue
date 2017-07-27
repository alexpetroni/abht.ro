<template>
  <div>
    <h4>Sector {{sector.sector_nr}}</h4>


    <table class="table table-bordered abht-table text-center">
      <thead>
        <tr class="first-row">
          <td  colspan="6">Elemente dimensionale</td>
          <td  colspan="2">Materiale de constructie</td>
        </tr>
        <tr>
          <td>Nr. trepte</td>
          <td>Nr. pinteni</td>
          <td>Lungime(m)</td>
          <td>Adancime(m)</td>
          <td>Latime radier(m)</td>
          <td>Fruct zid garda</td>

          <td>Radier</td>
          <td>Ziduri garda</td>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>{{ sector.nr_of_stairs }}</td>
          <td>{{ sector.spurs.length }}</td>
          <td>{{ sector.sector_length }}</td>
          <td>{{ sector.sector_deep }}</td>
          <td>{{ sector.apron_width }}</td>
          <td>{{ sector.fruit_guard_wall }}</td>

          <td>{{ getConstrMaterialBySlug('mat_sect_apron', sector.mat_sect_apron, 'name') }}</td>
          <td>{{ getConstrMaterialBySlug('mat_sect_walls', sector.mat_sect_walls, 'name') }}</td>
        </tr>
      </tbody>
    </table>


    <template v-if="sector.spurs.length > 0">
      <table  class="table table-bordered abht-table text-center">
        <thead>
          <tr class="first-row">
            <td  colspan="5">Pinteni si trepte</td>
          </tr>
          <tr>
            <td>Pinten nr.</td>
            <td>Material de constructie</td>
            <td>Inaltime zid cond. Hz(m)</td>
            <td>Inaltime treapata H(m)</td>
            <td>Lungime pinten Bp(m)</td>
          </tr>
        </thead>
        <tbody>
          <tr v-for="spur in sector.spurs">
            <td>{{ spur.spur_nr }}</td>
            <td>{{ getConstrMaterialBySlug('mat_sect_spur', spur.mat_sect_spur, 'name') }}</td>
            <td>{{ spur.spur_sidewall_height }}</td>
            <td>{{ spur.spur_stair_height }}</td>
            <td>{{ spur.spur_length }}</td>
          </tr>
        </tbody>
      </table>
    </template>


  </div>
</template>

<script>
import constructionMixin from './../../mixins/construction'

export default{
  mixins: [ constructionMixin ],
  props: ['sector'],

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
