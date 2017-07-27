<template>
  <div class="row">
      <div class="col-xs-12"><h4>Avarii pinten nr. {{ spur.spur_nr }}</h4></div>



<!-- Fisuri orizontale -->
<div class="col-xs-6 col-sm-4 col-md-2">
  <div class="row">

    <div class="col-xs-12 text-center"><strong>Fisuri orizontale</strong></div>

    <div class="form-group col-xs-6">
      <div class="row">
        <label class="col-xs-12 compact" :for="'spur_horiz_craks_nr_' + spur.spur_nr">nr</label>
        <div class="col-xs-12">
          <input name="spur_horiz_craks_nr" :id="'spur_horiz_craks_nr_' + spur.spur_nr" v-model="spur.spur_horiz_craks_nr" class="form-control" type="text">
        </div>
      </div>

    </div>

    <div class="form-group col-xs-6">
      <div class="row">
        <label class="col-xs-12 compact" :for="'spur_horiz_craks_lenght_' + spur.spur_nr">lungime(m)</label>
        <div class="col-xs-12">
          <input name="spur_horiz_craks_lenght" :id="'spur_horiz_craks_lenght_' + spur.spur_nr" v-model="spur.spur_horiz_craks_lenght" class="form-control" type="text">
        </div>
      </div>
    </div>
  </div>
</div>



<!-- Fisuri verticale -->
<div class="col-xs-6 col-sm-4 col-md-2">
  <div class="row">

    <div class="col-xs-12 text-center"><strong>Fisuri verticale</strong></div>

    <div class="form-group col-xs-6">
      <div class="row">
        <label class="col-xs-12 compact" :for="'spur_vert_craks_nr_' + spur.spur_nr">nr</label>
        <div class="col-xs-12">
          <input name="spur_vert_craks_nr" :id="'spur_vert_craks_nr_' + spur.spur_nr" v-model="spur.spur_vert_craks_nr" class="form-control" type="text">
        </div>
      </div>

    </div>

    <div class="form-group col-xs-6">
      <div class="row">
        <label class="col-xs-12 compact" :for="'spur_vert_craks_lenght_' + spur.spur_nr">lungime(m)</label>
        <div class="col-xs-12">
          <input name="spur_vert_craks_lenght" :id="'spur_vert_craks_lenght_' + spur.spur_nr" v-model="spur.spur_vert_craks_lenght" class="form-control" type="text">
        </div>
      </div>
    </div>
  </div>
</div>



<!-- Desprinderi -->
<div class="col-xs-9 col-sm-6 col-md-3">
  <div class="row">

    <div class="col-xs-12 text-center"><strong>Desprinderi</strong> (%)</div>

    <div class="form-group col-xs-4">
      <div class="row">
        <label class="col-xs-12 compact" :for="'spur_displaced_left_' + spur.spur_nr">stanga</label>
        <div class="col-xs-12">
          <input name="spur_displaced_left" :id="'spur_displaced_left_' + spur.spur_nr" v-model="spur.spur_displaced_left" class="form-control" type="text">
        </div>
      </div>

    </div>

    <div class="form-group col-xs-4">
      <div class="row">
        <label class="col-xs-12 compact" :for="'spur_displaced_right_' + spur.spur_nr">dreapta</label>
        <div class="col-xs-12">
          <input name="spur_displaced_right" :id="'spur_displaced_right_' + spur.spur_nr" v-model="spur.spur_displaced_right" class="form-control" type="text">
        </div>
      </div>
    </div>

    <div class="form-group col-xs-4">
      <div class="row">
        <label class="col-xs-12 compact" :for="'spur_displaced_center_' + spur.spur_nr">centru</label>
        <div class="col-xs-12">
          <input name="spur_displaced_center" :id="'spur_displaced_center_' + spur.spur_nr" v-model="spur.spur_displaced_center" class="form-control" type="text">
        </div>
      </div>
    </div>

  </div>
</div>



<!-- Eroziuni -->
<div class="col-xs-6 col-sm-4 col-md-2">
  <div class="row">

    <div class="col-xs-12 text-center"><strong>Eroziuni</strong></div>

    <div class="form-group col-xs-6">
      <div class="row">
        <label class="col-xs-12 compact" :for="'spur_abrasion_percent' + spur.spur_nr">nr</label>
        <div class="col-xs-12">
          <input name="spur_abrasion_percent" :id="'spur_abrasion_percent' + spur.spur_nr" v-model="spur.spur_abrasion_percent" class="form-control" type="text">
        </div>
      </div>

    </div>

    <div class="form-group col-xs-6">
      <div class="row">
        <label class="col-xs-12 compact" :for="'spur_abrasion_deep' + spur.spur_nr">lungime(m)</label>
        <div class="col-xs-12">
          <input name="spur_abrasion_deep" :id="'spur_abrasion_deep' + spur.spur_nr" v-model="spur.spur_abrasion_deep" class="form-control" type="text">
        </div>
      </div>
    </div>
  </div>
</div>

</div>
</template>

<script>

export default{
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

  },


}
</script>

<style>
</style>
