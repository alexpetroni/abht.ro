<template>
  <div>
    <div class="row">
      <div class="col-sm-12">
          <h3>Listă utilizatori</h3>
          <table class="table" v-if="!emptyList">
          <thead>
            <tr>
              <th>Nume Prenume</th>
              <th>Email</th>
              <th>Sterge</th>
            </tr>
          </thead>
          <tbody>
            <template v-for="user in usersList">
              <tr>
              <router-link :to="{name: 'userdata', query:{id:user._id}}" tag="td" ><a>{{user.last_name}} {{user.first_name}}</a></router-link>
              <td>{{user.email}}</td>

              <td><a href="#" @click.prevent="deleteUser(user)">sterge</a></td>
            </tr>
            </template>
          </tbody>
        </table>
        <div v-if="emptyList">
          <h4>Nu exista useri</h4>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

import * as axios from './../../api'

import UsersListItem from './UsersListItem.vue'

export default{
  props: [],

  data() {
    return {
      usersList: null
    }
  },

  methods: {
    loadUsersList(){
      let req = { url:'users' }
      axios._get(req)
      .then( res => {
        this.usersList = res.data
      })
      .catch( error => console.log(error) )
    },


    deleteUser(user){
      if(confirm("Esti sigur ca vrei sa stergi userul "+ user.last_name + ' ' + user.first_name+"?")){
        let url = 'users/'+user._id
        console.log(url)
        let req = {url:url}

        axios._delete(req)
              .then( res => {
                console.log(res)
                this.loadUsersList()
              })
              .catch( error => console.log(error) )
      }
    }
  },

  computed: {
    emptyList: function(){
      return this.usersList && this.usersList.length == 0
    }
  },

  components: {
    UsersListItem
  },

  watch: {

  },

  created: function(){
    this.loadUsersList()
  }


}
</script>

<style>
</style>
