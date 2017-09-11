<template>
  <nav class="navbar navbar-default">
    <div class="container-fluid">
      <!-- Brand and toggle get grouped for better mobile display -->
      <div class="navbar-header">
        <button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1" aria-expanded="false">
          <span class="sr-only">Toggle navigation</span>
          <span class="icon-bar"></span>
          <span class="icon-bar"></span>
          <span class="icon-bar"></span>
        </button>
        <router-link :to="{name: 'home'}"><span class="navbar-brand">ABHT</span></router-link>
      </div>

      <!-- Collect the nav links, forms, and other content for toggling -->
      <div class="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
        <ul class="nav navbar-nav">



        </ul>

        <ul class="nav navbar-nav navbar-right">

          <li v-if="isAuthenticated" ><a>Salut {{ user.first_name }} {{ user.last_name }}</a></li>

          <li  class="dropdown"  v-toggle-menu v-if="isAuthenticated">
            <a class="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">Adaugă lucrare <span class="caret"></span></a>
            <ul class="dropdown-menu">
              <router-link :to="{name: 'new-transversal-construction'}" tag="li" active-class="active"><a>Transversală</a></router-link>
              <router-link :to="{name: 'new-longitudinal-construction'}" tag="li" active-class="active"><a>Longitudinală</a></router-link>
            </ul>
          </li>




          <li class="dropdown" v-toggle-menu v-if="isAuthenticated">
            <a class="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">Contul meu<span class="caret"></span></a>
            <ul class="dropdown-menu">

              <li><a href="#">My account</a></li>
              <li><a href="#">Something else here</a></li>
              <template v-if="user.role == 'admin'">
                <li role="separator" class="divider"></li>
                <router-link :to="{ name: 'users-list'}" tag="li" active-class="active"><a>Listă utilizatori</a></router-link>
                <li role="separator" class="divider"></li>
                <router-link :to="{ name: 'add-user'}" tag="li" active-class="active"><a>Adaugă utilizator</a></router-link>
              </template>



            </ul>
          </li>

         <li v-if="isAuthenticated"><a href="#"  @click.prevent="onLogout">Logout</a></li>

         <router-link v-if="!isAuthenticated" :to="{ name: 'user-login'}" tag="li" active-class="active"><a>Login</a></router-link>
        </ul>
      </div><!-- /.navbar-collapse -->
    </div><!-- /.container-fluid -->
  </nav>
</template>

<script>

import { mapGetters, mapActions } from 'vuex'

export default {
  data(){
    return {

    }
  },

  methods:{
    ...mapActions(['setUser']),

    toggleSideMenu(){
      this.$emit('toggle')
    },

    onLogout(){
      this.setUser(null)
      this.$router.push({name: 'constructions-select'})
    }

  },

  computed: {
    ...mapGetters(['isAuthenticated', 'user'])
  },

  directives: {
    toggleMenu: {
      bind(el, binding, vnode){
        el.addEventListener("click", function(){
          el.classList.toggle('open')
        })

        el.addEventListener("mouseleave", function(){
          el.classList.remove('open')
        })

      }
    }
  }

}
</script>


<style>
.navbar-brand{
  display: inline-block;
  font-weight: bold;
}
</style>
