<template>
    <div class="col-sm-12">
      <fieldset>
        <legend>Avarii pinten terminal</legend>


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
              <td>H</td>
              <td>%</td>
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
            <tr>
              <td><input v-model="finalSpurInventory.final_spur_decastr_left" class="form-control" type="text"></td>
              <td><input v-model="finalSpurInventory.final_spur_decastr_right" class="form-control" type="text"></td>
              <td><input v-model="finalSpurInventory.final_spur_afuieri_height" class="form-control" type="text"></td>
              <td><input v-model="finalSpurInventory.final_spur_afuieri_percent" class="form-control" type="text"></td>
              <td><input v-model="finalSpurInventory.final_spur_horiz_craks_nr" class="form-control" type="text"></td>
              <td><input v-model="finalSpurInventory.final_spur_horiz_craks_lenght" class="form-control" type="text"></td>
              <td><input v-model="finalSpurInventory.final_spur_vert_craks_nr" class="form-control" type="text"></td>
              <td><input v-model="finalSpurInventory.final_spur_vert_craks_lenght" class="form-control" type="text"></td>
              <td><input v-model="finalSpurInventory.final_spur_displaced_left" class="form-control" type="text"></td>
              <td><input v-model="finalSpurInventory.final_spur_displaced_right" class="form-control" type="text"></td>
              <td><input v-model="finalSpurInventory.final_spur_displaced_center" class="form-control" type="text"></td>
              <td><input v-model="finalSpurInventory.final_spur_abrasion_percent" class="form-control" type="text"></td>
              <td><input v-model="finalSpurInventory.final_spur_abrasion_deep" class="form-control" type="text"></td>
            </tr>
          </tbody>
        </table>
      </fieldset>
    </div>
</template>

<script>

export default{
  props: ["finalSpurInventory"],

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
