<template>
  <div class="row">
    <form @submit.prevent="onSubmit">

      <div v-if="isNew">
      <div  class="col-xs-6 col-sm-3 col-md-2">
        <label for="year">An inventariere</label>
      </div>
      <div class="col-xs-6 col-sm-3 col-md-2">
        <input id="year" type="text" v-model="editedYear" class="form-control">
        <div class="form-err-message">{{ validation.firstError('editedYear') }}</div>
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
                    <td><div class="form-group" :class="{'has-error': validation.hasError('editedItem.apron_craks_nr')}"><span class="metabox_label"></span><input  class="form-control" name="apron_craks_nr" v-model="editedItem.apron_craks_nr"></div></td>
                    <td><div class="form-group" :class="{'has-error': validation.hasError('editedItem.apron_damage_percent')}"><span class="metabox_label"></span><input  class="form-control" name="apron_damage_percent" v-model="editedItem.apron_damage_percent"></div></td>
                    <td><div class="form-group" :class="{'has-error': validation.hasError('editedItem.apron_displaced')}"><span class="metabox_label"></span><input  class="form-control" name="apron_displaced" v-model="editedItem.apron_displaced"></div></td>
                    <td><div class="form-group" :class="{'has-error': validation.hasError('editedItem.apron_abrasion_deep')}"><span class="metabox_label"></span><input  class="form-control" name="apron_abrasion_deep" v-model="editedItem.apron_abrasion_deep"></div></td>
                    <td><div class="form-group" :class="{'has-error': validation.hasError('editedItem.apron_abrasion_percent')}"><span class="metabox_label"></span><input  class="form-control" name="apron_abrasion_percent" v-model="editedItem.apron_abrasion_percent"></div></td>
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
                      <td style="font-weight:bold">Zid stânga</td>
                      <td><div class="form-group" :class="{'has-error': validation.hasError('editedItem.sidewall_left_horiz_craks_nr')}"><span class="metabox_label"></span><input size="3" class="form-control"  name="sidewall_left_horiz_craks_nr" v-model="editedItem.sidewall_left_horiz_craks_nr"></div></td>
                      <td><div class="form-group" :class="{'has-error': validation.hasError('editedItem.sidewall_left_horiz_length')}"><span class="metabox_label"></span><input size="3" class="form-control"  name="sidewall_left_horiz_length" v-model="editedItem.sidewall_left_horiz_length"></div></td>
                      <td><div class="form-group" :class="{'has-error': validation.hasError('editedItem.sidewall_left_vert_craks_nr')}"><span class="metabox_label"></span><input size="3" class="form-control"  name="sidewall_left_vert_craks_nr" v-model="editedItem.sidewall_left_vert_craks_nr"></div></td>
                      <td><div class="form-group" :class="{'has-error': validation.hasError('editedItem.sidewall_left_vert_length')}"><span class="metabox_label"></span><input size="3" class="form-control"  name="sidewall_left_vert_length" v-model="editedItem.sidewall_left_vert_length"></div></td>
                      <td><div class="form-group" :class="{'has-error': validation.hasError('editedItem.sidewall_left_displaced')}"><span class="metabox_label"></span><input size="3" class="form-control"  name="sidewall_left_displaced" v-model="editedItem.sidewall_left_displaced"></div></td>
                      <td><div class="form-group" :class="{'has-error': validation.hasError('editedItem.sidewall_left_abrasion_deep')}"><span class="metabox_label"></span><input size="3" class="form-control"  name="sidewall_left_abrasion_deep" v-model="editedItem.sidewall_left_abrasion_deep"></div></td>
                      <td><div class="form-group" :class="{'has-error': validation.hasError('editedItem.sidewall_left_abrasion_percent')}"><span class="metabox_label"></span><input size="3" class="form-control"  name="sidewall_left_abrasion_percent" v-model="editedItem.sidewall_left_abrasion_percent"></div></td>
                    </tr>
                    <tr>
                      <td style="font-weight:bold">Zid dreapta</td>
                      <td><div class="form-group" :class="{'has-error': validation.hasError('editedItem.sidewall_right_horiz_craks_nr')}"><span class="metabox_label"></span><input size="3" class="form-control"  name="sidewall_right_horiz_craks_nr" v-model="editedItem.sidewall_right_horiz_craks_nr"></div></td>
                      <td><div class="form-group" :class="{'has-error': validation.hasError('editedItem.sidewall_right_horiz_length')}"><span class="metabox_label"></span><input size="3" class="form-control"  name="sidewall_right_horiz_length" v-model="editedItem.sidewall_right_horiz_length"></div></td>
                      <td><div class="form-group" :class="{'has-error': validation.hasError('editedItem.sidewall_right_vert_craks_nr')}"><span class="metabox_label"></span><input size="3" class="form-control"  name="sidewall_right_vert_craks_nr" v-model="editedItem.sidewall_right_vert_craks_nr"></div></td>
                      <td><div class="form-group" :class="{'has-error': validation.hasError('editedItem.sidewall_right_vert_length')}"><span class="metabox_label"></span><input size="3" class="form-control"  name="sidewall_right_vert_length" v-model="editedItem.sidewall_right_vert_length"></div></td>
                      <td><div class="form-group" :class="{'has-error': validation.hasError('editedItem.sidewall_right_displaced')}"><span class="metabox_label"></span><input size="3" class="form-control"  name="sidewall_right_displaced" v-model="editedItem.sidewall_right_displaced"></div></td>
                      <td><div class="form-group" :class="{'has-error': validation.hasError('editedItem.sidewall_right_abrasion_deep')}"><span class="metabox_label"></span><input size="3" class="form-control"  name="sidewall_right_abrasion_deep" v-model="editedItem.sidewall_right_abrasion_deep"></div></td>
                      <td><div class="form-group" :class="{'has-error': validation.hasError('editedItem.sidewall_right_abrasion_percent')}"><span class="metabox_label"></span><input size="3" class="form-control"  name="sidewall_right_abrasion_percent" v-model="editedItem.sidewall_right_abrasion_percent"></div></td>
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
                  <td rowspan="2"><strong>Nr. pinten</strong></td>

                  <td colspan="2"><strong>Fisuri orizontale</strong></td>
                  <td colspan="2"><strong>Fisuri verticale</strong></td>
                  <td colspan="3"><strong>Desprinderi %</strong></td>
                  <td colspan="2"><strong>Eroziuni</strong></td>
                </tr>

                <tr>
                  <td>nr</td>
                  <td>lungime(m)</td>
                  <td>nr</td>
                  <td>lungime(m)</td>
                  <td>stânga</td>
                  <td>dreapta</td>
                  <td>centru</td>
                  <td>h(cm)</td>
                  <td>%</td>
                </tr>
              </thead>
              <tbody>

                <editor-spur-inventory
                v-for="spur in editedItem.spurs"
                :spur="spur"
                :key="editedItem.sector_nr+'_'+spur.spur_nr"
                @validate = "countValidation"
                ref="editSpurInventory"
                >
                </editor-spur-inventory>
              </tbody>
            </table>
          </fieldset>
          </div>

      </template>

      <editor-final-spur-long-inventory
      v-if="showFinalSpur"
      :final-spur-inventory = "finalSpurInventory"
      @validate = "countValidation"
      ref="finalSpurInventory"
      ></editor-final-spur-long-inventory>


      <div class="col-sm-12">
      <fieldset>
        <legend>Disfuncţionalităţi</legend>
        <div class="row">
          <div class="col-sm-12 col-md-5">
            <table  class="table table-bordered abht-table text-center">
              <thead>
                <tr  class="first-row">
                  <td colspan="2" class="text-center"><strong>Colmatare radier</strong></td>
                  <td class="text-center"><strong>Reducere secţ. aval</strong></td>
                </tr>

                <tr>
                  <td class="text-center">%SU</td>
                  <td class="text-center">%Srad</td>
                  <td class="text-center">%</td>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td><div class="form-group" :class="{'has-error': validation.hasError('editedItem.disf_colmat_su_percent')}"><span class="metabox_label"></span><input class="form-control" name="disf_colmat_su_percent" v-model="editedItem.disf_colmat_su_percent"></div></td>
                  <td><div class="form-group" :class="{'has-error': validation.hasError('editedItem.disf_colmat_srad_percent')}"><span class="metabox_label"></span><input class="form-control" name="disf_colmat_srad_percent" v-model="editedItem.disf_colmat_srad_percent"></div></td>
                  <td><div class="form-group" :class="{'has-error': validation.hasError('editedItem.disf_section_dim_perecent')}"><span class="metabox_label"></span><input class="form-control" name="disf_section_dim_perecent" v-model="editedItem.disf_section_dim_perecent"></div></td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </fieldset>
    </div>

    <br />
    <br />

    <transition name="fade">
    <div class="col-sm-12 text-center" v-show="!validForm">
            <div class="alert alert-danger" role="alert">Verifica campurile invalide!</div>
          </div>
    </transition>


      <div class="col-sm-12 text-center">
        <button type="submit" class="btn btn-primary" >Submit</button>
        <button type="button" class="btn btn-warning" @click="onCancel">Cancel</button>
      </div>
    </form>
  </div>
