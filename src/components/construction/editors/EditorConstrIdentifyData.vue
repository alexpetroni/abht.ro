<template>
  <div class="row">

    <div class="col-sm-12">
      <form id="identifyData" @submit.prevent="onSubmit" novalidate>

        <div v-if="isTransversal" class="form-inline">
          <div v-if="isNew">
            <div class="form-group">
              <input id="hasApron" type="checkbox" v-model="has_apron"  class="form-control">
              <label for="hasApron">Are radier? </label>

            </div>
            <div class="form-group" >
              <input id="hasFinalSpur"  type="checkbox" :disabled="!editedItem.cd.has_apron" v-model="editedItem.cd.has_final_spur" class="form-control">
              <label for="hasFinalSpur" :class="{'disabledLabel': !editedItem.cd.has_apron}">Are pinten terminal? </label>
            </div>
            <div class="form-group">
              <input id="hasConfuseur" type="checkbox" :disabled="!editedItem.cd.has_apron" v-model="editedItem.cd.has_confuseur" class="form-control">
              <label for="hasConfuseur" :class="{'disabledLabel': !editedItem.cd.has_apron}">Are confuzor? </label>
            </div>
          </div>
          <div v-else>
            <h4>{{ transversalSubtitle }}</h4>
          </div>
        </div>

        <div v-if="isLongitudinal">
          <div class="row"  v-if="isNew">
            <div class="form-group col-xs-12 col-sm-6 col-md-3">
              <label for="sectorsNr">Numar sectoare</label>
              <input id="sectorsNr" type="input" v-model="sectors_nr" class="form-control" >
            </div>
            <div class="form-group col-xs-12 col-sm-6 col-md-3">
              <label for="hasApron">Are pinten terminal?</label>
              <input id="hasApron" type="checkbox" v-model="longitudinal_has_final_spur" >
            </div>
          </div>
          <div v-else>
            <h4>{{ longitudinalSubtitle}}</h4>
          </div>
        </div>



        <fieldset>
          <legend>Identificare bazin</legend>

          <!-- Tip lucrare  Denumire bazin Cod lucrare -->
          <div class="row">

            <div class="form-group col-xs-12 col-sm-6 col-md-3">
              <div class="row">
                <label class="col-xs-12" for="basinName">Denumire bazin</label>
                <div class="col-xs-12">
                  <input type="text" name="basinName" id="basinName" v-model="editedItem.gd.basin_name" class="form-control" :class="{'has-error': validation.hasError('editedItem.gd.basin_name')}">
                  <div class="form-err-message">{{ validation.firstError('editedItem.gd.basin_name') }}</div>
                </div>
              </div>
            </div>

            <div class="form-group col-xs-12 col-sm-6 col-md-3">
              <div class="row">
                <label class="col-xs-12" for="constructionCode">Cod lucrare</label>
                <div class="col-xs-12">
                  <input type="text" name="constructionCode" id="constructionCode" v-model="editedItem.gd.construction_code" class="form-control">
                  <div class="form-err-message">{{ validation.firstError('editedItem.gd.construction_code') }}</div>
                </div>
              </div>
            </div>


            <div class="form-group col-xs-12 col-sm-12 col-md-6">
              <div class="row">
                <label class="col-xs-12" for="constructionCode">Cod cadastral</label>

                <div class="col-xs-2">
                  <select v-model="editedItem.gd._cadastral_code_items_arr[0]" class="form-control">
                    <option v-for="cod in cadastralLevel_0_Options" :value="cod._id">{{cod.name}}</option>
                  </select>

                </div>

                <template v-for="n in 5">
                  <div class="col-xs-2">
                    <input type="text" v-model="editedItem.gd._cadastral_code_items_arr[n]" class="form-control">
                  </div>
                </template>

                <div class="col-xs-12">
                <div class="form-err-message">{{ validation.firstError('editedItem.gd._cadastral_code_items_arr') }}</div>
              </div>
              </div>
            </div>

          </div>

        </fieldset>



        <fieldset>
          <legend>Date generale</legend>


          <div class="row">


            <div class="form-group col-xs-12 col-sm-6 col-md-3">
              <div class="row">
                <label class="col-xs-12" >Latitudine N</label>

                  <div class="col-xs-4">
                    <input type="text" v-model="editedItem.gd.geolocation.lat.deg" placeholder="deg" class="form-control">
                    <div class="form-err-message">{{ validation.firstError('editedItem.gd.geolocation.lat.deg') }}</div>
                  </div>
                  <div class="col-xs-4">
                    <input type="text" v-model="editedItem.gd.geolocation.lat.min" placeholder="min" class="form-control">
                    <div class="form-err-message">{{ validation.firstError('editedItem.gd.geolocation.lat.min') }}</div>
                  </div>
                  <div class="col-xs-4">
                    <input type="text"  v-model="editedItem.gd.geolocation.lat.sec" placeholder="sec" class="form-control">
                    <div class="form-err-message">{{ validation.firstError('editedItem.gd.geolocation.lat.sec') }}</div>
                  </div>


              </div>
            </div>


            <div class="form-group col-xs-12 col-sm-6 col-md-3">
              <div class="row">
                <label class="col-xs-12" for="longitude">Longitudine E</label>

                <div class="col-xs-4">
                  <input type="text" v-model="editedItem.gd.geolocation.long.deg" placeholder="deg" class="form-control">
                  <div class="form-err-message">{{ validation.firstError('editedItem.gd.geolocation.long.deg') }}</div>
                </div>

                <div class="col-xs-4">
                  <input type="text" v-model="editedItem.gd.geolocation.long.min" placeholder="min" class="form-control">
                  <div class="form-err-message">{{ validation.firstError('editedItem.gd.geolocation.long.min') }}</div>
                </div>

                <div class="col-xs-4">
                  <input type="text" v-model="editedItem.gd.geolocation.long.sec" placeholder="sec" class="form-control">
                  <div class="form-err-message">{{ validation.firstError('editedItem.gd.geolocation.long.sec') }}</div>
                </div>

              </div>
            </div>


            <div class="form-group col-xs-6 col-sm-6 col-md-3">
              <div class="row">
                <label class="col-xs-12" for="constructionYear">An construcție</label>
                <div class="col-xs-12">
                  <input type="text" name="constructionYear" id="constructionYear" v-model="editedItem.gd.construction_year" class="form-control">
                  <div class="form-err-message">{{ validation.firstError('editedItem.gd.construction_year') }}</div>
                </div>
              </div>
            </div>


            <div class="form-group col-xs-12 col-sm-6 col-md-3">
              <div class="row">
                <label class="col-xs-12" for="inventoryYears">Ani inventariere</label>
                <div class="col-xs-12">
                  <input type="text" name="inventoryYears" id="inventoryYears" v-model.lazy="inventoryYears" class="form-control">
                  <div class="form-err-message"></div>
                </div>
              </div>
            </div>


            <div class="form-group col-xs-12 col-sm-6 col-md-3">
              <div class="row">
                <label class="col-xs-12" for="reparationYears">Ani reparație</label>
                <div class="col-xs-12">
                  <input type="text" name="reparationYears" id="reparationYears" v-model.lazy="reparationYears" class="form-control">
                    <div class="form-err-message"></div>
                </div>
              </div>
            </div>


            <div class="form-group col-xs-12 col-sm-6 col-md-3">
              <div class="row">
                <label class="col-xs-12" for="county">Județ</label>
                <div class="col-xs-12">
                  <select v-model="editedItem.gd.adminlocation.county_id"  class="form-control">
                    <option v-for="el in countiesListOptions(countiesList)" :value="el._id">{{el.name}}</option>
                  </select>
                  <div class="form-err-message">{{ validation.firstError('editedItem.gd.adminlocation.county_id') }}</div>
                </div>
              </div>
            </div>


            <div class="form-group col-xs-12 col-sm-6 col-md-3">
              <div class="row">
                <label class="col-xs-12" for="city">Localitate</label>
                <div class="col-xs-12">
                  <input type="text" name="city" id="city" v-model="editedItem.gd.adminlocation.city" class="form-control">
                  <div class="form-err-message">{{ validation.firstError('editedItem.gd.adminlocation.city') }}</div>

                </div>
              </div>
            </div>


            <div class="form-group col-xs-12 col-sm-6 col-md-3">
              <div class="row">
                <label class="col-xs-12" for="owner">Proprietar</label>
                <div class="col-xs-12">
                  <input type="text" name="owner" id="owner" v-model="editedItem.gd.owner" class="form-control">
                  <div class="form-err-message"></div>

                </div>
              </div>
            </div>


            <div class="form-group col-xs-12 col-sm-6 col-md-3">
              <div class="row">
                <label class="col-xs-12" for="protectedArea">Arie protejată</label>
                <div class="col-xs-3 col-md-2">
                  <input type="checkbox" name="protectedArea" id="protectedArea" v-model="editedItem.gd.protected_area">
                </div>
                <div class="col-xs-9 col-md-10" :class="{invisible:!editedItem.gd.protected_area}">
                  <input  placeholder="Denumire arie protejată" type="text" name="protected_area_name" id="protectedAreaName" v-model="editedItem.gd.protected_area_name" class="form-control">
                  <div class="form-err-message">{{ validation.firstError('editedItem.gd.protected_area_name') }}</div>
                </div>
              </div>
            </div>


          </div>
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

