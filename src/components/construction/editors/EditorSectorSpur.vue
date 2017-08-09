<template>
  <div class="row">
    <div class="col-xs-12"><h4>Pinten nr. {{ spur.spur_nr }}</h4></div>



    <!-- Material de constructie -->
    <div class="form-group col-xs-6 col-sm-4 col-md-2">
      <div class="row">

        <label class="col-xs-12 compact" :for="'mat_sect_spur_'+spur.spur_nr">Material de construcție</label>
        <div class="col-xs-12">
          <select v-model="spur.mat_sect_spur" class="form-control" :id="'mat_sect_spur_'+spur.spur_nr">
          <option disabled value="">Selectează</option>
          <option v-for="(mat, index) in constructionMaterialsList('mat_sect_spur')" :value="mat.slug" :key=" spur.spur_nr + '_' + index ">{{ mat.name }}</option>
        </select>
        </div>

      </div>
    </div>


    <!-- Inaltime zid conducere -->
    <div class="form-group col-xs-6 col-sm-4 col-md-2">
      <div class="row">

        <label class="col-xs-12 compact" :for="'spur_sidewall_height_'+spur.spur_nr">Înălțime zid cond. Hz(m)</label>
        <div class="col-xs-12">
          <input type="text" v-model="spur.spur_sidewall_height" class="form-control">
        </div>

      </div>
    </div>


    <!-- Inaltime treapata -->
    <div class="form-group col-xs-6 col-sm-4 col-md-2">
      <div class="row">

        <label class="col-xs-12 compact" :for="'spur_stair_height_'+spur.spur_nr">Înălțime treaptă H(m)</label>
        <div class="col-xs-12">
          <input type="text" name="spur_stair_height" :id="'spur_stair_height_'+spur.spur_nr" v-model="spur.spur_stair_height" class="form-control">
        </div>

      </div>
    </div>

    <!-- Lungime pinten -->
    <div class="form-group col-xs-6 col-sm-4 col-md-2">
      <div class="row">

        <label class="col-xs-12 compact" :for="'spur_length_'+spur.spur_nr">Lungime pinten Bp(m)</label>
        <div class="col-xs-12">
          <input type="text" name="spur_length" :id="'spur_length_'+spur.spur_nr" v-model="spur.spur_length" class="form-control">
        </div>

      </div>
    </div>

  </div>
</template>

<script>

import generalMixin  from './../../../mixins/general'
import constructionMixin  from './../../../mixins/construction'

export default{
  mixins: [ generalMixin, constructionMixin ],
  props: ['spur'],

  data() {
    return {
    }
  },

  methods: {

  },

  computed: {

  },

  components: {

  },

  watch: {

  }


}
</script>

<style>
</style>
