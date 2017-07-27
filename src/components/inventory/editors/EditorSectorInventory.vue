<template>
  <div class="row">
    <form @submit.prevent="onSubmit">

      <div v-if="isNew">
      <div  class="col-xs-6 col-sm-3 col-md-2">
        <label for="year">An inventariere</label>
      </div>
      <div class="col-xs-6 col-sm-3 col-md-2">
        <input id="year" type="text" v-model="editedYear" class="form-control">
      </div>
    </div>
    <div v-else>
      <input id="year" type="hidden" v-model="editedYear" class="form-control">
    </div>


      <div class="col-sm-12">
        <h3>Inventariere sector {{editedItem.sector_nr}}</h3>
      </div>

      <div class="col-sm-12">
        <fieldset>
          <legend>Avarii radier</legend>

          <div class="row">
            <div class="col-sm-12 col-md-7">
              <table class="table table-bordered abht-table text-center">
                <thead>
                  <tr class="first-row">
                    <td colspan="2" class="text-center"><strong>Fisuri</strong></td>
                    <td class="text-center"><strong>Desprinderi</strong></td>
                    <td colspan="2" class="text-center"><strong>Eroziuni</strong></td>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td class="text-center">nr</td>
                    <td class="text-center">% afectat</td>
                    <td class="text-center">% desprins</td>
                    <td class="text-center">h(cm)</td>
                    <td class="text-center">% afectat</td>
                  </tr>
                  <tr>
                    <td><div class="icas-field"><span class="metabox_label"></span><input  class="form-control" name="apron_craks_nr" v-model="editedItem.apron_craks_nr"></div></td>
                    <td><div class="icas-field"><span class="metabox_label"></span><input  class="form-control" name="apron_damage_percent" v-model="editedItem.apron_damage_percent"></div></td>
                    <td><div class="icas-field"><span class="metabox_label"></span><input  class="form-control" name="apron_displaced" v-model="editedItem.apron_displaced"></div></td>
                    <td><div class="icas-field"><span class="metabox_label"></span><input  class="form-control" name="apron_abrasion_deep" v-model="editedItem.apron_abrasion_deep"></div></td>
                    <td><div class="icas-field"><span class="metabox_label"></span><input  class="form-control" name="apron_abrasion_percent" v-model="editedItem.apron_abrasion_percent"></div></td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

        </fieldset>

      </div>



      <!-- Ziduri de conducere -->
      <div class="col-sm-12">
        <fieldset>
          <legend>Ziduri de conducere</legend>
          <div class="row">
            <div class="col-sm-12 col-md-10">
              <table  class="table table-bordered abht-table text-center">
                <thead>
                  <tr  class="first-row">
                    <td rowspan="2"></td>
                    <td colspan="2" class="text-center"><strong>Fisuri orizontale</strong></td>
                    <td colspan="2" class="text-center"><strong>Fisuri verticale</strong></td>
                    <td class="text-center"><strong>Desprinderi</strong></td>
                    <td colspan="2" class="text-center"><strong>Eroziuni</strong></td>
                  </tr>
                  <tr class="icas-secondary-thead">

                    <td class="text-center">nr</td>
                    <td class="text-center">lungime(m)</td>
                    <td class="text-center">nr</td>
                    <td class="text-center">lungime(m)</td>
                    <td class="text-center">%</td>
                    <td class="text-center">h(cm)</td>
                    <td class="text-center">%</td>
                  </tr></thead>
                  <tbody>
                    <tr>
                      <td style="font-weight:bold">Zid stanga</td>
                      <td><div class="icas-field"><span class="metabox_label"></span><input size="3" class="form-control"  name="sidewall_left_horiz_craks_nr" v-model="editedItem.sidewall_left_horiz_craks_nr"></div></td>
                      <td><div class="icas-field"><span class="metabox_label"></span><input size="3" class="form-control"  name="sidewall_left_horiz_length" v-model="editedItem.sidewall_left_horiz_length"></div></td>
                      <td><div class="icas-field"><span class="metabox_label"></span><input size="3" class="form-control"  name="sidewall_left_vert_craks_nr" v-model="editedItem.sidewall_left_vert_craks_nr"></div></td>
                      <td><div class="icas-field"><span class="metabox_label"></span><input size="3" class="form-control"  name="sidewall_left_vert_length" v-model="editedItem.sidewall_left_vert_length"></div></td>
                      <td><div class="icas-field"><span class="metabox_label"></span><input size="3" class="form-control"  name="sidewall_left_displaced" v-model="editedItem.sidewall_left_displaced"></div></td>
                      <td><div class="icas-field"><span class="metabox_label"></span><input size="3" class="form-control"  name="sidewall_left_abrasion_deep" v-model="editedItem.sidewall_left_abrasion_deep"></div></td>
                      <td><div class="icas-field"><span class="metabox_label"></span><input size="3" class="form-control"  name="sidewall_left_abrasion_percent" v-model="editedItem.sidewall_left_abrasion_percent"></div></td>
                    </tr>
                    <tr>
                      <td style="font-weight:bold">Zid dreapta</td>
                      <td><div class="icas-field"><span class="metabox_label"></span><input size="3" class="form-control"  name="sidewall_right_horiz_craks_nr" v-model="editedItem.sidewall_right_horiz_craks_nr"></div></td>
                      <td><div class="icas-field"><span class="metabox_label"></span><input size="3" class="form-control"  name="sidewall_right_horiz_length" v-model="editedItem.sidewall_right_horiz_length"></div></td>
                      <td><div class="icas-field"><span class="metabox_label"></span><input size="3" class="form-control"  name="sidewall_right_vert_craks_nr" v-model="editedItem.sidewall_right_vert_craks_nr"></div></td>
                      <td><div class="icas-field"><span class="metabox_label"></span><input size="3" class="form-control"  name="sidewall_right_vert_length" v-model="editedItem.sidewall_right_vert_length"></div></td>
                      <td><div class="icas-field"><span class="metabox_label"></span><input size="3" class="form-control"  name="sidewall_right_displaced" v-model="editedItem.sidewall_right_displaced"></div></td>
                      <td><div class="icas-field"><span class="metabox_label"></span><input size="3" class="form-control"  name="sidewall_right_abrasion_deep" v-model="editedItem.sidewall_right_abrasion_deep"></div></td>
                      <td><div class="icas-field"><span class="metabox_label"></span><input size="3" class="form-control"  name="sidewall_right_abrasion_percent" v-model="editedItem.sidewall_right_abrasion_percent"></div></td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </fieldset>
        </div>




        <template v-if="editedItem.spurs.length > 0">
            <div class="col-sm-12">
            <fieldset>
              <legend>Avarii pinten</legend>
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
                <tr v-for="spur in editedItem.spurs">
                  <td>{{ spur.spur_nr }}</td>
                  <td><input name="spur_horiz_craks_nr" v-model="spur.spur_horiz_craks_nr" class="form-control" type="text"></td>
                  <td><input name="spur_horiz_craks_nr" v-model="spur.spur_horiz_craks_lenght" class="form-control" type="text"></td>
                  <td><input name="spur_horiz_craks_nr" v-model="spur.spur_vert_craks_nr" class="form-control" type="text"></td>
                  <td><input name="spur_horiz_craks_nr" v-model="spur.spur_vert_craks_lenght" class="form-control" type="text"></td>
                  <td><input name="spur_horiz_craks_nr" v-model="spur.spur_displaced_left" class="form-control" type="text"></td>
                  <td><input name="spur_horiz_craks_nr" v-model="spur.spur_displaced_right" class="form-control" type="text"></td>
                  <td><input name="spur_horiz_craks_nr" v-model="spur.spur_displaced_center" class="form-control" type="text"></td>
                  <td><input name="spur_horiz_craks_nr" v-model="spur.spur_abrasion_percent" class="form-control" type="text"></td>
                  <td><input name="spur_horiz_craks_nr" v-model="spur.spur_abrasion_deep" class="form-control" type="text"></td>
                </tr>
              </tbody>
            </table>
          </fieldset>
          </div>

      </template>

      <editor-final-spur-long-inventory
      v-if="showFinalSpur"
      :final-spur-inventory = "finalSpurInventory"
      ></editor-final-spur-long-inventory>


      <div class="col-sm-12">
      <fieldset>
        <legend>Disfunctionalitati</legend>
        <div class="row">
          <div class="col-sm-12 col-md-5">
            <table  class="table table-bordered abht-table text-center">
              <thead>
                <tr  class="first-row">
                  <td colspan="2" class="text-center"><strong>Colmatare radier</strong></td>
                  <td class="text-center"><strong>Reducere sect. aval</strong></td>
                </tr>

                <tr>
                  <td class="text-center">%SU</td>
                  <td class="text-center">%Srad</td>
                  <td class="text-center">%</td>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td><div class="icas-field"><span class="metabox_label"></span><input class="form-control" name="disf_colmat_su_percent" v-model="editedItem.disf_colmat_su_percent"></div></td>
                  <td><div class="icas-field"><span class="metabox_label"></span><input class="form-control" name="disf_colmat_srad_percent" v-model="editedItem.disf_colmat_srad_percent"></div></td>
                  <td><div class="icas-field"><span class="metabox_label"></span><input class="form-control" name="disf_section_dim_perecent" v-model="editedItem.disf_section_dim_perecent"></div></td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </fieldset>
    </div>


      <div class="col-sm-12 text-center">
        <button type="submit" class="btn btn-primary" :disabled="!isValid">Submit</button>
        <button type="button" class="btn btn-warning" @click="onCancel">Cancel</button>
      </div>
    </form>
  </div>
