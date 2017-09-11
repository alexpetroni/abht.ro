<template>
  <div class="row">
    <div class="col-sm-12 col-md-4"></div>
    <div class="col-sm-12 col-md-4">
      <form id="createUser" @submit.prevent="onSubmit" novalidate>

        <fieldset>
          <legend>Creare utilizator</legend>
          <div class="form-group col-xs-12">
            <div class="row">
              <label class="col-xs-12" >Email</label>
              <div class="col-xs-12">
                <input type="text" v-model="editedItem.email" class="form-control">
                <div class="form-err-message">{{ validation.firstError('editedItem.email') }}</div>
              </div>
            </div>
          </div>

          <div class="form-group col-xs-12">
            <div class="row">
              <label class="col-xs-12" >Parolă</label>
              <div class="col-xs-12">
                <input type="password" v-model="editedItem.password" class="form-control">
                <div class="form-err-message">{{ validation.firstError('editedItem.password') }}</div>
              </div>
            </div>
          </div>


          <div class="form-group col-xs-12">
            <div class="row">
              <label class="col-xs-12" >Repetă parola</label>
              <div class="col-xs-12">
                <input type="password" v-model="pswdRepeat" class="form-control">
                <div class="form-err-message">{{ validation.firstError('pswdRepeat') }} </div>
              </div>
            </div>
          </div>


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
    <div class="col-sm-12 col-md-4"></div>
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
  props: [],

  data() {
    return {
      editedItem: this.getNewUser(),

      pswdRepeat: ''
    }
  },

  methods: {
    onSubmit(){
      console.log( 'this.editedItem', this.editedItem)
      this.$validate()
          .then(success => {
            if (success) {

              let req = { url:'users', data: this.editedItem }
              console.log(req)
              axios._post(req)
              .then( res => {
                console.log(res)
                if(res.data.error){
                  alert('res.data.error' + res.data.error)
                }else{
                  this.$router.push({name: 'userdata', query: {id: res.data._id}})
                }
              })
              .catch( error => console.log(error) )

          }
            })
    },

    onCancel(){
      this.editedItem = this.getNewUser()
      this.pswdRepeat = ''
    }
  },

  computed: {

  },

  components: {

  },

  validators: {
    'editedItem.email': function(value) {
      return Validator.value(value).required().email()
    },

    'editedItem.password': function(value) {
      return Validator.value(value).required().minLength(6)
    },

    'editedItem.last_name': function(value) {
      return Validator.value(value).required().minLength(2)
    },

    'editedItem.first_name': function(value) {
      return Validator.value(value).required().minLength(2)
    },

    'pswdRepeat': function(value) {
      return Validator.value(value).required().minLength(6)
    },

    'pswdRepeat, editedItem.password': function (repeat, password) {
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
