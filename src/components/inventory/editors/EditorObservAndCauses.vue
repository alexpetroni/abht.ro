<template>
  <div class="row">
    <div class="col-sm-12">
      <form @submit.prevent="onSubmit">

        <fieldset>
          <legend>Cauze ale apariţiei degradărilor</legend>
            <!-- Causes  -->
              <table  class="table table-bordered abht-table text-center">
                <thead>

                  <tr class="first-row">
                    <td colspan="2"  class="vert-center">Specificaţii</td>
                    <td  class="vert-center">Uzură</td>
                    <td  class="vert-center">Viituri</td>
                    <td  class="vert-center">Intreţineri</td>
                    <td  class="vert-center">Materiale</td>
                    <td  class="vert-center">Tehnologie</td>
                    <td  class="vert-center">Nesusţinere<br>aval</td>
                    <td class="vert-center">Panta de<br>aterisare</td>
                    <td class="vert-center">Dimensiuni<br>elemente<br>constructive</td>
                    <td class="vert-center">Altele</td>
                  </tr>
                </thead>
                <tbody>

                  <template v-if="isTransversal">
                  <tr>
                    <td rowspan="5" class="vert-center">Lucrare<br>propriu-<br>zisă</td>
                    <td>Decastrări</td>
                    <td><input type="checkbox" value="use" v-model="causes.mainBody.decastr"></td>
                    <td><input type="checkbox" value="flood" v-model="causes.mainBody.decastr"></td>
                    <td><input type="checkbox" value="maintenance" v-model="causes.mainBody.decastr"></td>
                    <td><input type="checkbox" value="materials" v-model="causes.mainBody.decastr"></td>
                    <td><input type="checkbox" value="tehnology" v-model="causes.mainBody.decastr"></td>
                    <td><input type="checkbox" value="downstream-support" v-model="causes.mainBody.decastr"></td>
                    <td><input type="checkbox" value="slope" v-model="causes.mainBody.decastr"></td>
                    <td><input type="checkbox" value="dimensions" v-model="causes.mainBody.decastr"></td>
                    <td><input type="checkbox" value="others" v-model="causes.mainBody.decastr"></td>
                  </tr>
                  <tr>
                    <td>Afuieri</td>
                    <td><input type="checkbox" value="use" v-model="causes.mainBody.af"></td>
                    <td><input type="checkbox" value="flood" v-model="causes.mainBody.af"></td>
                    <td><input type="checkbox" value="maintenance" v-model="causes.mainBody.af"></td>
                    <td><input type="checkbox" value="materials" v-model="causes.mainBody.af"></td>
                    <td><input type="checkbox" value="tehnology" v-model="causes.mainBody.af"></td>
                    <td><input type="checkbox" value="downstream-support" v-model="causes.mainBody.af"></td>
                    <td><input type="checkbox" value="slope" v-model="causes.mainBody.af"></td>
                    <td><input type="checkbox" value="dimensions" v-model="causes.mainBody.af"></td>
                    <td><input type="checkbox" value="others" v-model="causes.mainBody.af"></td>
                  </tr>
                  <tr>
                    <td>Fisuri</td>
                    <td><input type="checkbox" value="use" v-model="causes.mainBody.cracks"></td>
                    <td><input type="checkbox" value="flood" v-model="causes.mainBody.cracks"></td>
                    <td><input type="checkbox" value="maintenance" v-model="causes.mainBody.cracks"></td>
                    <td><input type="checkbox" value="materials" v-model="causes.mainBody.cracks"></td>
                    <td><input type="checkbox" value="tehnology" v-model="causes.mainBody.cracks"></td>
                    <td><input type="checkbox" value="downstream-support" v-model="causes.mainBody.cracks"></td>
                    <td><input type="checkbox" value="slope" v-model="causes.mainBody.cracks"></td>
                    <td><input type="checkbox" value="dimensions" v-model="causes.mainBody.cracks"></td>
                    <td><input type="checkbox" value="others" v-model="causes.mainBody.cracks"></td>
                  </tr>
                  <tr>
                    <td>Desprinderi</td>
                    <td><input type="checkbox" value="use" v-model="causes.mainBody.detach"></td>
                    <td><input type="checkbox" value="flood" v-model="causes.mainBody.detach"></td>
                    <td><input type="checkbox" value="maintenance" v-model="causes.mainBody.detach"></td>
                    <td><input type="checkbox" value="materials" v-model="causes.mainBody.detach"></td>
                    <td><input type="checkbox" value="tehnology" v-model="causes.mainBody.detach"></td>
                    <td><input type="checkbox" value="downstream-support" v-model="causes.mainBody.detach"></td>
                    <td><input type="checkbox" value="slope" v-model="causes.mainBody.detach"></td>
                    <td><input type="checkbox" value="dimensions" v-model="causes.mainBody.detach"></td>
                    <td><input type="checkbox" value="others" v-model="causes.mainBody.detach"></td>
                  </tr>
                  <tr>
                    <td>Eroziuni</td>
                    <td><input type="checkbox" value="use" v-model="causes.mainBody.erosion"></td>
                    <td><input type="checkbox" value="flood" v-model="causes.mainBody.erosion"></td>
                    <td><input type="checkbox" value="maintenance" v-model="causes.mainBody.erosion"></td>
                    <td><input type="checkbox" value="materials" v-model="causes.mainBody.erosion"></td>
                    <td><input type="checkbox" value="tehnology" v-model="causes.mainBody.erosion"></td>
                    <td><input type="checkbox" value="downstream-support" v-model="causes.mainBody.erosion"></td>
                    <td><input type="checkbox" value="slope" v-model="causes.mainBody.erosion"></td>
                    <td><input type="checkbox" value="dimensions" v-model="causes.mainBody.erosion"></td>
                    <td><input type="checkbox" value="others" v-model="causes.mainBody.erosion"></td>
                  </tr>

                </template>

                  <tr>
                    <td rowspan="4" class="vert-center">Radier</td>
                    <td>Fisuri</td>
                    <td><input type="checkbox" value="use" v-model="causes.apron.cracks"></td>
                    <td><input type="checkbox" value="flood"  v-model="causes.apron.cracks"></td>
                    <td><input type="checkbox" value="maintenance" v-model="causes.apron.cracks"></td>
                    <td><input type="checkbox" value="materials"  v-model="causes.apron.cracks"></td>
                    <td><input type="checkbox" value="tehnology"  v-model="causes.apron.cracks"></td>
                    <td><input type="checkbox" value="downstream-support"  v-model="causes.apron.cracks"></td>
                    <td><input type="checkbox" value="slope"  v-model="causes.apron.cracks"></td>
                    <td><input type="checkbox" value="dimensions"  v-model="causes.apron.cracks"></td>
                    <td><input type="checkbox" value="others"  v-model="causes.apron.cracks"></td>
                  </tr>
                  <tr>
                    <td>Desprinderi</td>
                    <td><input type="checkbox" value="use"  v-model="causes.apron.detach"></td>
                    <td><input type="checkbox" value="flood"  v-model="causes.apron.detach"></td>
                    <td><input type="checkbox" value="maintenance"  v-model="causes.apron.detach"></td>
                    <td><input type="checkbox" value="materials"  v-model="causes.apron.detach"></td>
                    <td><input type="checkbox" value="tehnology"  v-model="causes.apron.detach"></td>
                    <td><input type="checkbox" value="downstream-support"  v-model="causes.apron.detach"></td>
                    <td><input type="checkbox" value="slope"  v-model="causes.apron.detach"></td>
                    <td><input type="checkbox" value="dimensions"  v-model="causes.apron.detach"></td>
                    <td><input type="checkbox" value="others"  v-model="causes.apron.detach"></td>
                  </tr>
                  <tr>
                    <td>Afuieri</td>
                    <td><input type="checkbox" value="use" v-model="causes.apron.af"></td>
                    <td><input type="checkbox" value="flood" v-model="causes.apron.af"></td>
                    <td><input type="checkbox" value="maintenance" v-model="causes.apron.af"></td>
                    <td><input type="checkbox" value="materials" v-model="causes.apron.af"></td>
                    <td><input type="checkbox" value="tehnology" v-model="causes.apron.af"></td>
                    <td><input type="checkbox" value="downstream-support" v-model="causes.apron.af"></td>
                    <td><input type="checkbox" value="slope" v-model="causes.apron.af"></td>
                    <td><input type="checkbox" value="dimensions" v-model="causes.apron.af"></td>
                    <td><input type="checkbox" value="others" v-model="causes.apron.af"></td>
                  </tr>
                  <tr>
                    <td>Eroziuni</td>
                    <td><input type="checkbox" value="use" v-model="causes.apron.erosion"></td>
                    <td><input type="checkbox" value="flood" v-model="causes.apron.erosion"></td>
                    <td><input type="checkbox" value="maintenance" v-model="causes.apron.erosion"></td>
                    <td><input type="checkbox" value="materials" v-model="causes.apron.erosion"></td>
                    <td><input type="checkbox" value="tehnology" v-model="causes.apron.erosion"></td>
                    <td><input type="checkbox" value="downstream-support" v-model="causes.apron.erosion"></td>
                    <td><input type="checkbox" value="slope" v-model="causes.apron.erosion"></td>
                    <td><input type="checkbox" value="dimensions" v-model="causes.apron.erosion"></td>
                    <td><input type="checkbox" value="others" v-model="causes.apron.erosion"></td>
                  </tr>


                  <tr>
                    <td rowspan="3" class="vert-center">Ziduri<br>de<br>conducere</td>
                    <td>Fisuri</td>
                    <td><input type="checkbox" value="use" v-model="causes.sidewalls.cracks"></td>
                    <td><input type="checkbox" value="flood" v-model="causes.sidewalls.cracks"></td>
                    <td><input type="checkbox" value="maintenance" v-model="causes.sidewalls.cracks"></td>
                    <td><input type="checkbox" value="materials" v-model="causes.sidewalls.cracks"></td>
                    <td><input type="checkbox" value="tehnology" v-model="causes.sidewalls.cracks"></td>
                    <td><input type="checkbox" value="downstream-support" v-model="causes.sidewalls.cracks"></td>
                    <td><input type="checkbox" value="slope" v-model="causes.sidewalls.cracks"></td>
                    <td><input type="checkbox" value="dimensions" v-model="causes.sidewalls.cracks"></td>
                    <td><input type="checkbox" value="others" v-model="causes.sidewalls.cracks"></td>
                  </tr>
                  <tr>
                    <td>Desprinderi</td>
                    <td><input type="checkbox" value="use" v-model="causes.sidewalls.detach"></td>
                    <td><input type="checkbox" value="flood" v-model="causes.sidewalls.detach"></td>
                    <td><input type="checkbox" value="maintenance" v-model="causes.sidewalls.detach"></td>
                    <td><input type="checkbox" value="materials" v-model="causes.sidewalls.detach"></td>
                    <td><input type="checkbox" value="tehnology" v-model="causes.sidewalls.detach"></td>
                    <td><input type="checkbox" value="downstream-support" v-model="causes.sidewalls.detach"></td>
                    <td><input type="checkbox" value="slope" v-model="causes.sidewalls.detach"></td>
                    <td><input type="checkbox" value="dimensions" v-model="causes.sidewalls.detach"></td>
                    <td><input type="checkbox" value="others" v-model="causes.sidewalls.detach"></td>
                  </tr>
                  <tr>
                    <td>Eroziuni</td>
                    <td><input type="checkbox" value="use" v-model="causes.sidewalls.erosion"></td>
                    <td><input type="checkbox" value="flood" v-model="causes.sidewalls.erosion"></td>
                    <td><input type="checkbox" value="maintenance" v-model="causes.sidewalls.erosion"></td>
                    <td><input type="checkbox" value="materials" v-model="causes.sidewalls.erosion"></td>
                    <td><input type="checkbox" value="tehnology" v-model="causes.sidewalls.erosion"></td>
                    <td><input type="checkbox" value="downstream-support" v-model="causes.sidewalls.erosion"></td>
                    <td><input type="checkbox" value="slope" v-model="causes.sidewalls.erosion"></td>
                    <td><input type="checkbox" value="dimensions" v-model="causes.sidewalls.erosion"></td>
                    <td><input type="checkbox" value="others" v-model="causes.sidewalls.erosion"></td>
                  </tr>

                  <tr>
                    <td rowspan="4" class="vert-center">Pinteni</td>
                    <td>Decastrări</td>
                    <td><input type="checkbox" value="use" v-model="causes.spurs.decastr"></td>
                    <td><input type="checkbox" value="flood" v-model="causes.spurs.decastr"></td>
                    <td><input type="checkbox" value="maintenance" v-model="causes.spurs.decastr"></td>
                    <td><input type="checkbox" value="materials" v-model="causes.spurs.decastr"></td>
                    <td><input type="checkbox" value="tehnology" v-model="causes.spurs.decastr"></td>
                    <td><input type="checkbox" value="downstream-support" v-model="causes.spurs.decastr"></td>
                    <td><input type="checkbox" value="slope" v-model="causes.spurs.decastr"></td>
                    <td><input type="checkbox" value="dimensions" v-model="causes.spurs.decastr"></td>
                    <td><input type="checkbox" value="others" v-model="causes.spurs.decastr"></td>
                  </tr>
                  <tr>
                    <td>Fisuri</td>
                    <td><input type="checkbox" value="use" v-model="causes.spurs.cracks"></td>
                    <td><input type="checkbox" value="flood" v-model="causes.spurs.cracks"></td>
                    <td><input type="checkbox" value="maintenance" v-model="causes.spurs.cracks"></td>
                    <td><input type="checkbox" value="materials" v-model="causes.spurs.cracks"></td>
                    <td><input type="checkbox" value="tehnology" v-model="causes.spurs.cracks"></td>
                    <td><input type="checkbox" value="downstream-support" v-model="causes.spurs.cracks"></td>
                    <td><input type="checkbox" value="slope" v-model="causes.spurs.cracks"></td>
                    <td><input type="checkbox" value="dimensions" v-model="causes.spurs.cracks"></td>
                    <td><input type="checkbox" value="others" v-model="causes.spurs.cracks"></td>
                  </tr>
                  <tr>
                    <td>Desprinderi</td>
                    <td><input type="checkbox" value="use" v-model="causes.spurs.detach"></td>
                    <td><input type="checkbox" value="flood" v-model="causes.spurs.detach"></td>
                    <td><input type="checkbox" value="maintenance" v-model="causes.spurs.detach"></td>
                    <td><input type="checkbox" value="materials" v-model="causes.spurs.detach"></td>
                    <td><input type="checkbox" value="tehnology" v-model="causes.spurs.detach"></td>
                    <td><input type="checkbox" value="downstream-support" v-model="causes.spurs.detach"></td>
                    <td><input type="checkbox" value="slope" v-model="causes.spurs.detach"></td>
                    <td><input type="checkbox" value="dimensions" v-model="causes.spurs.detach"></td>
                    <td><input type="checkbox" value="others" v-model="causes.spurs.detach"></td>
                  </tr>
                  <tr>
                    <td>Eroziuni</td>
                    <td><input type="checkbox" value="use" v-model="causes.spurs.erosion"></td>
                    <td><input type="checkbox" value="flood" v-model="causes.spurs.erosion"></td>
                    <td><input type="checkbox" value="maintenance" v-model="causes.spurs.erosion"></td>
                    <td><input type="checkbox" value="materials" v-model="causes.spurs.erosion"></td>
                    <td><input type="checkbox" value="tehnology" v-model="causes.spurs.erosion"></td>
                    <td><input type="checkbox" value="downstream-support" v-model="causes.spurs.erosion"></td>
                    <td><input type="checkbox" value="slope" v-model="causes.spurs.erosion"></td>
                    <td><input type="checkbox" value="dimensions" v-model="causes.spurs.erosion"></td>
                    <td><input type="checkbox" value="others" v-model="causes.spurs.erosion"></td>
                  </tr>

                  <tr>
                    <td colspan="2" class="vert-center">Disfuncționalități</td>
                    <td><input type="checkbox" value="use" v-model="causes.disfunctionalities"></td>
                    <td><input type="checkbox" value="flood" v-model="causes.disfunctionalities"></td>
                    <td><input type="checkbox" value="maintenance" v-model="causes.disfunctionalities"></td>
                    <td><input type="checkbox" value="materials" v-model="causes.disfunctionalities"></td>
                    <td><input type="checkbox" value="tehnology" v-model="causes.disfunctionalities"></td>
                    <td><input type="checkbox" value="downstream-support" v-model="causes.disfunctionalities"></td>
                    <td><input type="checkbox" value="slope" v-model="causes.disfunctionalities"></td>
                    <td><input type="checkbox" value="dimensions" v-model="causes.disfunctionalities"></td>
                    <td><input type="checkbox" value="others" v-model="causes.disfunctionalities"></td>
                  </tr>

                </tbody>
              </table>
        </fieldset>

        <fieldset>
          <legend>Observaţii</legend>
          <div class="row">
            <!-- Comments  -->
            <div class="col-xs-12">
              <textarea rows="6" style="width:100%;" v-model="comments"></textarea>
            </div>
          </div>
        </fieldset>



        <div class="col-sm-12 text-center">
        <button type="submit" class="btn btn-primary" >Submit</button>
        <button type="button" class="btn btn-warning" @click="onCancel">Cancel</button>
      </div>
      </form>
    </div>
  </div>
</template>

<script>

import generalMixin from './../../../mixins/general';
import constructionMixin from './../../../mixins/construction';

import { EditState } from './../../../models/EditState'

export default{
  mixins: [ generalMixin, constructionMixin ],
  props: [ 'construction', 'inventory', 'editState' ],

  data() {
    return {
      comments: '',
      causes: {}
    }
  },

  methods: {
    onSubmit(){
      let data = {
        comments: this.comments,
        causes: this.jsonCopy(this.causes),
       }
      this.$emit('submit', JSON.stringify(data));
    },

    onCancel(){
      let inventory = this.jsonCopy(this.inventory)
      this.comments = inventory.comments
      this.causes = inventory.causes
    }
  },

  computed: {

  },

  components: {

  },

  watch: {

  },

  created: function(){
    let inventory = this.jsonCopy(this.inventory)
    this.comments = inventory.comments
    this.causes = inventory.causes
  }


}
</script>

<style>
</style>
