<template>
  <div class="row">

    <div class="col-sm-12">
      <form @submit.prevent="onSubmit">

        <fieldset>
          <legend>Elemente dimensionale lucrarea propriu-zisa</legend>

          <div class="row">

            <div class="form-group col-xs-12 col-sm-3 col-md-2">
              <div class="row">
                <label class="col-xs-12" for="transDimYe">Ye(m)</label>
                <div class="col-xs-12">
                  <input type="text" name="ye" id="ye" v-model="editedDam.ye" class="form-control">
                  <div class="form-err-message">{{ validation.firstError('editedDam.ye') }}</div>
                </div>
              </div>
            </div>


            <div class="form-group col-xs-12 col-sm-3 col-md-2">
              <div class="row">
                <label class="col-xs-12" for="h">H(m)</label>
                <div class="col-xs-12">
                  <input type="text" name="h" id="h" v-model="editedDam.h" class="form-control">
                  <div class="form-err-message">{{ validation.firstError('editedDam.h') }}</div>
                </div>
              </div>
            </div>

            <div class="form-group col-xs-12 col-sm-3 col-md-2">
              <div class="row">
                <label class="col-xs-12" for="a">a(m)</label>
                <div class="col-xs-12">
                  <input type="text" name="a" id="a" v-model="editedDam.a" class="form-control">
                  <div class="form-err-message">{{ validation.firstError('editedDam.a') }}</div>
                </div>
              </div>
            </div>


            <div class="form-group col-xs-12 col-sm-3 col-md-2">
              <div class="row">
                <label class="col-xs-12" for="b">B(m)</label>
                <div class="col-xs-12">
                  <input type="text" name="b" id="b" v-model="editedDam.b" class="form-control">
                  <div class="form-err-message">{{ validation.firstError('editedDam.b') }}</div>
                </div>
              </div>
            </div>



            <div class="form-group col-xs-12 col-sm-6 col-md-3">
              <div class="row">
                <label class="col-xs-12" for="transversal_type">Tip lucrare</label>
                <div class="col-xs-12">
                  <select name="transversal_type" id="transversal_type" v-model="editedDam.transversal_type" class="form-control">
                    <option disabled value="">Selectează</option>
                    <option v-for="mat in transConstructionTypes()" :value="mat.slug">{{ mat.name }}</option>
                  </select>
                  <div class="form-err-message">{{ validation.firstError('editedDam.transversal_type') }}</div>
                </div>
              </div>
            </div>

          </div>
        </fieldset>



        <fieldset :class="{'disabledLabel': !construction.cd.has_apron}">
          <legend :class="{'disabledLabel': !construction.cd.has_apron}">Elemente dimensionale radier</legend>

          <div class="row">
            <div class="form-group col-xs-12 col-sm-3 col-md-2">
              <div class="row">
                <label class="col-xs-12" for="lr">Lr(m)</label>
                <div class="col-xs-12">
                  <input type="text" name="lr" id="lr" v-model="editedDam.lr" :disabled="!construction.cd.has_apron" class="form-control">
                  <div class="form-err-message">{{ validation.firstError('editedDam.lr') }}</div>
                </div>
              </div>
            </div>



            <div class="form-group col-xs-12 col-sm-3 col-md-2">
              <div class="row">
                <label class="col-xs-12" for="br">Br(m)</label>
                <div class="col-xs-12">
                  <input type="text" name="br" id="br" v-model="editedDam.br" :disabled="!construction.cd.has_apron" class="form-control">
                  <div class="form-err-message">{{ validation.firstError('editedDam.br') }}</div>
                </div>
              </div>
            </div>



            <div class="form-group col-xs-12 col-sm-3 col-md-2">
              <div class="row">
                <label class="col-xs-12" for="disip_type">Tip disipator</label>
                <div class="col-xs-12">
                  <select name="disip_type" id="disip_type" v-model="editedDam.disip_type" :disabled="!construction.cd.has_apron" class="form-control">
                    <option disabled value="">Selectează</option>
                    <option v-for="o in transDisipTypes()" :value="o.slug">{{ o.name }}</option>
                  </select>
                  <div class="form-err-message">{{ validation.firstError('editedDam.disip_type') }}</div>
                </div>
              </div>
            </div>


            <div class="form-group col-xs-12 col-sm-3 col-md-2">
              <div class="row">
                <label class="col-xs-12" for="hz">Hz(m)</label>
                <div class="col-xs-12">
                  <input type="text" name="hz" id="hz" v-model="editedDam.hz" :disabled="!construction.cd.has_apron" class="form-control">
                  <div class="form-err-message">{{ validation.firstError('editedDam.hz') }}</div>
                </div>
              </div>
            </div>



            <div class="form-group col-xs-12 col-sm-3 col-md-2">
              <div class="row">
                <label class="col-xs-12" for="apron_teeth_no">Nr. total de dinti</label>
                <div class="col-xs-12">
                  <input type="text" name="apron_teeth_no" id="apron_teeth_no" v-model="editedDam.apron_teeth_no" :disabled="!construction.cd.has_apron" class="form-control">
                  <div class="form-err-message">{{ validation.firstError('editedDam.apron_teeth_no') }}</div>
                </div>
              </div>
            </div>

          </div>
        </fieldset>

        <fieldset :class="{'disabledLabel': !construction.cd.has_confuseur}">
          <legend :class="{'disabledLabel': !construction.cd.has_confuseur}">Elemente dimensionale confuzor</legend>

          <div class="row">
            <div class="form-group col-xs-12 col-sm-3 col-md-2">
              <div class="row">
                <label class="col-xs-12" for="lc">Lc(m)</label>
                <div class="col-xs-12">
                  <input type="text" name="lc" id="lc" v-model="editedDam.lc" :disabled="!construction.cd.has_confuseur" class="form-control">
                  <div class="form-err-message">{{ validation.firstError('editedDam.lc') }}</div>
                </div>
              </div>
            </div>


            <div class="form-group col-xs-12 col-sm-3 col-md-2">
              <div class="row">
                <label class="col-xs-12" for="bc">Bc(m)</label>
                <div class="col-xs-12">
                  <input type="text" name="bc" id="bc" v-model="editedDam.bc" :disabled="!construction.cd.has_confuseur" class="form-control">
                  <div class="form-err-message">{{ validation.firstError('editedDam.bc') }}</div>
                </div>
              </div>
            </div>

          </div>
        </fieldset>

        <fieldset :class="{'disabledLabel': !construction.cd.has_final_spur}">
          <legend :class="{'disabledLabel': !construction.cd.has_final_spur}">Elemente dimensionale pinten terminal</legend>

          <div class="row">
            <div class="form-group col-xs-12 col-sm-3 col-md-2">
              <div class="row">
                <label class="col-xs-12" for="bp">Bp(m)</label>
                <div class="col-xs-12">
                  <input type="text" name="bp" id="bp" v-model="editedFinalSpur.spur_length" :disabled="!construction.cd.has_final_spur" class="form-control">
                  <div class="form-err-message">{{ validation.firstError('editedFinalSpur.spur_length') }}</div>
                </div>
              </div>
            </div>

          </div>
        </fieldset>


        <fieldset>
          <legend>Materiale de constructie</legend>

          <div class="row">
            <div class="form-group col-xs-12 col-sm-6 col-md-3">
              <div class="row">
                <label class="col-xs-12" for="mat_main_body">Corp lucrare</label>
                <div class="col-xs-12">
                  <select name="mat_main_body" id="mat_main_body" v-model="editedDam.mat_main_body" class="form-control">
                    <option disabled value="">Selectează</option>
                    <option v-for="mat in constructionMaterialsList('mat_main_body')" :value="mat.slug">{{ mat.name }}</option>
                  </select>
                  <div class="form-err-message">{{ validation.firstError('editedDam.mat_main_body') }}</div>
                </div>
              </div>
            </div>


            <div class="form-group col-xs-12 col-sm-6 col-md-3">
              <div class="row">
                <label class="col-xs-12" for="mat_wings">Aripi lucrare</label>
                <div class="col-xs-12">
                  <select name="mat_wings" id="mat_wings" v-model="editedDam.mat_wings" class="form-control">
                    <option disabled value="">Selectează</option>
                    <option v-for="mat in constructionMaterialsList('mat_wings')" :value="mat.slug">{{ mat.name }}</option>
                  </select>
                  <div class="form-err-message">{{ validation.firstError('editedDam.mat_wings') }}</div>
                </div>
              </div>
            </div>


            <div class="form-group col-xs-12 col-sm-6 col-md-3">
              <div class="row">
                <label class="col-xs-12" for="mat_apron" :class="{'disabledLabel': !construction.cd.has_apron}">Radier</label>
                <div class="col-xs-12">
                  <select name="mat_apron" id="mat_apron"
                  v-model="editedDam.mat_apron"
                  :disabled="!construction.cd.has_apron"
                  class="form-control">
                  <option disabled value="">Selectează</option>
                  <option v-for="mat in constructionMaterialsList('mat_apron')" :value="mat.slug">{{ mat.name }}</option>
                </select>
                <div class="form-err-message">{{ validation.firstError('editedDam.mat_apron') }}</div>
                </div>
              </div>
            </div>



            <div class="form-group col-xs-12 col-sm-6 col-md-3">
              <div class="row">
                <label class="col-xs-12" for="mat_counter_dam">Contrabaraj</label>
                <div class="col-xs-12">
                  <select name="mat_counter_dam" id="mat_counter_dam" v-model="editedDam.mat_counter_dam" class="form-control">
                    <option disabled value="">Selectează</option>
                    <option v-for="mat in constructionMaterialsList('mat_counter_dam')" :value="mat.slug">{{ mat.name }}</option>
                  </select>
                  <div class="form-err-message">{{ validation.firstError('editedDam.mat_counter_dam') }}</div>
                </div>
              </div>
            </div>



            <div class="form-group col-xs-12 col-sm-6 col-md-3">
              <div class="row">
                <label class="col-xs-12" for="mat_side_walls">Ziduri de conducere</label>
                <div class="col-xs-12">
                  <select name="mat_side_walls" id="mat_side_walls" v-model="editedDam.mat_side_walls" class="form-control">
                    <option disabled value="">Selectează</option>
                    <option v-for="mat in constructionMaterialsList('mat_side_walls')" :value="mat.slug">{{ mat.name }}</option>
                  </select>
                  <div class="form-err-message">{{ validation.firstError('editedDam.mat_side_walls') }}</div>
                </div>
              </div>
            </div>


            <div class="form-group col-xs-12 col-sm-6 col-md-3">
              <div class="row">
                <label class="col-xs-12" for="mat_final_spur" :class="{'disabledLabel': !construction.cd.has_final_spur}">Pinten terminal</label>
                <div class="col-xs-12">
                  <select id="mat_final_spur" v-model="editedFinalSpur.mat_final_spur" :disabled="!construction.cd.has_final_spur" class="form-control">
                    <option disabled value="">Selectează</option>
                    <option v-for="mat in constructionMaterialsList('mat_final_spur')" :value="mat.slug">{{ mat.name }}</option>
                  </select>
                  <div class="form-err-message">{{ validation.firstError('editedFinalSpur.mat_final_spur') }}</div>
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
import formMixin from './../../../mixins/form'

