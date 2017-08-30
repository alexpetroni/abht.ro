<template>
  <div class="row">
    <div class="col-xs-12"><h4>Pinten nr. {{ spur.spur_nr }}</h4></div>



    <!-- Material de constructie -->
    <div class="form-group col-xs-6 col-sm-4 col-md-2">
      <div class="row">

        <label class="col-xs-12 compact">Material de construcție</label>
        <div class="col-xs-12">
          <select v-model="spur.mat_sect_spur" class="form-control">
          <option v-for="mat in constructionMaterialsListOptions('mat_sect_spur')" :value="mat.slug">{{ mat.name }}</option>
        </select>
        <div class="form-err-message">{{ validation.firstError('spur.mat_sect_spur') }}</div>

        </div>

      </div>
    </div>


    <!-- Inaltime zid conducere -->
    <div class="form-group col-xs-6 col-sm-4 col-md-2">
      <div class="row">

        <label class="col-xs-12 compact" :for="'spur_sidewall_height_'+spur.spur_nr">Înălțime zid cond. Hz(m)</label>
        <div class="col-xs-12">
          <input type="text" v-model="spur.spur_sidewall_height" class="form-control">
          <div class="form-err-message">{{ validation.firstError('spur.spur_sidewall_height') }}</div>
        </div>

      </div>
    </div>


    <!-- Inaltime treapata -->
    <div class="form-group col-xs-6 col-sm-4 col-md-2">
      <div class="row">

        <label class="col-xs-12 compact" :for="'spur_stair_height_'+spur.spur_nr">Înălțime treaptă H(m)</label>
        <div class="col-xs-12">
          <input type="text" name="spur_stair_height" :id="'spur_stair_height_'+spur.spur_nr" v-model="spur.spur_stair_height" class="form-control">
          <div class="form-err-message">{{ validation.firstError('spur.spur_stair_height') }}</div>
        </div>

      </div>
    </div>

    <!-- Lungime pinten -->
    <div class="form-group col-xs-6 col-sm-4 col-md-2">
      <div class="row">

        <label class="col-xs-12 compact" :for="'spur_length_'+spur.spur_nr">Lungime pinten Bp(m)</label>
        <div class="col-xs-12">
          <input type="text" name="spur_length" :id="'spur_length_'+spur.spur_nr" v-model="spur.spur_length" class="form-control">
          <div class="form-err-message">{{ validation.firstError('spur.spur_length') }}</div>

        </div>

      </div>
    </div>

  </div>
</template>

<script>

import generalMixin  from './../../../mixins/general'
import constructionMixin  from './../../../mixins/construction'
import formMixin from './../../../mixins/form'

import SimpleVueValidation from 'simple-vue-validator'
const Validator = SimpleVueValidation.Validator
const validatorMixin = SimpleVueValidation.mixin

export default{
  mixins: [ generalMixin, constructionMixin, validatorMixin, formMixin ],
  props: ['spur'],

  data() {
    return {
    }
  },

  methods: {
    validate(){
      this.$validate().then(success => {
          this.$emit('validate', success);
      })
    }
  },

  computed: {

  },

  validators: {
    'spur.mat_sect_spur': function(value) {
      return this.validateRequired(value)
    },
    'spur.spur_sidewall_height': function(value) {
      return this.validatePositiveNumberGtZero(value)
    },
    'spur.spur_stair_height': function(value) {
      return this.validatePositiveNumber(value)
    },
    'spur.spur_length': function(value) {
      return this.validatePositiveNumberGtZero(value)
    },
  },

  components: {

  },

  watch: {

  }


}
</script>

<style>
</style>
