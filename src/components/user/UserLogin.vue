<template>
  <div>
    <form id="auth" @submit.prevent="onSubmit" novalidate>
      <fieldset>
        <legend>Autentificare</legend>
        <div class="row">
          <div class="col-xs-12 col-md-4">
          </div>
          <div class="col-xs-12 col-md-4">
        <div class="form-group col-xs-12 ">
          <div class="row">
            <label class="col-xs-12" for="constructionCode">Email</label>
            <div class="col-xs-12">
              <input type="text" v-model="email" class="form-control">
              <div class="form-err-message">{{ validation.firstError('email') }}</div>
            </div>
          </div>
        </div>


        <div class="form-group col-xs-12 ">
          <div class="row">
            <label class="col-xs-12" for="constructionCode">Parola</label>
            <div class="col-xs-12">
              <input type="password" v-model="password" class="form-control">
              <div class="form-err-message">{{ validation.firstError('password') }}</div>
            </div>
          </div>
        </div>


        <div class="col-sm-12 text-center">
          <button type="submit" class="btn btn-primary" >Submit</button>
        </div>

      </div>
      <div class="col-xs-12 col-md-4">
      </div>
    </div>

      </fieldset>
    </form>
  </div>
</template>

<script>
import * as axios from './../../api'

import SimpleVueValidation from 'simple-vue-validator'
const Validator = SimpleVueValidation.Validator
const validatorMixin = SimpleVueValidation.mixin

import { mapActions } from 'vuex'

export default{
  mixins: [validatorMixin],
  props: [],


  data() {
    return {
      email: '',
      password: ''
    }
  },

  methods: {
    ...mapActions(['setUser']),
    onSubmit(){
        let data = { email: this.email, password: this.password }

      this.$validate()
          .then(success => {
            if (success) {
              let req = { url: 'login' , data: data }

              axios._post(req)
              .then( res => {
                console.log(res)
                if(res.data.error){
                  alert(res.data.error)
                  this.password = ''
                }else{
                  this.setUser(res.data.user)
                  this.$router.push({name: 'constructions-select'})
                }
              })
              .catch( error => console.log(error) )
            }
          })
    }
  },

  computed: {

  },

  validators: {
    'email': function(value) {
      return Validator.value(value).required()
      return Validator.value(value).required().email()
    },

    'password': function(value) {
      return Validator.value(value).required()
    }
  },

  components: {

  },

  watch: {

  },


}
</script>

<style>
</style>
