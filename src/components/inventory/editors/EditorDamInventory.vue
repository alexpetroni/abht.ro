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
            <div class="form-err-message">{{ validation.firstError('editedItem.year') }}</div>
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
                <td>stânga</td>
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
                <template v-for="d in damMainBodyDamagesFields">
                  <td>
                    <div class="form-group" :class="{'has-error': validation.hasError('editedItem.dam.'+d)}">
                    <input type="text" v-model="editedItem.dam[d]" class="form-control">
                  </div>
                  </td>
                </template>
              </tr>
            </tbody>
          </table>

        </fieldset>



        <fieldset :class="{'disabledLabel': !construction.cd.has_apron}">
          <legend :class="{'disabledLabel': !construction.cd.has_apron}">Avarii radier</legend>

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
                <template v-for="d in damApronDamagesFields">
                  <td>
                    <div class="form-group" :class="{'has-error': validation.hasError('editedItem.dam.'+d)}">
                    <input type="text" v-model="editedItem.dam[d]" class="form-control" :disabled="!construction.cd.has_apron">
                  </div>
                  </td>
                </template>
              </tr>
            </tbody>
          </table>

        </fieldset>





        <fieldset :class="{'disabledLabel': !construction.cd.has_apron}">
          <legend :class="{'disabledLabel': !construction.cd.has_apron}">Avarii ziduri de conducere</legend>

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
                <td>Zid stânga</td>
                <template v-for="d in damSidewallDamagesFields">
                  <td>
                    <div class="form-group" :class="{'has-error': validation.hasError('editedItem.dam.sidewall_left_'+d)}">
                    <input type="text" v-model="editedItem.dam['sidewall_left_'+d]" class="form-control" :disabled="!construction.cd.has_apron">
                  </div>
                  </td>
                </template>
              </tr>
              <tr>
                <td>Zid dreapta</td>
                <template v-for="d in damSidewallDamagesFields">
                  <td>
                    <div class="form-group" :class="{'has-error': validation.hasError('editedItem.dam.sidewall_right_'+d)}">
                    <input type="text" v-model="editedItem.dam['sidewall_right_'+d]" class="form-control" :disabled="!construction.cd.has_apron">
                  </div>
                  </td>
                </template>
              </tr>
            </tbody>
          </table>

        </fieldset>




        <fieldset :class="{'disabledLabel': ! construction.cd.has_final_spur}">
          <legend :class="{'disabledLabel': ! construction.cd.has_final_spur}">Avarii pinten terminal</legend>


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
                <td>stânga</td>
                <td>dreapta</td>


                <td>nr</td>
                <td>lungime(m)</td>

                <td>nr</td>
                <td>lungime(m)</td>

                <td>stânga</td>
                <td>dreapta</td>
                <td>central</td>

                <td>h(cm)</td>
                <td>%</td>
              </tr>
            </thead>
            <tbody>
              <tr>
                <template v-for="d in damFinalSpurDamagesFields">
                  <td>
                    <div class="form-group" :class="{'has-error': validation.hasError('editedItem.final_spur.'+d)}">
                      <input type="text" v-model="editedItem.final_spur[d]" class="form-control" :disabled="! construction.cd.has_final_spur">
                  </div>
                  </td>
                </template>
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
                <td>Înălţime aterisament</td>
                <td>Granulometrie aluviuni</td>
                <td colspan="2">Vegetaţie lemnoasă nedorită</td>
                <td>Reducere secţiune</td>
              </tr>
              <tr>
                <td>%SU</td>


                <td  :class="noApronClass">%SU</td>
                <td  :class="noApronClass">%Srad</td>


                <td>Hat (m)</td>

                <td>Gal</td>

                <td>amonte (1-5)</td>

                <td>aval (1-5)</td>

                <td>aval(%)</td>
              </tr>
            </thead>
            <tbody>
              <tr>
                <template v-for="d in damDisfunctionalitiesFields">
                  <td>
                    <div class="form-group" :class="{'has-error': validation.hasError('editedItem.dam.'+d)}">
                      <input v-if="d != 'disf_gal_type'"  type="text" v-model="editedItem.dam[d]" class="form-control"
                      :disabled="! construction.cd.has_apron && (d == 'disf_colmat_apron_su_percent' || d == 'disf_colmat_apron_srad_percent')">

                      <select v-else v-model="editedItem.dam[d]" class="form-control">
                        <option v-for="o in getTransGranulometryOptionTypes()" :value="o.slug">{{ o.name }}</option>
                      </select>
                  </div>
                  </td>
                </template>
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
          <button type="submit" class="btn btn-primary" >Submit</button>
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
      damMainBodyDamagesFields: [
          'dec_left',
          'dec_right',
          'af_height',
          'af_percent',
          'h_crak_dev_nr',
          'h_crak_dev_l',
          'v_crak_dev_nr',
          'v_crak_dev_l',
          'h_crak_undev_nr',
          'h_crak_undev_l',
          'v_crak_undev_nr',
          'v_crak_undev_l',
          'detach_dev_percent',
          'detach_undev_left_percent',
          'detach_undev_right_percent',
          'erosion_height',
          'erosion_percent'
        ],

        damApronDamagesFields: [
          'apron_crack_nr',
          'apron_crack_percent',
          'apron_af_height',
          'apron_af_percent',
          'apron_detach_percent',
          'apron_teeth_detach_nr',
          'apron_detach_counter_dam_percent',
          'apron_erosion_height',
          'apron_erosion_percent'
        ],

        damSidewallDamagesFields: [
          'horiz_craks_nr',
          'horiz_length',
          'vert_craks_nr',
          'vert_length',
          'displaced_percent',
          'abrasion_deep',
          'abrasion_percent',
        ],

        damFinalSpurDamagesFields: [
          'final_spur_decastr_left',
          'final_spur_decastr_right',
          'final_spur_horiz_crack_nr',
          'final_spur_horiz_crack_length',
          'final_spur_vert_crack_nr',
          'final_spur_vert_crack_length',
          'final_spur_detach_left_percent',
          'final_spur_detach_right_percent',
          'final_spur_detach_center_percent',
          'final_spur_erosion_height',
          'final_spur_erosion_percent',
        ],


        damDisfunctionalitiesFields: [
          'disf_colmat_deversor_percent',
          'disf_colmat_apron_su_percent',
          'disf_colmat_apron_srad_percent',
          'disf_hat',
          'disf_gal_type',
          'disf_veget_amonte',
          'disf_veget_aval',
          'disf_section_dim_perecent'
        ],

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

    'editedItem.year': function(value) {
      return this.validateYear(value)
    },

    'editedItem.dam.dec_left': function(value) {
      return this.validatePositiveNumber(value)
    },

    'editedItem.dam.dec_right': function(value) {
      return this.validatePositiveNumber(value)
    },

    'editedItem.dam.af_height': function(value) {
      return this.validatePositiveNumber(value)
    },

    'editedItem.dam.af_percent': function(value) {
      return this.validatePercent(value)
    },

    'editedItem.dam.h_crak_dev_nr': function(value) {
      return this.validatePositiveInteger(value)
    },

    'editedItem.dam.h_crak_dev_l': function(value) {
      return this.validatePositiveNumber(value)
    },

    'editedItem.dam.v_crak_dev_nr': function(value) {
      return this.validatePositiveInteger(value)
    },

    'editedItem.dam.v_crak_dev_l': function(value) {
      return this.validatePositiveNumber(value)
    },

    'editedItem.dam.h_crak_undev_nr': function(value) {
      return this.validatePositiveInteger(value)
    },

    'editedItem.dam.h_crak_undev_l': function(value) {
      return this.validatePositiveNumber(value)
    },

    'editedItem.dam.v_crak_undev_nr': function(value) {
      return this.validatePositiveInteger(value)
    },

    'editedItem.dam.v_crak_undev_l': function(value) {
      return this.validatePositiveNumber(value)
    },

    'editedItem.dam.detach_dev_percent': function(value) {
      return this.validatePercent(value)
    },

    'editedItem.dam.detach_undev_left_percent': function(value) {
      return this.validatePercent(value)
    },

    'editedItem.dam.detach_undev_right_percent': function(value) {
      return this.validatePercent(value)
    },

    'editedItem.dam.erosion_height': function(value) {
      return this.validatePositiveNumber(value)
    },

    'editedItem.dam.erosion_percent': function(value) {
      return this.validatePercent(value)
    },


    // Avarii radier

    'editedItem.dam.apron_crack_nr': function(value) {
      if(!this. construction.cd.has_apron) return
      return this.validatePositiveInteger(value)
    },

    'editedItem.dam.apron_crack_percent': function(value) {
      if(!this. construction.cd.has_apron) return
      return this.validatePercent(value)
    },

    'editedItem.dam.apron_af_height': function(value) {
      if(!this. construction.cd.has_apron) return
      return this.validatePositiveNumber(value)
    },

    'editedItem.dam.apron_af_percent': function(value) {
      if(!this. construction.cd.has_apron) return
      return this.validatePercent(value)
    },

    'editedItem.dam.apron_detach_percent': function(value) {
      if(!this. construction.cd.has_apron) return
      return this.validatePercent(value)
    },

    'editedItem.dam.apron_teeth_detach_nr': function(value) {
      if(!this. construction.cd.has_apron) return
      return this.validatePositiveInteger(value)
    },

    'editedItem.dam.apron_detach_counter_dam_percent': function(value) {
      if(!this. construction.cd.has_apron) return
      return this.validatePercent(value)
    },

    'editedItem.dam.apron_erosion_height': function(value) {
      if(!this. construction.cd.has_apron) return
      return this.validatePositiveNumber(value)
    },

    'editedItem.dam.apron_erosion_percent': function(value) {
      if(!this. construction.cd.has_apron) return
      return this.validatePercent(value)
    },

      // Avarii ziduri


      'editedItem.dam.sidewall_left_horiz_craks_nr': function(value) {
        if(!this. construction.cd.has_apron) return
        return this.validatePositiveInteger(value)
      },

      'editedItem.dam.sidewall_left_horiz_length': function(value) {
        if(!this. construction.cd.has_apron) return
        return this.validatePositiveNumber(value)
      },

      'editedItem.dam.sidewall_left_vert_craks_nr': function(value) {
        if(!this. construction.cd.has_apron) return
        return this.validatePositiveInteger(value)
      },

      'editedItem.dam.sidewall_left_vert_length': function(value) {
        if(!this. construction.cd.has_apron) return
        return this.validatePositiveNumber(value)
      },

      'editedItem.dam.sidewall_left_displaced_percent': function(value) {
        if(!this. construction.cd.has_apron) return
        return this.validatePercent(value)
      },

      'editedItem.dam.sidewall_left_abrasion_deep': function(value) {
        if(!this. construction.cd.has_apron) return
        return this.validatePositiveNumber(value)
      },

      'editedItem.dam.sidewall_left_abrasion_percent': function(value) {
        if(!this. construction.cd.has_apron) return
        return this.validatePercent(value)
      },





      'editedItem.dam.sidewall_right_horiz_craks_nr': function(value) {
        if(!this. construction.cd.has_apron) return
        return this.validatePositiveInteger(value)
      },

      'editedItem.dam.sidewall_right_horiz_length': function(value) {
        if(!this. construction.cd.has_apron) return
        return this.validatePositiveNumber(value)
      },

      'editedItem.dam.sidewall_right_vert_craks_nr': function(value) {
        if(!this. construction.cd.has_apron) return
        return this.validatePositiveInteger(value)
      },

      'editedItem.dam.sidewall_right_vert_length': function(value) {
        if(!this. construction.cd.has_apron) return
        return this.validatePositiveNumber(value)
      },

      'editedItem.dam.sidewall_right_displaced_percent': function(value) {
        if(!this. construction.cd.has_apron) return
        return this.validatePercent(value)
      },

      'editedItem.dam.sidewall_right_abrasion_deep': function(value) {
        if(!this. construction.cd.has_apron) return
        return this.validatePositiveNumber(value)
      },

      'editedItem.dam.sidewall_right_abrasion_percent': function(value) {
        if(!this. construction.cd.has_apron) return
        return this.validatePercent(value)
      },


      // Avarii pinten terminal

      'editedItem.final_spur.final_spur_decastr_left': function(value) {
        if(!this. construction.cd.has_final_spur) return
        return this.validatePositiveInteger(value)
      },

      'editedItem.final_spur.final_spur_decastr_right': function(value) {
        if(!this. construction.cd.has_final_spur) return
        return this.validatePositiveNumber(value)
      },

      'editedItem.final_spur.final_spur_horiz_crack_nr': function(value) {
        if(!this. construction.cd.has_final_spur) return
        return this.validatePositiveInteger(value)
      },

      'editedItem.final_spur.final_spur_horiz_crack_length': function(value) {
        if(!this. construction.cd.has_final_spur) return
        return this.validatePositiveNumber(value)
      },

      'editedItem.final_spur.final_spur_vert_crack_nr': function(value) {
        if(!this. construction.cd.has_final_spur) return
        return this.validatePositiveInteger(value)
      },

      'editedItem.final_spur.final_spur_vert_crack_length': function(value) {
        if(!this. construction.cd.has_final_spur) return
        return this.validatePositiveNumber(value)
      },

      'editedItem.final_spur.final_spur_detach_left_percent': function(value) {
        if(!this. construction.cd.has_final_spur) return
        return this.validatePercent(value)
      },

      'editedItem.final_spur.final_spur_detach_right_percent': function(value) {
        if(!this. construction.cd.has_final_spur) return
        return this.validatePositiveNumber(value)
      },

      'editedItem.final_spur.final_spur_detach_center_percent': function(value) {
        if(!this. construction.cd.has_final_spur) return
        return this.validatePercent(value)
      },


      'editedItem.final_spur.final_spur_erosion_height': function(value) {
        if(!this. construction.cd.has_final_spur) return
        return this.validatePositiveInteger(value)
      },

      'editedItem.final_spur.final_spur_erosion_percent': function(value) {
        if(!this. construction.cd.has_final_spur) return
        return this.validatePositiveNumber(value)
      },


      // disfunctionali

      'editedItem.dam.disf_colmat_deversor_percent': function(value) {
        return this.validatePercent(value)
      },

      'editedItem.dam.disf_colmat_apron_su_percent': function(value) {
        if(!this. construction.cd.has_apron) return
        return this.validatePercent(value)
      },

      'editedItem.dam.disf_colmat_apron_srad_percent': function(value) {
        if(!this. construction.cd.has_apron) return
        return this.validatePercent(value)
      },

      'editedItem.dam.disf_hat': function(value) {
        return this.validatePositiveNumber(value)
      },

      'editedItem.dam.disf_gal_type': function(value) {
        return Validator.value(value).required()
      },

      'editedItem.dam.disf_veget_amonte': function(value) {
        return this.validate1To5(value)
      },

      'editedItem.dam.disf_veget_aval': function(value) {
        return this.validate1To5(value)
      },

      'editedItem.dam.disf_section_dim_perecent': function(value) {
        return this.validatePercent(value)
      },

  },

  watch: {

  },

}
</script>

<style>
</style>
