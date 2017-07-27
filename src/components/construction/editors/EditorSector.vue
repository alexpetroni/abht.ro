<template>
  <div class="row">


    <div class="col-sm-12">
      <h3> Sector {{ editedItem.sector_nr }} </h3>

      <form @submit.prevent="onSubmit">


        <fieldset>
          <legend>Date dimensionale</legend>

          <div class="row">



            <!-- Numar trepte -->
            <div class="form-group col-xs-6 col-sm-4 col-md-2">
              <div class="row">

                <label class="col-xs-12 compact" for="nr_of_stairs">Numar trepte</label>
                <div class="col-xs-12">
                  <input type="text" name="nr_of_stairs" id="nr_of_stairs" v-model="editedItem.nr_of_stairs" class="form-control" :disabled="!isNew">
                </div>

              </div>
            </div>


            <!-- Numar pinteni -->
            <div class="form-group col-xs-6 col-sm-4 col-md-2">
              <div class="row">

                <label class="col-xs-12 compact" for="nr_of_spurs">Numar pinteni</label>
                <div class="col-xs-12">
                  <input type="text" name="nr_of_spurs" id="nr_of_spurs" v-model="nr_of_spurs" class="form-control" :disabled="!isNew">
                </div>

              </div>
            </div>


            <!-- Lungime -->
            <div class="form-group col-xs-6 col-sm-4 col-md-2">
              <div class="row">

                <label class="col-xs-12 compact" for="sector_length">Lungime</label>
                <div class="col-xs-12">
                  <input type="text" name="sector_length" id="sector_length" v-model="editedItem.sector_length" class="form-control">
                </div>

              </div>
            </div>


            <!-- Adancime -->
            <div class="form-group col-xs-6 col-sm-4 col-md-2">
              <div class="row">

                <label class="col-xs-12 compact" for="sector_deep">Adancime</label>
                <div class="col-xs-12">
                  <input type="text" name="sector_deep" id="sector_deep" v-model="editedItem.sector_deep" class="form-control">
                </div>

              </div>
            </div>


            <!-- Latime radier -->
            <div class="form-group  col-xs-6 col-sm-4 col-md-2">
              <div class="row">

                <label class="col-xs-12 compact" for="apron_width">Latime radier</label>
                <div class="col-xs-12">
                  <input type="text" name="apron_width" id="apron_width" v-model="editedItem.apron_width" class="form-control">
                </div>

              </div>
            </div>


            <!-- Fruct zid garda -->
            <div class="form-group col-xs-6 col-sm-4 col-md-2">
              <div class="row">

                <label class="col-xs-12 compact" for="fruit_guard_wall">Fruct zid garda</label>
                <div class="col-xs-12">
                  <input type="text" name="fruit_guard_wall" id="fruit_guard_wall" v-model="editedItem.fruit_guard_wall" class="form-control">
                </div>

              </div>
            </div>

          </div><!-- row -->

        </fieldset>

        <fieldset>
          <legend>Materiale de constructie</legend>

          <div class="row">

            <!-- Radier -->
            <div class="form-group col-xs-6 col-sm-4 col-md-2">
              <div class="row">

                <label class="col-xs-12 compact" for="mat_sect_apron">Radier</label>
                <div class="col-xs-12">
                  <select name="mat_sect_apron" id="mat_sect_apron" v-model="editedItem.mat_sect_apron" class="form-control">
                  <option disabled value="">Selectează</option>
                  <option v-for="mat in constructionMaterialsList('mat_sect_apron')" :value="mat.slug">{{ mat.name }}</option>
                </select>
                </div>

              </div>
            </div>


            <!-- Ziduri garda -->
            <div class="form-group col-xs-6 col-sm-4 col-md-2">
              <div class="row">

                <label class="col-xs-12 compact" for="mat_sect_walls">Ziduri garda</label>
                <div class="col-xs-12">
                  <select name="mat_sect_walls" id="mat_sect_walls" v-model="editedItem.mat_sect_walls" class="form-control">
                  <option disabled value="">Selectează</option>
                  <option v-for="mat in constructionMaterialsList('mat_sect_walls')" :value="mat.slug">{{ mat.name }}</option>
                </select>
                </div>

              </div>
            </div>

          </div>
        </fieldset>



        <fieldset v-if="editedItem.spurs.length > 0">
          <legend>Pinteni si trepte</legend>
          <editor-sector-spur v-for="item in editedItem.spurs" :spur="item" :key="editedItem.sector_nr+'_'+item.spur_nr"></editor-sector-spur>
        </fieldset>


        <editor-final-spur-long-constr
        v-if="showFinalSpur"
        :final-spur="editedFinalSpur" >
      </editor-final-spur-long-constr>

        <br />
        <br />

        <div class="col-sm-12 text-center">
          <button type="submit" class="btn btn-primary" :disabled="!isValid">Submit</button>
          <button type="button" class="btn btn-warning" @click="onCancel">Cancel</button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>

import generalMixin  from './../../../mixins/general'
import constructionMixin  from './../../../mixins/construction'

import { EditState } from './../../../models/EditState'

import EditorSectorSpur from './EditorSectorSpur.vue'
import EditorFinalSpurLongConstr from './EditorFinalSpurLongConstr.vue'

export default{
  mixins: [ generalMixin, constructionMixin ],
  props: ['sector', 'showFinalSpur', 'finalSpur', 'editState'],

  data() {
    return {
      editedItem: null,
      editedFinalSpur: null
    }
  },

  methods: {
    onSubmit(){
      let data = { sector: this.editedItem }
      if(this.showFinalSpur){
        data.finalSpur = this.editedFinalSpur
      }
      this.$emit('submit', JSON.stringify(data));
    },

    onCancel(){
      this.editedItem = this.jsonCopy(this.sector)
      this.editedFinalSpur = this.jsonCopy(this.finalSpur)
    }
  },

  computed: {
    isNew(){
      return this.editState == EditState.NEW
    },

    isEdit(){
      return this.editState == EditState.EDIT
    },

    isValid: function(){
      return true
      //return this.editedItem.nr_of_stairs.trim().length > 0
    },

    nr_of_spurs: {
      get: function(){
        return this.editedItem.spurs.length
      },

      set: function(val){
        let nrSpur = this.editedItem.spurs.length
        if(parseInt(val) != val || val < 0){
          val = 0
        }
        if(val < nrSpur){
          this.editedItem.spurs.splice(val)
        }else if(val > nrSpur){
          let newSpurs = [];
          for(let i = nrSpur; i < val; i++){
            newSpurs.push(this.getNewSectorSpur(i+1))
          }
          this.editedItem.spurs = this.editedItem.spurs.concat(newSpurs);
        }
      }
    }
  },

  components: {
    EditorSectorSpur,
    EditorFinalSpurLongConstr
  },

  watch: {
    'sector': function(val){
      this.editedItem = this.jsonCopy(this.sector)
    },

    'finalSpur': function(val){
      this.editedFinalSpur = this.jsonCopy(this.finalSpur)
    }

  },

  created(){
    this.editedItem = this.jsonCopy(this.sector)
    // copy from the beggining the final spur
    this.editedFinalSpur = this.jsonCopy(this.finalSpur)
  },


}
</script>

<style>
</style>
