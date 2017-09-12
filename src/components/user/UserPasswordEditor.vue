<template>
  <div class="row">

    <div class="col-sm-12">
      <form id="updateUserPassword" @submit.prevent="onSubmit" novalidate>

        <fieldset>
          <legend>Modificare parolă utilizator</legend>
          <div class="form-group col-xs-12">
            <div class="row">
              <label class="col-xs-12" >Parolă</label>
              <div class="col-xs-12">
                <input type="password" v-model="pswdRepeat" class="form-control">
                <div class="form-err-message">{{ validation.firstError('pswdRepeat') }} </div>
              </div>
            </div>
          </div>


          <div class="form-group col-xs-12">
            <div class="row">
              <label class="col-xs-12" >Repetă parola</label>
              <div class="col-xs-12">
                <input type="password" v-model="password" class="form-control">
                <div class="form-err-message">{{ validation.firstError('password') }}</div>
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
      editedItem: this.jsonCopy(this.user),
      password: '',
      pswdRepeat: '',
    }
  },

  methods: {
    onSubmit(){
      this.$validate()
          .then(success => {
            if (success) {

        let id = this.user._id
        let req = { url:'users/' + id, data: { password: this.password }}
        axios._put(req)
        .then( res => {
          console.log('res.data', res.data)
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
    'pswdRepeat': function(value) {
      return Validator.value(value).required().minLength(6)
    },

    'password': function(value) {
      return Validator.value(value).required().minLength(6)
    },



    'pswdRepeat, password': function (repeat, password) {
      if (this.submitted || this.validation.isTouched('pswdRepeat')) {
        return Validator.value(repeat).required().match(password);
      }
    }
  },

  watch: {

  },


}
</script>

<style>
</style>
