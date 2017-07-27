<template>
  <div>
    <h2>Inventariere {{ inventory.year }} Ys: {{ inventory.ys }}</h2>


    <h4>Avarii lucrare propriu-zisă</h4>
    <table class="table table-bordered text-center abht-table">
      <thead>
        <tr class="first-row">
          <td colspan="2">Decastrare<br><span class="unbold">H(m)</span></td>
          <td colspan="2">Afuieri</td>
          <td colspan="2">Fis, oriz, z, deversată</td>
          <td colspan="2">Fis, vert, z, deversată</td>
          <td colspan="2">Fis, oriz, z, nedeversată</td>
          <td colspan="2">Fis, vert, z, nedeversată</td>
          <td>Desprinderi zonă deversată</td>
          <td colspan="2">Desprinderi z, nedeversată</td>
          <td colspan="2">Eroziuni</td>
        </tr>
        <tr>
          <td>stanga</td>
          <td>dreapta</td>

          <td>H(m)</td>
          <td>%</td>

          <td>nr</td>
          <td>L(m)</td>

          <td>nr</td>
          <td>L(m)</td>

          <td>nr</td>
          <td>L(m)</td>

          <td>nr</td>
          <td>L(m)</td>

          <td>%</td>

          <td>stanga</td>
          <td>dreapta</td>

          <td>h(cm)</td>
          <td>%</td>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>{{ inventory.dam.dec_left }}</td>
          <td>{{ inventory.dam.dec_right }}</td>
          <td>{{ inventory.dam.af_height }}</td>
          <td>{{ inventory.dam.af_percent }}</td>
          <td>{{ inventory.dam.h_crak_dev_nr }}</td>
          <td>{{ inventory.dam.h_crak_dev_l }}</td>
          <td>{{ inventory.dam.v_crak_dev_nr }}</td>
          <td>{{ inventory.dam.v_crak_dev_l }}</td>
          <td>{{ inventory.dam.h_crak_undev_nr }}</td>
          <td>{{ inventory.dam.h_crak_undev_l }}</td>
          <td>{{ inventory.dam.v_crak_undev_nr }}</td>
          <td>{{ inventory.dam.v_crak_undev_l }}</td>
          <td>{{ inventory.dam.detach_dev_percent }}</td>
          <td>{{ inventory.dam.detach_undev_left_percent }}</td>
          <td>{{ inventory.dam.detach_undev_right_percent }}</td>
          <td>{{ inventory.dam.erosion_height }}</td>
          <td>{{ inventory.dam.erosion_percent }}</td>
        </tr>
      </tbody>
    </table>

    <template v-if="construction.cd.has_apron">
      <h4>Avarii radier</h4>
      <table class="table table-bordered abht-table text-center">
        <thead>
          <tr class="first-row">
            <td colspan="2">Fisuri</td>
            <td colspan="2">Afuieri</td>
            <td>Desprindere radier</td>
            <td>Dinţi desprinsi</td>
            <td>Desprindere contrabaraj</td>
            <td colspan="2">Eroziuni</td>
          </tr>
          <tr>
            <td>nr</td>
            <td>%</td>

            <td>H(m)</td>
            <td>%</td>

            <td>%</td>

            <td>Nd/Ni</td>

            <td>%</td>

            <td>h(cm)</td>
            <td>%</td>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>{{ inventory.dam.apron_crack_nr }}</td>
            <td>{{ inventory.dam.apron_crack_percent }}</td>
            <td>{{ inventory.dam.apron_af_height }}</td>
            <td>{{ inventory.dam.apron_af_percent }}</td>
            <td>{{ inventory.dam.apron_detach_percent }}</td>
            <td>{{ inventory.dam.apron_teeth_detach_nr }}</td>
            <td>{{ inventory.dam.apron_detach_counter_dam_percent }}</td>
            <td>{{ inventory.dam.apron_erosion_height }}</td>
            <td>{{ inventory.dam.apron_erosion_percent }}</td>
          </tr>
        </tbody>
      </table>
    </template>


    <h4>Avarii ziduri de conducere</h4>
    <table  class="table table-bordered abht-table text-center">
      <thead>
        <tr class="first-row">
          <td rowspan="2"></td>
          <td colspan="2">Fisuri orizontale</td>
          <td colspan="2">Fisuri verticale</td>
          <td>Desprinderi</td>
          <td colspan="2">Eroziuni</td>
        </tr><tr>

          <td>nr</td>
          <td>lungime(m)</td>
          <td>nr</td>
          <td>lungime(m)</td>
          <td>%</td>
          <td>h(cm)</td>
          <td>%</td>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>Zid stanga</td>
          <td>{{ inventory.dam.sidewall_left_horiz_craks_nr }}</td>
          <td>{{ inventory.dam.sidewall_left_horiz_length }}</td>
          <td>{{ inventory.dam.sidewall_left_vert_craks_nr }}</td>
          <td>{{ inventory.dam.sidewall_left_vert_length }}</td>
          <td>{{ inventory.dam.sidewall_left_displaced_percent }}</td>
          <td>{{ inventory.dam.sidewall_left_abrasion_deep }}</td>
          <td>{{ inventory.dam.sidewall_left_abrasion_percent }}</td>
        </tr>
        <tr>
          <td>Zid dreapta</td>
          <td>{{ inventory.dam.sidewall_right_horiz_craks_nr }}</td>
          <td>{{ inventory.dam.sidewall_right_horiz_length }}</td>
          <td>{{ inventory.dam.sidewall_right_vert_craks_nr }}</td>
          <td>{{ inventory.dam.sidewall_right_vert_length }}</td>
          <td>{{ inventory.dam.sidewall_right_displaced_percent }}</td>
          <td>{{ inventory.dam.sidewall_right_abrasion_deep }}</td>
          <td>{{ inventory.dam.sidewall_right_abrasion_percent }}</td>
        </tr>
      </tbody>
    </table>


    <template v-if="construction.has_final_spur">
      <h4>Avarii pinten terminal</h4>
      <table  class="table table-bordered abht-table text-center">
        <thead>
        <tr class="first-row">
          <td colspan="2">Decastrare <span class="unbold">H(m)</span></td>
          <td colspan="2">Fisuri orizontale</td>
          <td colspan="2">Fisuri verticale</td>
          <td colspan="3">Desprinderi</td>
          <td colspan="2">Eroziuni</td>
        </tr>
        <tr>
          <td>stanga</td>
          <td>dreapta</td>


          <td>nr</td>
          <td>lungime(m)</td>

          <td>nr</td>
          <td>lungime(m)</td>

          <td>stanga</td>
          <td>dreapta</td>
          <td>central</td>

          <td>h(cm)</td>
          <td>%</td>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>{{ inventory.final_spur.final_spur_decastr_left }}</td>
          <td>{{ inventory.final_spur.final_spur_decastr_right }}</td>
          <td>{{ inventory.final_spur.final_spur_horiz_crack_nr }}</td>
          <td>{{ inventory.final_spur.final_spur_horiz_crack_length }}</td>
          <td>{{ inventory.final_spur.final_spur_vert_crack_nr }}</td>
          <td>{{ inventory.final_spur.final_spur_vert_crack_length }}</td>
          <td>{{ inventory.final_spur.final_spur_detach_left_percent }}</td>
          <td>{{ inventory.final_spur.final_spur_detach_right_percent }}</td>
          <td>{{ inventory.final_spur.final_spur_detach_center_percent }}</td>
          <td>{{ inventory.final_spur.final_spur_erosion_height }}</td>
          <td>{{ inventory.final_spur.final_spur_erosion_percent }}</td>
        </tr>
      </tbody>
    </table>
  </template>



  <h4>Disfuncţionalităţi</h4>
  <table  class="table table-bordered abht-table text-center">
    <thead>
      <tr class="first-row">
        <td>Colmatare deversor</td>
        <td colspan="2" :class="noApronClass">Colmatare radier</td>
        <td>Inaltime aterisament</td>
        <td>Granulometrie aluviuni</td>
        <td colspan="2">Vegetatie lemnoasa nedorita</td>
        <td>Reducere sectiune</td>
      </tr>
      <tr>
        <td>%SU</td>


        <td  :class="noApronClass">%SU</td>
        <td  :class="noApronClass">%Srad</td>


        <td>Hat (m)</td>

        <td>Gal</td>

        <td>amonte</td>

        <td>aval</td>

        <td>aval</td>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>{{ inventory.dam.disf_colmat_deversor_percent }}</td>

        <template v-if="construction.cd.has_apron">
          <td>{{ inventory.dam.disf_colmat_apron_su_percent }}</td>
          <td>{{ inventory.dam.disf_colmat_apron_srad_percent }}</td>
        </template>
        <template v-else>
          <td colspan="2"  class="disabledLabel">-</td>
        </template>

        <td>{{ inventory.dam.disf_hat }}</td>
        <td>{{ getTransGranulometryTypeBySlug(inventory.dam.disf_gal_type, 'name') }}</td>
        <td>{{ inventory.dam.disf_veget_amonte }}</td>
        <td>{{ inventory.dam.disf_veget_aval }}</td>
        <td>{{ inventory.dam.disf_section_dim_perecent }}</td>
      </tr>
    </tbody>
  </table>


  <observ-and-causes
  :construction = "construction"
  :inventory = "inventory"
  ></observ-and-causes>
  <div>

  </div>

</div>

</template>

<script>
import constructionMixin from './../../mixins/construction'

import inventoryMixin from './../../mixins/inventory'

import ObservAndCauses from './ObservAndCauses.vue'

export default{
  mixins: [ constructionMixin, inventoryMixin ],
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
    ObservAndCauses
  },

  watch: {

  },


}
</script>

<style>
</style>
