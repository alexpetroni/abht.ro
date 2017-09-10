<template>
    <div class="col-sm-12">
      <fieldset>
        <legend>Avarii pinten terminal</legend>


        <table class="table table-bordered abht-table text-center">
          <thead>
            <tr class="first-row">
              <td colspan="2"><strong>Decastrare</strong></td>
              <td colspan="2"><strong>Afuieri</strong></td>
              <td colspan="2"><strong>Fisuri orizontale</strong></td>
              <td colspan="2"><strong>Fisuri verticale</strong></td>
              <td colspan="3"><strong>Desprinderi %</strong></td>
              <td colspan="2"><strong>Eroziuni</strong></td>
            </tr>

            <tr>

              <td>stanga</td>
              <td>dreapta</td>
              <td>H(m)</td>
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
              <td><div class="form-group" :class="{'has-error': validation.hasError('finalSpurInventory.final_spur_decastr_left')}"><input v-model="finalSpurInventory.final_spur_decastr_left" class="form-control" type="text"></div></td>
              <td><div class="form-group" :class="{'has-error': validation.hasError('finalSpurInventory.final_spur_decastr_right')}"><input v-model="finalSpurInventory.final_spur_decastr_right" class="form-control" type="text"></div></td>
              <td><div class="form-group" :class="{'has-error': validation.hasError('finalSpurInventory.final_spur_afuieri_height')}"><input v-model="finalSpurInventory.final_spur_afuieri_height" class="form-control" type="text"></div></td>
              <td><div class="form-group" :class="{'has-error': validation.hasError('finalSpurInventory.final_spur_afuieri_percent')}"><input v-model="finalSpurInventory.final_spur_afuieri_percent" class="form-control" type="text"></div></td>
              <td><div class="form-group" :class="{'has-error': validation.hasError('finalSpurInventory.final_spur_horiz_craks_nr')}"><input v-model="finalSpurInventory.final_spur_horiz_craks_nr" class="form-control" type="text"></div></td>
              <td><div class="form-group" :class="{'has-error': validation.hasError('finalSpurInventory.final_spur_horiz_craks_lenght')}"><input v-model="finalSpurInventory.final_spur_horiz_craks_lenght" class="form-control" type="text"></div></td>
              <td><div class="form-group" :class="{'has-error': validation.hasError('finalSpurInventory.final_spur_vert_craks_nr')}"><input v-model="finalSpurInventory.final_spur_vert_craks_nr" class="form-control" type="text"></div></td>
              <td><div class="form-group" :class="{'has-error': validation.hasError('finalSpurInventory.final_spur_vert_craks_lenght')}"><input v-model="finalSpurInventory.final_spur_vert_craks_lenght" class="form-control" type="text"></div></td>
              <td><div class="form-group" :class="{'has-error': validation.hasError('finalSpurInventory.final_spur_displaced_left')}"><input v-model="finalSpurInventory.final_spur_displaced_left" class="form-control" type="text"></div></td>
              <td><div class="form-group" :class="{'has-error': validation.hasError('finalSpurInventory.final_spur_displaced_right')}"><input v-model="finalSpurInventory.final_spur_displaced_right" class="form-control" type="text"></div></td>
              <td><div class="form-group" :class="{'has-error': validation.hasError('finalSpurInventory.final_spur_displaced_center')}"><input v-model="finalSpurInventory.final_spur_displaced_center" class="form-control" type="text"></div></td>
              <td><div class="form-group" :class="{'has-error': validation.hasError('finalSpurInventory.final_spur_abrasion_percent')}"><input v-model="finalSpurInventory.final_spur_abrasion_percent" class="form-control" type="text"></div></td>
              <td><div class="form-group" :class="{'has-error': validation.hasError('finalSpurInventory.final_spur_abrasion_deep')}"><input v-model="finalSpurInventory.final_spur_abrasion_deep" class="form-control" type="text"></div></td>
            </tr>
          </tbody>
        </table>
      </fieldset>
    </div>
</template>

<script>
import formMixin from './../../../mixins/form'

import SimpleVueValidation from 'simple-vue-validator'
const Validator = SimpleVueValidation.Validator
const validatorMixin = SimpleVueValidation.mixin

export default{
  props: ["finalSpurInventory"],
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
    'finalSpurInventory.final_spur_decastr_left': function(value) {
      return this.validatePositiveNumber(value)
    },

    'finalSpurInventory.final_spur_decastr_right': function(value) {
      return this.validatePositiveNumber(value)
    },

    'finalSpurInventory.final_spur_afuieri_height': function(value) {
      return this.validatePositiveNumber(value)
    },

    'finalSpurInventory.final_spur_afuieri_percent': function(value) {
      return this.validatePositiveNumber(value)
    },

    'finalSpurInventory.final_spur_horiz_craks_nr': function(value) {
      return this.validatePositiveNumber(value)
    },

    'finalSpurInventory.final_spur_horiz_craks_lenght': function(value) {
      return this.validatePositiveNumber(value)
    },

    'finalSpurInventory.final_spur_vert_craks_nr': function(value) {
      return this.validatePositiveNumber(value)
    },

    'finalSpurInventory.final_spur_vert_craks_lenght': function(value) {
      return this.validatePositiveNumber(value)
    },

    'finalSpurInventory.final_spur_displaced_left': function(value) {
      return this.validatePositiveNumber(value)
    },

    'finalSpurInventory.final_spur_displaced_right': function(value) {
      return this.validatePositiveNumber(value)
    },

    'finalSpurInventory.final_spur_displaced_center': function(value) {
      return this.validatePositiveNumber(value)
    },

    'finalSpurInventory.final_spur_abrasion_percent': function(value) {
      return this.validatePositiveNumber(value)
    },

    'finalSpurInventory.final_spur_abrasion_deep': function(value) {
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
