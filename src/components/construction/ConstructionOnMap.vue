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
    convertDMSToDD: function(degrees, minutes, seconds, direction) {
    var dd = degrees + minutes/60 + seconds/(60*60);

    if (direction == "S" || direction == "W") {
        dd = dd * -1;
    } // Don't do anything for N or E
    return dd;
  }
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
      if(g && g.lat && g.lat.deg && g.long && g.long.deg ){

        let lat = this.convertDMSToDD(g.lat.deg, g.lat.min, g.lat.sec)
        let long = this.convertDMSToDD(g.long.deg, g.long.min, g.long.sec)

        let pos = { position: {lat: lat, lng: long} }
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
