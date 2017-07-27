<template>
  <div class="row">

    <div class="col-sm-12">
      <form @submit.prevent="onSubmit">

        <div class="row form-group" v-if="isNew">
          <div class="col-xs-6 col-sm-3 col-md-2">
            <label for="year">An inventariere</label>
          </div>
          <div class="col-xs-6 col-sm-3 col-md-2">
            <input id="year" type="text" v-model="editedItem.year" class="form-control">
          </div>
        </div>



        <fieldset>
          <legend>Avarii lucrare propriu zisă</legend>

          <table class="table table-bordered abht-table">
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

                <td>stg. %</td>
                <td>dr. %</td>

                <td>h(cm)</td>
                <td>%</td>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>
                  <div class="form-group" :class="{'has-error': validation.hasError('editedItem.dam.dec_left')}">
                  <input type="text" v-model="editedItem.dam['dec_left']" class="form-control">
                </div>
                </td>
                <td><div class="form-group" :class="{'has-error': validation.hasError('editedItem.dam.dec_right')}">
                <input type="text" v-model="editedItem.dam.dec_right" class="form-control">
              </div>
              </td>
                <td><div class="form-group" :class="{'has-error': validation.hasError('editedItem.dam.af_height')}">
                <input type="text" v-model="editedItem.dam.af_height" class="form-control">
              </div>
              </td>
                <td><div class="form-group" :class="{'has-error': validation.hasError('editedItem.dam.af_percent')}">
                <input type="text" v-model="editedItem.dam.af_percent" class="form-control">
              </div>
              </td>
                <td><div class="form-group" :class="{'has-error': validation.hasError('editedItem.dam.h_crak_dev_nr')}">
                <input type="text" v-model="editedItem.dam.h_crak_dev_nr" class="form-control">
              </div>
              </td>
                <td><div class="form-group" :class="{'has-error': validation.hasError('editedItem.dam.h_crak_dev_l')}">
                <input type="text" v-model="editedItem.dam.h_crak_dev_l" class="form-control">
              </div>
              </td>
                <td><div class="form-group" :class="{'has-error': validation.hasError('editedItem.dam.v_crak_dev_nr')}">
                <input type="text" v-model="editedItem.dam.v_crak_dev_nr" class="form-control">
              </div>
              </td>
                <td><div class="form-group" :class="{'has-error': validation.hasError('editedItem.dam.v_crak_dev_l')}">
                <input type="text" v-model="editedItem.dam.v_crak_dev_l" class="form-control">
              </div>
              </td>
                <td><div class="form-group" :class="{'has-error': validation.hasError('editedItem.dam.h_crak_undev_nr')}">
                <input type="text" v-model="editedItem.dam.h_crak_undev_nr" class="form-control">
              </div>
              </td>
                <td><div class="form-group" :class="{'has-error': validation.hasError('editedItem.dam.h_crak_undev_l')}">
                <input type="text" v-model="editedItem.dam.h_crak_undev_l" class="form-control">
              </div>
              </td>
                <td><div class="form-group" :class="{'has-error': validation.hasError('editedItem.dam.v_crak_undev_nr')}">
                <input type="text" v-model="editedItem.dam.v_crak_undev_nr" class="form-control">
              </div>
              </td>
                <td><div class="form-group" :class="{'has-error': validation.hasError('editedItem.dam.v_crak_undev_l')}">
                <input type="text" v-model="editedItem.dam.v_crak_undev_l" class="form-control">
              </div>
              </td>
                <td><div class="form-group" :class="{'has-error': validation.hasError('editedItem.dam.detach_dev_percent')}">
                <input type="text" v-model="editedItem.dam.detach_dev_percent" class="form-control">
              </div>
              </td>
                <td><div class="form-group" :class="{'has-error': validation.hasError('editedItem.dam.detach_undev_left_percent')}">
                <input type="text" v-model="editedItem.dam.detach_undev_left_percent" class="form-control">
              </div>
              </td>
                <td><div class="form-group" :class="{'has-error': validation.hasError('editedItem.dam.detach_undev_right_percent')}">
                <input type="text" v-model="editedItem.dam.detach_undev_right_percent" class="form-control">
              </div>
              </td>
                <td><div class="form-group" :class="{'has-error': validation.hasError('editedItem.dam.erosion_height')}">
                <input type="text" v-model="editedItem.dam.erosion_height" class="form-control">
              </div>
              </td>
                <td><div class="form-group" :class="{'has-error': validation.hasError('editedItem.dam.erosion_percent')}">
                <input type="text" v-model="editedItem.dam.erosion_percent" class="form-control">
              </div>
              </td>
              </tr>
            </tbody>
          </table>

        </fieldset>



        <fieldset :class="{'disabledLabel': !construction.has_apron}">
          <legend :class="{'disabledLabel': !construction.has_apron}">Avarii radier</legend>

          <table class="table table-bordered abht-table">
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
                <td>
                  <div class="form-group" :class="{'has-error': validation.hasError('editedItem.dam.apron_crack_nr')}">
                    <input type="text"  v-model="editedItem.dam.apron_crack_nr" class="form-control" :disabled="!construction.has_apron">
                  </div>
                </td>
                <td>
