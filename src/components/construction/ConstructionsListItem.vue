<template>
  <tr>
    <td><router-link :to="{ name:'construction', params:{id:construction._id}}" >{{ name }}</router-link></td>
    <td>{{ construction.gd.basin_name }}</td>
    <td>{{ construction.type }}</td>    
    <td>{{ year }}</td>
    <td>{{ ys }}</td>
</tr>
</template>

<script>

export default{
  props: ['construction'],

  data() {
    return {

    }
  },

  methods: {

  },

  computed: {
    name: function(){
      let name = '';
      if(this.construction.gd.cadastral_code && this.construction.gd.cadastral_code.breadcrumb){
        name += this.construction.gd.cadastral_code.breadcrumb
      }
      name += '#'
      if(this.construction.gd.construction_code){
        name += this.construction.gd.construction_code
      }

      return name
    },

    ys: function(){
      let ys = ''
      if(this.construction.current_inventory && this.construction.current_inventory.ys){
        ys = this.construction.current_inventory.ys
      }

      return ys
    },


    year: function(){
      let year = ''
      if(this.construction.current_inventory && this.construction.current_inventory.year){
        year = this.construction.current_inventory.year
      }

      return year
    },
  },

  components: {

  },

  watch: {

  },


}
</script>

<style>
</style>
