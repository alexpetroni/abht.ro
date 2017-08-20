<template>
  <div id="app">
    <app-main-menu @toggle="toggleSideMenu"></app-main-menu>
    <div id="wrapper" :class="{'toggle-2': !sidebarShowLarge}">
      <!-- Sidebar -->
      <app-sidebar-menu></app-sidebar-menu>
      <!-- Page Content -->
      <div id="page-content-wrapper">
        <div class="container-fluid xyz">
          <router-view></router-view>
        </div>
      </div>
    </div>

    <app-footer></app-footer>
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

</style>