<div class="form-group" :class="{'has-error': validation.hasError('editedItem.dam.apron_crack_percent')}">
                  <input type="text"  v-model="editedItem.dam.apron_crack_percent" class="form-control" :disabled="!construction.has_apron">
                </div>
                </td>
                <td>
                  <div class="form-group" >
                  <input type="text" :class="{'has-error': validation.hasError('editedItem.dam.apron_af_height')}" v-model="editedItem.dam.apron_af_height" class="form-control" :disabled="!construction.has_apron">
                  </div>
                </td>
                <td>
                  <div class="form-group" >
                  <input type="text" :class="{'has-error': validation.hasError('editedItem.dam.apron_af_percent')}" v-model="editedItem.dam.apron_af_percent" class="form-control" :disabled="!construction.has_apron">
                  </div>
                </td>

                <td>
                  <div class="form-group" >
                  <input type="text" :class="{'has-error': validation.hasError('editedItem.dam.apron_detach_percent')}" v-model="editedItem.dam.apron_detach_percent" class="form-control" :disabled="!construction.has_apron">

                </div>
                </td>
                <td>
                  <div class="form-group" >
                  <input type="text" :class="{'has-error': validation.hasError('editedItem.dam.apron_teeth_detach_nr')}" v-model="editedItem.dam.apron_teeth_detach_nr" class="form-control" :disabled="!construction.has_apron">
</div>
                </td>


                <td>
                  <div class="form-group" >
                  <input type="text" :class="{'has-error': validation.hasError('editedItem.dam.apron_detach_counter_dam_percent')}" v-model="editedItem.dam.apron_detach_counter_dam_percent" class="form-control" :disabled="!construction.has_apron">
</div>
                </td>


                <td>
                  <div class="form-group" >
                  <input type="text" :class="{'has-error': validation.hasError('editedItem.dam.apron_erosion_height')}" v-model="editedItem.dam.apron_erosion_height" class="form-control" :disabled="!construction.has_apron">
