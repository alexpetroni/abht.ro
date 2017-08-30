<template>
  <div id="app">
    <app-main-menu @toggle="toggleSideMenu"></app-main-menu>
    <div class="row">

        <!-- Sidebar -->
        <div class="col-sm-2">
          <app-sidebar-menu></app-sidebar-menu>
        </div>
        <!-- Page Content -->
        <div class="col-sm-10">
            <router-view></router-view>
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

.form-err-message{
  color: red;
  font-size: .8em;
  height: 1em;
}

</style>
