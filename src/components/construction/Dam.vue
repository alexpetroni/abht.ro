<template>
  <div>

    <h4>Elemente dimensionale</h4>
    <table class="table table-bordered abht-table text-center">
      <thead>
        <tr class="first-row">
          <td colspan="5">Lucrare propriu-zisă</td>
          <td colspan="5" :class="noApronClass">Radier</td>
          <td colspan="2" :class="noConfuseurClass">Confuzor</td>
          <td :class="noFinalSpurClass">Pinten terminal</td>
        </tr>

        <tr>
          <td>Ye(m)</td>
          <td>H(m)</td>
          <td>a(m)</td>
          <td>B(m)</td>
          <td>Tip lucrare</td>

          <td :class="noApronClass">Lr(m)</td>
          <td :class="noApronClass">Br(m)</td>
          <td :class="noApronClass">tip disip.</td>
          <td :class="noApronClass">Hz</td>
          <td :class="noApronClass">Nr. total de dinti</td>

          <td :class="noConfuseurClass">Lc(m)</td>
          <td :class="noConfuseurClass">Bc(m)</td>

          <td :class="noFinalSpurClass">Bp(m)</td>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>{{ dam.ye }}</td>
          <td>{{ dam.h }}</td>
          <td>{{ dam.a }}</td>
          <td>{{ dam.b }}</td>
          <td>{{ getTransConstructionTypesBySlug(dam.transversal_type, 'name') }}</td>

          <template v-if="construction.cd.has_apron">
            <td>{{ dam.lr }}</td>
            <td>{{ dam.br }}</td>
            <td>{{ getTransDisipTypeBySlug( dam.disip_type , 'name' )}}</td>
            <td>{{ dam.hz }}</td>
            <td>{{ dam.apron_teeth_no }}</td>
          </template>
          <template v-else>
            <td colspan="5" class="disabledLabel">Nu are</td>
          </template>

          <template v-if="construction.cd.has_confuseur">
            <td>{{ dam.lc }}</td>
            <td>{{ dam.bc }}</td>
          </template>
          <template v-else>
            <td colspan="2" class="disabledLabel">Nu are</td>
          </template>

          <template v-if="construction.cd.has_final_spur">
            <td>{{ construction.cd.final_spur.spur_length }}</td>
          </template>
          <template v-else>
            <td colspan="2" class="disabledLabel">Nu are</td>
          </template>
        </tr>
      </tbody>
    </table>


    <h4>Materiale de constructii</h4>
    <table class="table table-bordered abht-table text-center">
      <thead>
        <tr class="first-row">
          <td>Corp lucrare</td>
          <td>Aripi lucrare</td>
          <td :class="noApronClass">Radier</td>
          <td>Contrabaraj</td>
          <td>Ziduri de conducere</td>
          <td :class="noFinalSpurClass">Pinten terminal</td>
        </tr>

      </thead>
      <tbody>
        <tr>
          <td>{{ getConstrMaterialBySlug('mat_main_body', dam.mat_main_body, 'name') }}</td>
          <td>{{ getConstrMaterialBySlug('mat_wings', dam.mat_wings, 'name') }}</td>

          <template v-if="construction.cd.has_apron">
            <td>{{ getConstrMaterialBySlug('mat_apron', dam.mat_apron, 'name') }}</td>
          </template>
          <template v-else>
            <td class="disabledLabel">Nu are</td>
          </template>

          <td>{{ getConstrMaterialBySlug('mat_counter_dam', dam.mat_counter_dam, 'name') }}</td>
          <td>{{ getConstrMaterialBySlug('mat_side_walls', dam.mat_side_walls, 'name') }}</td>

          <template v-if="construction.cd.has_final_spur">
            <td>{{ getConstrMaterialBySlug('mat_final_spur', construction.cd.final_spur.mat_final_spur, 'name') }}</td>
          </template>
          <template v-else>
            <td colspan="2" class="disabledLabel">Nu are</td>
          </template>

        </tr>
      </tbody>
    </table>

  </div>

</template>

<script>
import constructionMixin from './../../mixins/construction'

export default{
  mixins: [ constructionMixin ],
  props: ['construction'],

  data() {
    return {

    }
  },

  methods: {

  },

  computed: {
    dam(){
      return this.construction.cd.dam
    },


  },

  components: {

  },

  watch: {

  },


}
</script>

<style>
</style>