</div>
                </td>


                <td>
                  <div class="form-group" >
                  <input type="text" :class="{'has-error': validation.hasError('editedItem.dam.apron_erosion_percent')}" v-model="editedItem.dam.apron_erosion_percent" class="form-control" :disabled="!construction.has_apron">
                </div>
                </td>
              </tr>
            </tbody>
          </table>

        </fieldset>





        <fieldset>
          <legend>Avarii ziduri de conducere</legend>

          <table  class="table table-bordered abht-table">
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
                <td><input type="text" v-model="editedItem.dam.sidewall_left_horiz_craks_nr" class="form-control"></td>
                <td><input type="text" v-model="editedItem.dam.sidewall_left_horiz_length" class="form-control"></td>
                <td><input type="text" v-model="editedItem.dam.sidewall_left_vert_craks_nr" class="form-control"></td>
                <td><input type="text" v-model="editedItem.dam.sidewall_left_vert_length" class="form-control"></td>
                <td><input type="text" v-model="editedItem.dam.sidewall_left_displaced_percent" class="form-control"></td>
                <td><input type="text" v-model="editedItem.dam.sidewall_left_abrasion_deep" class="form-control"></td>
                <td><input type="text" v-model="editedItem.dam.sidewall_left_abrasion_percent" class="form-control"></td>
              </tr>
              <tr>
                <td>Zid dreapta</td>
                <td><input type="text" v-model="editedItem.dam.sidewall_right_horiz_craks_nr" class="form-control"></td>
                <td><input type="text" v-model="editedItem.dam.sidewall_right_horiz_length" class="form-control"></td>
                <td><input type="text" v-model="editedItem.dam.sidewall_right_vert_craks_nr" class="form-control"></td>
                <td><input type="text" v-model="editedItem.dam.sidewall_right_vert_length" class="form-control"></td>
                <td><input type="text" v-model="editedItem.dam.sidewall_right_displaced_percent" class="form-control"></td>
                <td><input type="text" v-model="editedItem.dam.sidewall_right_abrasion_deep" class="form-control"></td>
                <td><input type="text" v-model="editedItem.dam.sidewall_right_abrasion_percent" class="form-control"></td>
              </tr>
            </tbody>
          </table>

        </fieldset>




        <fieldset :class="{'disabledLabel': !construction.has_final_spur}">
          <legend :class="{'disabledLabel': !construction.has_final_spur}">Avarii pinten terminal</legend>


          <table  class="table table-bordered abht-table">
            <thead>
              <tr class="first-row">
                <td colspan="2">Decastrare <span class="unbold">H(m)</span></td>
                <td colspan="2">Fisuri orizontale</td>
                <td colspan="2">Fisuri verticale</td>
                <td colspan="3">Desprinderi %</td>
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
                <td><input type="text" v-model="editedItem.final_spur.final_spur_decastr_left" class="form-control" :disabled="!construction.has_final_spur"></td>
                <td><input type="text" v-model="editedItem.final_spur.final_spur_decastr_right" class="form-control" :disabled="!construction.has_final_spur"></td>
                <td><input type="text" v-model="editedItem.final_spur.final_spur_horiz_crack_nr" class="form-control" :disabled="!construction.has_final_spur"></td>
                <td><input type="text" v-model="editedItem.final_spur.final_spur_horiz_crack_length" class="form-control" :disabled="!construction.has_final_spur"></td>
                <td><input type="text" v-model="editedItem.final_spur.final_spur_vert_crack_nr" class="form-control" :disabled="!construction.has_final_spur"></td>
                <td><input type="text" v-model="editedItem.final_spur.final_spur_vert_crack_length" class="form-control" :disabled="!construction.has_final_spur"></td>
                <td><input type="text" v-model="editedItem.final_spur.final_spur_detach_left_percent" class="form-control" :disabled="!construction.has_final_spur"></td>
                <td><input type="text" v-model="editedItem.final_spur.final_spur_detach_right_percent" class="form-control" :disabled="!construction.has_final_spur"></td>
                <td><input type="text" v-model="editedItem.final_spur.final_spur_detach_center_percent" class="form-control" :disabled="!construction.has_final_spur"></td>
                <td><input type="text" v-model="editedItem.final_spur.final_spur_erosion_height" class="form-control" :disabled="!construction.has_final_spur"></td>
                <td><input type="text" v-model="editedItem.final_spur.final_spur_erosion_percent" class="form-control" :disabled="!construction.has_final_spur"></td>
              </tr>
            </tbody>
          </table>

        </fieldset>




        <fieldset>
          <legend>Disfuncţionalităţi</legend>

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
                <td><input type="text" v-model="editedItem.dam.disf_colmat_deversor_percent" class="form-control">{{ inventory.disf_colmat_deversor_percent }}</td>

                <td><input type="text" v-model="editedItem.dam.disf_colmat_apron_su_percent" class="form-control"  :disabled="!construction.has_apron">{{ inventory.disf_colmat_apron_su_percent }}</td>
                <td><input type="text" v-model="editedItem.dam.disf_colmat_apron_srad_percent" class="form-control"  :disabled="!construction.has_apron">{{ inventory.disf_colmat_apron_srad_percent }}</td>

                <td><input type="text" v-model="editedItem.dam.disf_hat" class="form-control"></td>
                <td>
                  <select v-model="editedItem.dam.disf_gal_type" class="form-control">
                    <option disabled value="">Selectează</option>
                    <option v-for="o in transGranulometryTypes()" :value="o.slug">{{ o.name }}</option>
                  </select>

                </td>
                <td><input type="text" v-model="editedItem.dam.disf_veget_amonte" class="form-control"></td>
                <td><input type="text" v-model="editedItem.dam.disf_veget_aval" class="form-control"></td>
                <td><input type="text" v-model="editedItem.dam.disf_section_dim_perecent" class="form-control"></td>
              </tr>
            </tbody>
          </table>

        </fieldset>

        <transition name="fade">
        <div class="col-sm-12 text-center" v-show="!validForm">
                <div class="alert alert-danger" role="alert">Verifica campurile invalide!</div>
              </div>
        </transition>


        <div class="col-sm-12 text-center">
          <button type="submit" class="btn btn-primary" :disabled="!isValid">Submit</button>
          <button type="button" class="btn btn-warning" @click="onCancel">Cancel</button>
        </div>

      </form>
    </div>
  </div>
</template>


<script>

import generalMixin from './../../../mixins/general'
import constructionMixin from './../../../mixins/construction'
import inventoryMixin from './../../../mixins/inventory'
import formMixin from './../../../mixins/form'

import SimpleVueValidation from 'simple-vue-validator'
const Validator = SimpleVueValidation.Validator
const validatorMixin = SimpleVueValidation.mixin

