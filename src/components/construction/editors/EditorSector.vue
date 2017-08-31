<template>
  <div class="row">


    <div class="col-sm-12">
      <h3> Sector {{ editedItem.sector_nr }} </h3>

      <form @submit.prevent="onSubmit">


        <fieldset>
          <legend>Date dimensionale</legend>

          <div class="row">



            <!-- Numar trepte -->
            <div class="form-group col-xs-6 col-sm-4 col-md-2">
              <div class="row">

                <label class="col-xs-12 compact" for="nr_of_stairs">Număr trepte</label>
                <div class="col-xs-12">
                  <input type="text" name="nr_of_stairs" id="nr_of_stairs" v-model="editedItem.nr_of_stairs" class="form-control" :disabled="!isNew">
                  <div class="form-err-message">{{ validation.firstError('editedItem.nr_of_stairs') }}</div>
                </div>

              </div>
            </div>


            <!-- Numar pinteni -->
            <div class="form-group col-xs-6 col-sm-4 col-md-2">
              <div class="row">

                <label class="col-xs-12 compact" for="nr_of_spurs">Număr pinteni</label>
                <div class="col-xs-12">
                  <input type="text" name="nr_of_spurs" id="nr_of_spurs" v-model="nr_of_spurs" class="form-control" :disabled="!isNew">
                  <div class="form-err-message">{{ validation.firstError('nr_of_spurs') }}</div>
                </div>

              </div>
            </div>


            <!-- Lungime -->
            <div class="form-group col-xs-6 col-sm-4 col-md-2">
              <div class="row">

                <label class="col-xs-12 compact" for="sector_length">Lungime(m)</label>
                <div class="col-xs-12">
                  <input type="text" name="sector_length" id="sector_length" v-model="editedItem.sector_length" class="form-control">
                  <div class="form-err-message">{{ validation.firstError('editedItem.sector_length') }}</div>
                </div>

              </div>
            </div>


            <!-- Adancime -->
            <div class="form-group col-xs-6 col-sm-4 col-md-2">
              <div class="row">

                <label class="col-xs-12 compact" for="sector_deep">Adâncime(m)</label>
                <div class="col-xs-12">
                  <input type="text" name="sector_deep" id="sector_deep" v-model="editedItem.sector_deep" class="form-control">
                  <div class="form-err-message">{{ validation.firstError('editedItem.sector_deep') }}</div>
                </div>

              </div>
            </div>


            <!-- Latime radier -->
            <div class="form-group  col-xs-6 col-sm-4 col-md-2">
              <div class="row">

                <label class="col-xs-12 compact" for="apron_width">Lățime radier(m)</label>
                <div class="col-xs-12">
                  <input type="text" name="apron_width" id="apron_width" v-model="editedItem.apron_width" class="form-control">
                  <div class="form-err-message">{{ validation.firstError('editedItem.apron_width') }}</div>
                </div>

              </div>
            </div>


            <!-- Fruct zid garda -->
            <div class="form-group col-xs-6 col-sm-4 col-md-2">
              <div class="row">

                <label class="col-xs-12 compact" for="fruit_guard_wall">Fruct zid gardă(m)</label>
                <div class="col-xs-12">
                  <input type="text" name="fruit_guard_wall" id="fruit_guard_wall" v-model="editedItem.fruit_guard_wall" class="form-control">
                  <div class="form-err-message">{{ validation.firstError('editedItem.fruit_guard_wall') }}</div>
                </div>

              </div>
            </div>

          </div><!-- row -->

        </fieldset>

        <fieldset>
          <legend>Materiale de construcție</legend>

          <div class="row">

            <!-- Radier -->
            <div class="form-group col-xs-6 col-sm-4 col-md-2">
              <div class="row">

                <label class="col-xs-12 compact" for="mat_sect_apron">Radier</label>
                <div class="col-xs-12">
                  <select name="mat_sect_apron" id="mat_sect_apron" v-model="editedItem.mat_sect_apron" class="form-control">
                  <option value="">Selectează</option>
                  <option v-for="mat in constructionMaterialsList('mat_sect_apron')" :value="mat.slug">{{ mat.name }}</option>
                </select>
                <div class="form-err-message">{{ validation.firstError('editedItem.mat_sect_apron') }}</div>
                </div>

              </div>
            </div>


            <!-- Ziduri garda -->
            <div class="form-group col-xs-6 col-sm-4 col-md-2">
              <div class="row">

                <label class="col-xs-12 compact" for="mat_sect_walls">Ziduri gardă</label>
                <div class="col-xs-12">
                  <select name="mat_sect_walls" id="mat_sect_walls" v-model="editedItem.mat_sect_walls" class="form-control">
                  <option value="">Selectează</option>
                  <option v-for="mat in constructionMaterialsList('mat_sect_walls')" :value="mat.slug">{{ mat.name }}</option>
                </select>
                <div class="form-err-message">{{ validation.firstError('editedItem.mat_sect_walls') }}</div>
                </div>

              </div>
            </div>

          </div>
        </fieldset>



        <fieldset v-if="editedItem.spurs.length > 0">
          <legend>Pinteni și trepte</legend>
          <editor-sector-spur
          v-for="(item, index) in editedItem.spurs"
          :spur="item"
          :key="editedItem.sector_nr+'_'+item.spur_nr"
          ref="editSect"
          @validate = countValidation
          ></editor-sector-spur>
        </fieldset>


        <editor-final-spur-long-constr
        v-if="showFinalSpur"
        :final-spur="editedFinalSpur"
        @validate = countValidation
        ref="finalSpur"
        >
      </editor-final-spur-long-constr>

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
  </div>
