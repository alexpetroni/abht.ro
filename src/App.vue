<template>
  <div id="app">
    <app-main-menu></app-main-menu>
    <div class="container">
      <router-view></router-view>
    </div>
    <app-footer></app-footer>
  </div>
</template>

<script>

import AppMainMenu from './components/page/MainMenu.vue'
import AppFooter from './components/page/Footer.vue'

import { mapActions } from 'vuex'

export default {
  name: 'app',
  data () {
    return {

    }
  },

  methods: {
     ...mapActions(['initializeData'])
  },

  components: {
    AppMainMenu,
    AppFooter
  },

  created(){
    this.initializeData()
  }
}
</script>

<style>

</style>
