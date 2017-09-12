<template>
  <div>
    <div id="viewState" v-if="state == 'view'">

      <h3>Date utilizator</h3>
      <div class="row" v-if="user">





        <div class="col-sm-12 col-md-4"></div>
        <div class="col-sm-12 col-md-4">
            <h4>Nume: {{ user.last_name }} </h4>
            <h4>Prenume: {{ user.first_name }}</h4>
        </div>
        <div class="col-sm-12 col-md-4"></div>


        <div class="col-sm-12 text-center">
          <br />
          <br />
          <button class="btn btn-primary" @click="changePassword">Schimba parola</button> <button class="btn btn-primary" @click="editUserData">Editeaza date</button>
        </div>
      </div>

    </div>

    <user-account-editor
    :user="user"
    v-if="state == 'editUserData'"
    @updated="onUserDataChanged"
    @cancel = "onCancel"
    ></user-account-editor>

    <user-password-editor
    :user="user"
    v-if="state == 'changePassword'"
    @updated="onUserPasswordChanged"
    @cancel = "onCancel"
    ></user-password-editor>




  </div>
</template>

<script>
import generalMixin from './../../mixins/general'

import * as axios from './../../api'

import { mapGetters, mapActions } from 'vuex'



import UserAccountEditor from './UserAccountEditor.vue'
import UserPasswordEditor from './UserPasswordEditor.vue'

export default{

  mixins: [ generalMixin ],

  data() {


    return {
      user: null,
      state: 'view' // three available states: view, changePassword, editUserData
    }
  },

  methods: {
    ...mapActions(['setUser']),

    loadUser(id){
      let req = { url:'users/' + id}
      axios._get(req)
      .then( res => {
        this.user = res.data
      })
      .catch( error => console.log(error) )
    },

    changePassword: function(){
      this.state = 'changePassword'
    },

    editUserData: function(){
      this.state = 'editUserData'
    },

    onUserDataChanged: function(data){
      this.user = data
      this.state = 'view'
      // if it is the the user who edit his own account, update
      if(this.user._id == this.editUser._id){
        this.setUser(this.user)
      }
    },


    onUserPasswordChanged: function(data){
      this.user = data
      this.state = 'view'
    },


    onCancel: function(){
      this.state = 'view'
    }
  },

  computed: {
    ...mapGetters({ editUser: 'user' })
  },

  components: {
    UserAccountEditor,
    UserPasswordEditor
  },

  watch: {

  },

  created(){
    if(this.$route.query.id){
      this.loadUser(this.$route.query.id)
    }else{
      this.user = this.jsonCopy(this.editUser)
    }
  }

}
</script>

<style>
</style>