</template>

<script>

import generalMixin  from './../../../mixins/general'
import constructionMixin  from './../../../mixins/construction'
import formMixin from './../../../mixins/form'

import { EditState } from './../../../models/EditState'

import EditorSectorSpur from './EditorSectorSpur.vue'
import EditorFinalSpurLongConstr from './EditorFinalSpurLongConstr.vue'

import SimpleVueValidation from 'simple-vue-validator'
const Validator = SimpleVueValidation.Validator
const validatorMixin = SimpleVueValidation.mixin

export default{
  mixins: [ generalMixin, constructionMixin, validatorMixin, formMixin  ],
  props: ['sector', 'showFinalSpur', 'finalSpur', 'editState'],

  data() {
    return {
      editedItem: this.getNewSector(),
      editedFinalSpur: this.getNewSectorsFinalSpur(),

      nrChildrenToValidate: 0
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

      this.validateSectorSpurComponents()

      this.validateFinalSpurComponent()
    },

    validateSectorSpurComponents(){
      if(this.editedItem.spurs.length){
        this.$refs.editSect.forEach((comp, index)=>{
          comp.validate()
        })
      }
    },

    validateFinalSpurComponent(){
      if(this.showFinalSpur){
        this.$refs.finalSpur.validate()
      }
    },

    submitSectorData(){
      let data = { sector: this.editedItem }
      if(this.showFinalSpur){
        data.finalSpur = this.editedFinalSpur
      }
      this.$emit('submit', JSON.stringify(data));
    },



    countValidation(success){

      this.validForm = this.validForm && success
      this.nrChildrenToValidate -=1

      if(this.nrChildrenToValidate == 0){
        if(this.validForm){
          this.submitSectorData()
        }else{
          this.showInvalidFormMessage()
        }
      }
    },

    onCancel(){
      this.editedItem = this.jsonCopy(this.sector)
      this.editedFinalSpur = this.jsonCopy(this.finalSpur)
    }
  },

  computed: {
    isNew(){
      return this.editState == EditState.NEW
    },

    isEdit(){
      return this.editState == EditState.EDIT
    },

    nr_of_spurs: {
      get: function(){
        return this.editedItem.spurs.length
      },

      set: function(val){
        let nrSpur = this.editedItem.spurs.length
        if(parseInt(val) != val || val < 0){
          val = 0
        }
        if(val < nrSpur){
          this.editedItem.spurs.splice(val)
        }else if(val > nrSpur){
          let newSpurs = [];
          for(let i = nrSpur; i < val; i++){
            newSpurs.push(this.getNewSectorSpur(i+1))
          }
          this.editedItem.spurs = this.editedItem.spurs.concat(newSpurs);
        }
      }
    }
  },

  components: {
    EditorSectorSpur,
    EditorFinalSpurLongConstr
  },

  validators: {
    'editedItem.nr_of_stairs': function(value) {
      return this.validatePositiveNumber(value)
    },

    'nr_of_spurs': function(value) {
      return this.validatePositiveNumber(value)
    },

    'editedItem.sector_length': function(value) {
      return this.validatePositiveNumberGtZero(value)
    },

    'editedItem.sector_deep': function(value) {
      return this.validatePositiveNumberGtZero(value)
    },

    'editedItem.apron_width': function(value) {
      return this.validatePositiveNumberGtZero(value)
    },

    'editedItem.fruit_guard_wall': function(value) {
      return this.validatePositiveNumberGtZero(value)
    },

    'editedItem.mat_sect_apron': function(value) {
      return this.validateRequired(value)
    },

    'editedItem.mat_sect_walls': function(value) {
      return this.validateRequired(value)
    },
  },

  watch: {
    'sector': function(val){
      this.editedItem = this.jsonCopy(this.sector)
      this.validation.reset()
    },

    'finalSpur': function(val){
      this.editedFinalSpur = this.jsonCopy(this.finalSpur)
    }

  },

  created(){
    this.editedItem = this.jsonCopy(this.sector)
    // copy from the beggining the final spur
    this.editedFinalSpur = this.jsonCopy(this.finalSpur)
  },


}
</script>

<style>
</style>
