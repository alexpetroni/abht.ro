<template>
  <div>
    <h4>Harta</h4>

    <gmap-map
   :center="centerMap"
   :zoom="7"
   style="width: 100%; height: 350px;"
 >
 <gmap-marker
  :key="index"
  v-for="(m, index) in [constructionMarker]"
  :position="m.position"
  :clickable="true"
  :draggable="true"
  @click="centerMap=m.position"
></gmap-marker>
</gmap-map>
  </div>
</template>

<script>

// import * as VueGoogleMaps from 'vue2-google-maps'

export default{
  props: [ 'construction', 'inventory'],

  data() {
    return {

    }
  },

  methods: {

  },

  computed: {
    centerMap: function(){
      if(this.constructionMarker.position){
        return this.constructionMarker.position
      }
      return {lat: 45.75, lng: 24.40}
    },

    constructionMarker: function(){
      let g = this.construction.gd.geolocation;
      if(g && g.lat && g.long){
        let pos = { position: {lat: g.lat, lng: g.long} }
        return pos
      }

      return {}
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