import SimpleVueValidation from 'simple-vue-validator'
const Validator = SimpleVueValidation.Validator
const validatorMixin = SimpleVueValidation.mixin

export default{
  mixins: [ generalMixin, constructionMixin, validatorMixin, formMixin ],
  props: ['construction', 'editState'],

  data() {
    return {
      editedDam:  this.jsonCopy(this.construction.cd.dam),
      editedFinalSpur: this.jsonCopy(this.construction.cd.final_spur)
    }
  },

  methods: {
    onSubmit(){
      this.$validate().then(success => {
        if(true || success){
          let data = {
            dam: this.editedDam,
            final_spur: this.editedFinalSpur
          }
          this.$emit('submit', JSON.stringify(data));
        }else{
          this.showInvalidFormMessage()
        }
      })


    },

    onCancel(){
      this.editedDam = this.jsonCopy(this.construction.cd.dam)
      this.editedFinalSpur = this.jsonCopy(this.construction.cd.final_spur)
    }
  },

  computed: {
    isValid: function(){
      // return this.editedDam.ye.trim().length;
      return true
    }
  },

  components: {

  },

  validators: {
    'editedDam.ye': function(value) {
      return Validator.value(value).required().regex(/^[+]?\d+([.]\d+)?$/, 'Numar pozitiv.')
    },

    'editedDam.h': function(value) {
      return Validator.value(value).required().regex(/^[+]?\d+([.]\d+)?$/, 'Numar pozitiv.')
    },

    'editedDam.a': function(value) {
      return Validator.value(value).required().regex(/^[+]?\d+([.]\d+)?$/, 'Numar pozitiv.')
    },

    'editedDam.b': function(value) {
      return Validator.value(value).required().regex(/^[+]?\d+([.]\d+)?$/, 'Numar pozitiv.')
    },

    'editedDam.transversal_type': function(value) {
      return Validator.value(value).required()
    },



    'editedDam.lr': function(value) {
      if(!this.construction.cd.has_apron) return
      return Validator.value(value).required().regex(/^[+]?\d+([.]\d+)?$/, 'Numar pozitiv.')
    },

    'editedDam.br': function(value) {
      if(!this.construction.cd.has_apron) return
      return Validator.value(value).required().regex(/^[+]?\d+([.]\d+)?$/, 'Numar pozitiv.')
    },

    'editedDam.disip_type': function(value) {
      if(!this.construction.cd.has_apron) return
      return Validator.value(value).required()
    },

    'editedDam.hz': function(value) {
      if(!this.construction.cd.has_apron) return
      return Validator.value(value).required().regex(/^[+]?\d+([.]\d+)?$/, 'Numar pozitiv.')
    },

    'editedDam.apron_teeth_no': function(value) {
      if(!this.construction.cd.has_apron) return
      return Validator.value(value).required().integer().greaterThanOrEqualTo(0)
    },


    'editedDam.lc': function(value) {
      if(!this.construction.cd.has_confuseur) return
      return Validator.value(value).required().regex(/^[+]?\d+([.]\d+)?$/, 'Numar pozitiv.')
    },

    'editedDam.bc': function(value) {
      if(!this.construction.cd.has_confuseur) return
      return Validator.value(value).required().regex(/^[+]?\d+([.]\d+)?$/, 'Numar pozitiv.')
    },


    'editedFinalSpur.spur_length': function(value) {
      if(!this.construction.cd.has_final_spur) return
      return Validator.value(value).required().regex(/^[+]?\d+([.]\d+)?$/, 'Numar pozitiv.')
    },


    'editedDam.mat_main_body': function(value) {
      return Validator.value(value).required()
    },

    'editedDam.mat_wings': function(value) {
      return Validator.value(value).required()
    },

    'editedDam.mat_apron': function(value) {
      if(!this.construction.cd.has_apron) return
      return Validator.value(value).required()
    },

    'editedDam.mat_counter_dam': function(value) {
      return Validator.value(value).required()
    },

    'editedDam.mat_side_walls': function(value) {
      return Validator.value(value).required()
    },

    'editedFinalSpur.mat_final_spur': function(value) {
      if( !this.construction.cd.has_final_spur ) return
      return Validator.value(value).required()
    },

  },

}
</script>

<style>
</style>
