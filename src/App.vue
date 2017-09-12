<template>
  <div class="container-fluid">


<div  class="row">
    <app-main-menu @toggle="toggleSideMenu"></app-main-menu>
</div>



  <div>
    <div  class="row">
          <!-- Sidebar -->
          <div id="sidebar-container" class="col-sm-2">
            <app-sidebar-menu></app-sidebar-menu>
          </div>
          <!-- Page Content -->
          <div class="col-sm-10">
              <router-view></router-view>
          </div>
   </div>

  <div  class="row">
      <app-footer></app-footer>
 </div>
 </div>



    </div>
</template>

<script>

import AppMainMenu from './components/page/MainMenu.vue'
import AppSidebarMenu from './components/page/SidebarMenu.vue'
import AppFooter from './components/page/Footer.vue'

import { mapActions } from 'vuex'

export default {
  name: 'app',
  data () {
    return {
      sidebarShowLarge: true
    }
  },

  methods: {
     ...mapActions(['initializeData']),

     toggleSideMenu(){
       this.sidebarShowLarge =  !this.sidebarShowLarge
     }
  },

  components: {
    AppMainMenu,
    AppSidebarMenu,
    AppFooter
  },

  created(){
    this.initializeData()
  }
}
</script>

<style>
.first-row{
  font-weight: bold;
}

.form-err-message{
  color: red;
  font-size: .8em;
  height: 1em;
}

.disabledLabel{
  color: #888888;
}

#sidebar-container{
  background: #222d32;
  margin-top: -20px;
  padding-top: 20px;
  height: 100%;
  min-height: 700px;
}

#sidebar-wrapper{

}

/* Sidebar Styles */

.sidebar-nav {
   width: 100%;
   margin: 0;
   padding: 0;
   list-style: none;
   margin-top: 2px;
}

.sidebar-nav li {
   text-indent: 15px;
   line-height: 40px;
}

.sidebar-nav li a {
   display: block;
   text-decoration: none;
   color: #999999;
}

.sidebar-nav li a:hover {
   text-decoration: none;
   color: #fff;
   background: rgba(255,255,255,0.2);
   border-left: red 2px solid;
}

.sidebar-nav li a:active,
.sidebar-nav li a:focus {
   text-decoration: none;
}

.sidebar-nav > .sidebar-brand {
   height: 65px;
   font-size: 18px;
   line-height: 60px;
}

.sidebar-nav > .sidebar-brand a {
   color: #999999;
}

.sidebar-nav > .sidebar-brand a:hover {
   color: #fff;
   background: none;
}
.no-margin{
   margin:0;
}

.metadata{
  color: #888;
}

#footer-container{
  margin-top: 4em;
  background-color: #e7e7e7;
}


</style>