</template>

<script>

import generalMixin  from './../../../mixins/general'

import { EditState } from './../../../models/EditState'

import EditorSpurInventory from './EditorSpurInventory.vue'
import EditorFinalSpurLongInventory from './EditorFinalSpurLongInventory.vue'

export default{
  mixins: [ generalMixin ],
  props: [ 'sector', 'sectorInventory', 'finalSpurInventory', 'showFinalSpur' ,'year', 'editState' ],

  data() {
    return {
      editedYear: '',
      editedItem: null,
      editedFinalSpur: null
    }
  },

  methods: {
    onSubmit(){
      let data = {
        sectorInventory: this.editedItem,
        year: this.editedYear
      }

      if(this.showFinalSpur){
        data.finalSpurInventory = this.finalSpurInventory
      }
      this.$emit('submit', JSON.stringify(data));
    },

    onCancel(){
      this.editedItem = this.jsonCopy(this.sectorInventory)
      this.editedFinalSpur = this.jsonCopy(this.finalSpurInventory)
    }
  },

  computed: {
    isNew(){
      return this.editState == EditState.NEW
    },

    isEdit(){
      return this.editState == EditState.EDIT
    },

    isValid: function(){
      return this.editedYear
    },
  },

  components: {
    EditorSpurInventory,
    EditorFinalSpurLongInventory
  },

  watch: {
    'year': function(){
      this.editedYear = this.year
    },

    'sectorInventory': function(val){
      this.editedItem = this.jsonCopy(this.sectorInventory)
    },

    'finalSpurInventory': function(val){
      this.editedFinalSpur = this.jsonCopy(this.finalSpurInventory)
    }
  },

  created(){
    this.editedYear = this.year
    this.editedItem = this.jsonCopy(this.sectorInventory)
    this.editedFinalSpur = this.jsonCopy(this.finalSpurInventory)
  }

}
</script>

<style>
</style>
