<template>

  <fieldset>
    <legend>Pinten terminal</legend>
    <div class="row">


      <!-- Material de constructie -->
      <div class="form-group col-xs-6 col-sm-4 col-md-2">
        <div class="row">

          <label class="col-xs-12 compact" for="final_spur_mat_construction">Material de constructie</label>
          <div class="col-xs-12">
            <select id="final_spur_mat_construction" v-model="finalSpur.mat_final_spur"  class="form-control">
              <option v-for="mat in constructionMaterialsListOptions('mat_final_spur')" :value="mat.slug">{{ mat.name }}</option>
            </select>
          </div>

        </div>
      </div>

      <!-- Inaltime zid conducere -->
      <div class="col-xs-6 col-sm-4 col-md-2">
        <div class="row">

          <label class="col-xs-12 compact" for="final_spur_sidewall_height">Inaltime zid cond. Hz(m)</label>
          <div class="col-xs-12">
            <input type="text" id="final_spur_sidewall_height" v-model="finalSpur.sidewall_height" class="form-control">
          </div>

        </div>
      </div>


      <!-- Lungime pinten -->
      <div class="col-xs-6 col-sm-4 col-md-2">
        <div class="row">

          <label class="col-xs-12 compact" for="final_spur_length">Lungime pinten Bp(m)</label>
          <div class="col-xs-12">
            <input type="text" name="final_spur_length" id="final_spur_length" v-model="finalSpur.spur_length" class="form-control">
          </div>

        </div>
      </div>

    </div>
  </fieldset>

</template>

<script>

import generalMixin from './../../../mixins/general'
import constructionMixin from './../../../mixins/construction'

export default{
  mixins: [ generalMixin, constructionMixin ],
  props: ['finalSpur'],

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