import { EditState } from './../../../models/EditState'

export default{
  mixins: [ generalMixin, constructionMixin, inventoryMixin,  validatorMixin, formMixin ],
  props: [ 'construction', 'inventory', 'editState' ],

  data() {
    return {
      editedItem: this.jsonCopy(this.inventory)
    }
  },

  methods: {
    onSubmit(){
      this.$validate().then(success => {
        if(success){
          let data = { inventory: this.editedItem }
          this.$emit('submit', JSON.stringify(data));
        }else{
          this.showInvalidFormMessage()
        }
      })


    },

    onCancel(){
      this.editedItem = this.jsonCopy(this.inventory)
    }
  },

  computed: {
    isValid: function(){
      return this.editedItem.year;
    },

    isNew(){
      return this.editState == EditState.NEW
    },

    isEdit(){
      return this.editState == EditState.EDIT
    },

  },

  components: {

  },

  validators: {
    'editedItem.dam.dec_left': function(value) {
      return Validator.value(value).required().regex(/^[+]?\d+([.]\d+)?$/, 'Numar pozitiv.')
    },

    'editedItem.dam.dec_right': function(value) {
      return Validator.value(value).required().regex(/^[+]?\d+([.]\d+)?$/, 'Numar pozitiv.')
    },

    'editedItem.dam.af_height': function(value) {
      return Validator.value(value).required()
    },

    'editedItem.dam.af_percent': function(value) {
      return Validator.value(value).required().between(0, 100)
    },

    'editedItem.dam.h_crak_dev_nr': function(value) {
      return this.validatePositiveNumber(value)
    },

    'editedItem.dam.h_crak_dev_l': function(value) {
      return Validator.value(value).required().regex(/^[+]?\d+([.]\d+)?$/, 'Numar pozitiv.')
    },

    'editedItem.dam.v_crak_dev_nr': function(value) {
      return Validator.value(value).required().regex(/^\d+$/, 'Numar intreg.')
    },

    'editedItem.dam.v_crak_dev_l': function(value) {
      return Validator.value(value).required().regex(/^[+]?\d+([.]\d+)?$/, 'Numar pozitiv.')
    },

    'editedItem.dam.h_crak_undev_nr': function(value) {
      return Validator.value(value).required().regex(/^\d+$/, 'Numar intreg.')
    },

    'editedItem.dam.h_crak_undev_l': function(value) {
      return Validator.value(value).required().between(0, 100)
    },

    'editedItem.dam.v_crak_undev_nr': function(value) {
      return Validator.value(value).required().regex(/^\d+$/, 'Numar intreg.')
    },

    'editedItem.dam.v_crak_undev_l': function(value) {
      return Validator.value(value).required().between(0, 100)
    },

    'editedItem.dam.detach_dev_percent': function(value) {
      return Validator.value(value).required().between(0, 100)
    },

    'editedItem.dam.detach_undev_left_percent': function(value) {
      return Validator.value(value).required().between(0, 100)
    },

    'editedItem.dam.detach_undev_right_percent': function(value) {
      return Validator.value(value).required().between(0, 100)
    },

    'editedItem.dam.erosion_height': function(value) {
      return Validator.value(value).required().regex(/^[+]?\d+([.]\d+)?$/, 'Numar pozitiv.')
    },

    'editedItem.dam.erosion_percent': function(value) {
      return Validator.value(value).required().between(0, 100)
    },


    // Avarii radier

    'editedItem.dam.apron_crack_nr': function(value) {
      return Validator.value(value).required().regex(/^\d+$/, 'Numar intreg.')
    },

    'editedItem.dam.apron_crack_percent': function(value) {
      return Validator.value(value).required().between(0, 100)
    },

    'editedItem.dam.apron_af_height': function(value) {
      return Validator.value(value).required().regex(/^[+]?\d+([.]\d+)?$/, 'Numar pozitiv.')
    },

    'editedItem.dam.apron_af_percent': function(value) {
      return Validator.value(value).required().between(0, 100)
    },

    'editedItem.dam.apron_teeth_detach_nr': function(value) {
      return Validator.value(value).required().regex(/^\d+$/, 'Numar intreg.')
    },

    'editedItem.dam.apron_detach_counter_dam_percent': function(value) {
      return Validator.value(value).required().between(0, 100)
    },

    'editedItem.dam.apron_erosion_height': function(value) {
      return Validator.value(value).required().regex(/^[+]?\d+([.]\d+)?$/, 'Numar pozitiv.')
    },

    'editedItem.dam.apron_erosion_percent': function(value) {
      return Validator.value(value).required().between(0, 100)
    },


  },

  watch: {

  },

}
</script>

<style>
</style>