import { mapGetters } from 'vuex'

import { EditState } from './../../../models/EditState'

import generalMixin from './../../../mixins/general'
import constructionMixin from './../../../mixins/construction'
import formMixin from './../../../mixins/form'

import SimpleVueValidation from 'simple-vue-validator'
const Validator = SimpleVueValidation.Validator
const validatorMixin = SimpleVueValidation.mixin


export default{
  mixins: [ generalMixin, constructionMixin, validatorMixin, formMixin ],
  props: ['editState', 'construction'],

  data() {
    return {
      editedItem: this.jsonCopy(this.construction)
    }
  },

  methods: {
    onSubmit(){

      this.$validate().then(success => {

        if(success){

          let arr = []

          // should be always true
          if(this.editedItem.gd._cadastral_code_items_arr[0]){
            this.editedItem.gd._cadastral_code_items_arr.forEach( (e, index) => {

              if(e && isNaN(e) && index > 0){
                arr[index] = e.toLowerCase(e)
              }else{
                arr[index] = e
              }
            })

            this.editedItem.gd._cadastral_code_items_arr = arr
          }


          let data = { construction: this.editedItem }

          this.$emit('submit', JSON.stringify(data));
        }else{
          this.showInvalidFormMessage()
        }
      })

    },

    onCancel(){
      this.editedItem = this.jsonCopy(this.construction)
      this.parseCadastralCodeToArr()
      if(this.isLongitudinal){
        this.sectors_nr = 1
      }

    },

  },

  computed: {

    ...mapGetters(['countiesList', 'cadastralListLevel_0']),

    isNew(){
      return this.editState == EditState.NEW
    },

    isEdit(){
      return this.editState == EditState.EDIT
    },

    inventoryYears: {
      get(){
        return this.editedItem.gd.inventory_years.join(', ')
      },

      set(val){
        this.editedItem.gd.inventory_years = this.getYearsArrayFromString(val)
      }
    },


    reparationYears: {
      get(){
        return this.editedItem.gd.reparation_years.join(', ')
      },

      set(val){
        this.editedItem.gd.reparation_years = this.getYearsArrayFromString(val)
      }
    },

    // cadastral codes arr

    cadastralLevel_0_Options: function(){
      return [{ name: "Selecteaza" , _id: '' }, ...this.cadastralListLevel_0 ]
    },


    // for longitudinals constructions

    // sectors number can be changed only when adding a new construction, when construction should be chained with inventory
    sectors_nr: {
      get: function(){
        return this.editedItem.cd.sectors.length
      },

      set: function(val){
        let nrSect = this.editedItem.cd.sectors.length

        if(parseInt(val) != val || val < 1){
          val = 1
        }


        if(val < nrSect){
          this.editedItem.cd.sectors.splice(val)
        }else if(val > nrSect){
          let newSectors = []

          for(let i = nrSect; i < val; i++){
            newSectors.push(this.getNewSector(i+1))
          }

          this.editedItem.cd.sectors = this.editedItem.cd.sectors.concat(newSectors);
        }
      }
    },

    isValid: function(){
      return this.editedItem.gd.basin_name.trim().length;
    },

    // for transversals constructions
    has_apron: {
      get(){
        return this.editedItem.cd.has_apron
      },

      set(val){
        this.editedItem.cd.has_apron = val

        if(!val){
          this.editedItem.cd.has_final_spur = false
          this.editedItem.cd.has_confuseur = false
        }
      }
    },

    // for longitudinals constructions



    // changable only when adding a new logitudinal construction
    longitudinal_has_final_spur: {
      get: function(){
        return this.editedItem.cd.has_final_spur
      },

      set: function(val){
        this.editedItem.cd.has_final_spur = val

        if(val){
          this.editedItem.cd.final_spur = this.getNewSectorsFinalSpur()
        }else{
          this.editedItem.cd.final_spur = null
        }
      }
    },

    transversalSubtitle(){
      let subtitle = "Lucrare "
      subtitle += this.construction.cd.has_apron ? " cu" : " fără"
      subtitle += ' radier'
      if(this.construction.cd.has_apron){
        subtitle += this.construction.cd.has_final_spur ? ", cu" : " fără"
        subtitle += ' pinten terminal'
        subtitle += this.construction.cd.has_confuseur ? ", cu" : " fără"
        subtitle += ' confuzor'
      }
      subtitle += '.'

      return subtitle
    },

    longitudinalSubtitle(){
      let subtitle = "Canal de evacuare cu  "+ this.construction.cd.sectors.length
      subtitle += this.construction.cd.sectors.length == 1 ? " sector, " : " sectoare, "
      subtitle += this.construction.cd.has_final_spur ? "cu" : "fără"
      subtitle += " pinten terminal."

      return subtitle
    },

  },

  validators: {
    'editedItem.gd.basin_name': function(value) {
      return this.validateRequired(value)
    },

    'editedItem.gd.construction_code': function(value) {
      return this.validateRequired(value)
    },

    'editedItem.gd._cadastral_code_items_arr': function(value) {

      return Validator.value(value[0]).required()
    },

    'editedItem.gd.geolocation.lat.deg': function(value) {
      return this.validateLatitudeCoordDeg(value)
    },

    'editedItem.gd.geolocation.lat.min': function(value) {
      return this.validateLatitudeCoordMin(value)
    },

    'editedItem.gd.geolocation.lat.sec': function(value) {
      return this.validateLatitudeCoordSec(value)
    },

    'editedItem.gd.geolocation.long.deg': function(value) {
      return this.validateLatitudeCoordDeg(value)
    },

    'editedItem.gd.geolocation.long.min': function(value) {
      return this.validateLatitudeCoordMin(value)
    },

    'editedItem.gd.geolocation.long.sec': function(value) {
      return this.validateLatitudeCoordSec(value)
    },

    'editedItem.gd.adminlocation.county_id': function(value) {
      return this.validateRequired(value)
    },

    'editedItem.gd.adminlocation.city': function(value) {
      return this.validateRequired(value)
    },

    'editedItem.gd.construction_year': function(value) {
      return this.validateRequired(value)
    },



    'editedItem.gd.protected_area_name, editedItem.gd.protected_area': function(areaName, isProtected) {
      if(!isProtected){
        return;
      }
      if(this.validation.isTouched('editedItem.gd.protected_area')){
        return Validator.value(areaName).required()
      }

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
