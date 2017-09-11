<template>
  <div class="row">

    <div class="col-sm-12">
      <form id="updateUser" @submit.prevent="onSubmit" novalidate>

        <fieldset>
          <legend>Modificare date utilizator</legend>

          <div class="form-group col-xs-12">
            <div class="row">
              <label class="col-xs-12" >Nume</label>
              <div class="col-xs-12">
                <input type="text" v-model="editedItem.last_name" class="form-control">
                <div class="form-err-message">{{ validation.firstError('editedItem.last_name') }}</div>
              </div>
            </div>
          </div>


          <div class="form-group col-xs-12">
            <div class="row">
              <label class="col-xs-12" >Prenume</label>
              <div class="col-xs-12">
                <input type="text" v-model="editedItem.first_name" class="form-control">
                <div class="form-err-message">{{ validation.firstError('editedItem.first_name') }}</div>
              </div>
            </div>
          </div>


          <div class="col-sm-12 text-center">
            <button type="submit" class="btn btn-primary" >Submit</button>
            <button type="button" class="btn btn-warning" @click="onCancel">Cancel</button>
          </div>

        </fieldset>
      </form>
    </div>
  </div>
</template>

<script>

import * as axios from './../../api'

import SimpleVueValidation from 'simple-vue-validator'
const Validator = SimpleVueValidation.Validator
const validatorMixin = SimpleVueValidation.mixin

import generalMixin from './../../mixins/general'
import userMixin from './../../mixins/user'

export default{
  mixins: [generalMixin, userMixin, validatorMixin],
  props: ['user'],

  data() {
    return {
      editedItem: this.jsonCopy(this.user)
    }
  },

  methods: {
    onSubmit(){
      this.$validate()
          .then(success => {
            if (success) {

        let id = this.user._id
        let req = { url:'users/' + id, data: { first_name: this.editedItem.first_name, last_name: this.editedItem.last_name }}
        axios._put(req)
        .then( res => {
          this.$emit('updated', res.data)
        })
        .catch( error => console.log(error) )
      }
    })
    },

    onCancel(){
      this.$emit('cancel')
    }
  },

  computed: {

  },

  components: {

  },

  validators: {
    'editedItem.last_name': function(value) {
      console.log('last_name', value)
      return Validator.value(value).required().minLength(2)
    },

    'editedItem.first_name': function(value) {
      return Validator.value(value).required().minLength(2)
    },
  },

  watch: {

  },


}
</script>

<style>
</style>
