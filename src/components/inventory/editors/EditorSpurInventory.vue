<template>
  <tr>
  <td>{{ spur.spur_nr }}</td>
  <td><div class="form-group" :class="{'has-error': validation.hasError('spur.spur_horiz_craks_nr')}"><input name="spur_horiz_craks_nr" v-model="spur.spur_horiz_craks_nr" class="form-control" type="text"></div></td>
  <td><div class="form-group" :class="{'has-error': validation.hasError('spur.spur_horiz_craks_lenght')}"><input name="spur_horiz_craks_nr" v-model="spur.spur_horiz_craks_lenght" class="form-control" type="text"></div></td>
  <td><div class="form-group" :class="{'has-error': validation.hasError('spur.spur_vert_craks_nr')}"><input name="spur_horiz_craks_nr" v-model="spur.spur_vert_craks_nr" class="form-control" type="text"></div></td>
  <td><div class="form-group" :class="{'has-error': validation.hasError('spur.spur_vert_craks_lenght')}"><input name="spur_horiz_craks_nr" v-model="spur.spur_vert_craks_lenght" class="form-control" type="text"></div></td>
  <td><div class="form-group" :class="{'has-error': validation.hasError('spur.spur_displaced_left')}"><input name="spur_horiz_craks_nr" v-model="spur.spur_displaced_left" class="form-control" type="text"></div></td>
  <td><div class="form-group" :class="{'has-error': validation.hasError('spur.spur_displaced_right')}"><input name="spur_horiz_craks_nr" v-model="spur.spur_displaced_right" class="form-control" type="text"></div></td>
  <td><div class="form-group" :class="{'has-error': validation.hasError('spur.spur_displaced_center')}"><input name="spur_horiz_craks_nr" v-model="spur.spur_displaced_center" class="form-control" type="text"></div></td>
  <td><div class="form-group" :class="{'has-error': validation.hasError('spur.spur_abrasion_percent')}"><input name="spur_horiz_craks_nr" v-model="spur.spur_abrasion_percent" class="form-control" type="text"></div></td>
  <td><div class="form-group" :class="{'has-error': validation.hasError('spur.spur_abrasion_deep')}"><input name="spur_horiz_craks_nr" v-model="spur.spur_abrasion_deep" class="form-control" type="text"></div></td>
</tr>
</template>

<script>

import formMixin from './../../../mixins/form'

import SimpleVueValidation from 'simple-vue-validator'
const Validator = SimpleVueValidation.Validator
const validatorMixin = SimpleVueValidation.mixin

export default{
  props: ['spur'],
  mixins: [ validatorMixin, formMixin  ],

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
    'spur.spur_horiz_craks_nr': function(value) {
      return this.validatePositiveNumber(value)
    },

    'spur.spur_horiz_craks_lenght': function(value) {
      return this.validatePositiveNumber(value)
    },

    'spur.spur_vert_craks_nr': function(value) {
      return this.validatePositiveNumber(value)
    },

    'spur.spur_vert_craks_lenght': function(value) {
      return this.validatePositiveNumber(value)
    },

    'spur.spur_displaced_left': function(value) {
      return this.validatePositiveNumber(value)
    },

    'spur.spur_displaced_right': function(value) {
      return this.validatePositiveNumber(value)
    },

    'spur.spur_displaced_center': function(value) {
      return this.validatePositiveNumber(value)
    },

    'spur.spur_abrasion_percent': function(value) {
      return this.validatePercent(value)
    },

    'spur.spur_abrasion_deep': function(value) {
      return this.validatePositiveNumber(value)
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