</template>

<script>
import SimpleVueValidation from 'simple-vue-validator'
const Validator = SimpleVueValidation.Validator
const validatorMixin = SimpleVueValidation.mixin

import generalMixin  from './../../../mixins/general'
import formMixin from './../../../mixins/form'

import { EditState } from './../../../models/EditState'

import EditorSpurInventory from './EditorSpurInventory.vue'
import EditorFinalSpurLongInventory from './EditorFinalSpurLongInventory.vue'



export default{
  mixins: [ generalMixin, formMixin, validatorMixin ],
  props: [ 'sector', 'sectorInventory', 'finalSpurInventory', 'showFinalSpur' ,'year', 'editState' ],

  data() {
    return {
      editedYear: this.year,
      editedItem: this.jsonCopy(this.sectorInventory),
      editedFinalSpur: this.jsonCopy(this.finalSpurInventory),

      nrChildrenToValidate: 0,
    }
  },

  methods: {
    onSubmit(){

      this.validForm = true

      this.nrChildrenToValidate = 1 // main form
      this.nrChildrenToValidate += this.editedItem.spurs.length
      this.nrChildrenToValidate += this.showFinalSpur ? 1 : 0

      this.$validate().then(success => {
        this.countValidation(success)
      })

    this.validateSectorSpurInventoryComponents()

    this.validateFinalSpurInventoryComponent()
    },


    validateSectorSpurInventoryComponents(){
      if(this.editedItem.spurs.length){
        this.$refs.editSpurInventory.forEach((comp, index)=>{
          console.log('comp', comp)
          comp.validate()
        })
      }
    },

    validateFinalSpurInventoryComponent(){
      if(this.showFinalSpur){
        this.$refs.finalSpurInventory.validate()
      }
    },

    countValidation(success){
      this.validForm = this.validForm && success
      this.nrChildrenToValidate -=1

      if(this.nrChildrenToValidate == 0){
        if(this.validForm){
          this.submitSectorInventoryData()
        }else{
          this.showInvalidFormMessage()
        }
      }
    },

    submitSectorInventoryData(){
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
  },

  validators: {
    'editedYear': function(value){
        return this.validateYear(value)
    },

    'editedItem.apron_craks_nr': function(value) {
      return this.validatePositiveNumber(value)
    },

    'editedItem.apron_damage_percent': function(value) {
      return this.validatePercent(value)
    },

    'editedItem.apron_displaced': function(value) {
      return this.validatePositiveNumber(value)
    },

    'editedItem.apron_abrasion_deep': function(value) {
      return this.validatePositiveNumber(value)
    },

    'editedItem.apron_abrasion_percent': function(value) {
      return this.validatePercent(value)
    },



    'editedItem.sidewall_left_horiz_craks_nr': function(value) {
      return this.validatePositiveNumber(value)
    },

    'editedItem.sidewall_left_horiz_length': function(value) {
      return this.validatePositiveNumber(value)
    },

    'editedItem.sidewall_left_vert_craks_nr': function(value) {
      return this.validatePositiveNumber(value)
    },

    'editedItem.sidewall_left_vert_length': function(value) {
      return this.validatePositiveNumber(value)
    },

    'editedItem.sidewall_left_displaced': function(value) {
      return this.validatePositiveNumber(value)
    },

    'editedItem.sidewall_left_abrasion_deep': function(value) {
      return this.validatePositiveNumber(value)
    },

    'editedItem.sidewall_left_abrasion_percent': function(value) {
      return this.validatePercent(value)
    },




    'editedItem.sidewall_right_horiz_craks_nr': function(value) {
      return this.validatePositiveNumber(value)
    },

    'editedItem.sidewall_right_horiz_length': function(value) {
      return this.validatePositiveNumber(value)
    },

    'editedItem.sidewall_right_vert_craks_nr': function(value) {
      return this.validatePositiveNumber(value)
    },

    'editedItem.sidewall_right_vert_length': function(value) {
      return this.validatePositiveNumber(value)
    },

    'editedItem.sidewall_right_displaced': function(value) {
      return this.validatePositiveNumber(value)
    },

    'editedItem.sidewall_right_abrasion_deep': function(value) {
      return this.validatePositiveNumber(value)
    },

    'editedItem.sidewall_right_abrasion_percent': function(value) {
      return this.validatePercent(value)
    },



    'editedItem.disf_colmat_su_percent': function(value) {
      return this.validatePercent(value)
    },

    'editedItem.disf_colmat_srad_percent': function(value) {
      return this.validatePercent(value)
    },

    'editedItem.disf_section_dim_perecent': function(value) {
      return this.validatePercent(value)
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
      this.validation.reset()
    },

    'finalSpurInventory': function(val){
      this.editedFinalSpur = this.jsonCopy(this.finalSpurInventory)
    }
  },

  created(){

  }

}
</script>

<style>
</style>
