<template>
  <div class="row">

    <div class="col-sm-12">
      <h4>Cauze ale apariţiei degradărilor</h4>
      <!-- Causes  -->
      <table  class="table table-bordered abht-table text-center">
        <thead>

          <tr class="first-row">
            <td colspan="2"  class="vert-center">Specificaţii</td>
            <td  class="vert-center">Uzură</td>
            <td  class="vert-center">Viituri</td>
            <td  class="vert-center">Întreţineri</td>
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
              <td>{{ hasCause("use", "mainBody.decastr") }}</td>
              <td>{{ hasCause("flood", "mainBody.decastr") }}</td>
              <td>{{ hasCause("maintenance", "mainBody.decastr") }}</td>
              <td>{{ hasCause("materials", "mainBody.decastr") }}</td>
              <td>{{ hasCause("tehnology", "mainBody.decastr") }}</td>
              <td>{{ hasCause("downstream-support", "mainBody.decastr") }}</td>
              <td>{{ hasCause("slope", "mainBody.decastr") }}</td>
              <td>{{ hasCause("dimensions", "mainBody.decastr") }}</td>
              <td>{{ hasCause("others", "mainBody.decastr") }}</td>
            </tr>
            <tr>
              <td>Afuieri</td>
              <td>{{ hasCause("use", "mainBody.af") }}</td>
              <td>{{ hasCause("flood", "mainBody.af") }}</td>
              <td>{{ hasCause("maintenance", "mainBody.af") }}</td>
              <td>{{ hasCause("materials", "mainBody.af") }}</td>
              <td>{{ hasCause("tehnology", "mainBody.af") }}</td>
              <td>{{ hasCause("downstream-support", "mainBody.af") }}</td>
              <td>{{ hasCause("slope", "mainBody.af") }}</td>
              <td>{{ hasCause("dimensions", "mainBody.af") }}</td>
              <td>{{ hasCause("others", "mainBody.af") }}</td>
            </tr>
            <tr>
              <td>Fisuri</td>
              <td>{{ hasCause("use", "mainBody.cracks") }}</td>
              <td>{{ hasCause("flood", "mainBody.cracks") }}</td>
              <td>{{ hasCause("maintenance", "mainBody.cracks") }}</td>
              <td>{{ hasCause("materials", "mainBody.cracks") }}</td>
              <td>{{ hasCause("tehnology", "mainBody.cracks") }}</td>
              <td>{{ hasCause("downstream-support", "mainBody.cracks") }}</td>
              <td>{{ hasCause("slope", "mainBody.cracks") }}</td>
              <td>{{ hasCause("dimensions", "mainBody.cracks") }}</td>
              <td>{{ hasCause("others", "mainBody.cracks") }}</td>
            </tr>
            <tr>
              <td>Desprinderi</td>
              <td>{{ hasCause("use", "mainBody.detach") }}</td>
              <td>{{ hasCause("flood", "mainBody.detach") }}</td>
              <td>{{ hasCause("maintenance", "mainBody.detach") }}</td>
              <td>{{ hasCause("materials", "mainBody.detach") }}</td>
              <td>{{ hasCause("tehnology", "mainBody.detach") }}</td>
              <td>{{ hasCause("downstream-support", "mainBody.detach") }}</td>
              <td>{{ hasCause("slope", "mainBody.detach") }}</td>
              <td>{{ hasCause("dimensions", "mainBody.detach") }}</td>
              <td>{{ hasCause("others", "mainBody.detach") }}</td>
            </tr>
            <tr>
              <td>Eroziuni</td>
              <td>{{ hasCause("use", "mainBody.erosion") }}</td>
              <td>{{ hasCause("flood", "mainBody.erosion") }}</td>
              <td>{{ hasCause("maintenance", "mainBody.erosion") }}</td>
              <td>{{ hasCause("materials", "mainBody.erosion") }}</td>
              <td>{{ hasCause("tehnology", "mainBody.erosion") }}</td>
              <td>{{ hasCause("downstream-support", "mainBody.erosion") }}</td>
              <td>{{ hasCause("slope", "mainBody.erosion") }}</td>
              <td>{{ hasCause("dimensions", "mainBody.erosion") }}</td>
              <td>{{ hasCause("others", "mainBody.erosion") }}</td>
            </tr>

          </template>

          <tr>
            <td rowspan="4" class="vert-center">Radier</td>
            <td>Fisuri</td>
            <td>{{ hasCause("use", "apron.cracks") }}</td>
            <td>{{ hasCause("flood" , "apron.cracks") }}</td>
            <td>{{ hasCause("maintenance", "apron.cracks") }}</td>
            <td>{{ hasCause("materials" , "apron.cracks") }}</td>
            <td>{{ hasCause("tehnology" , "apron.cracks") }}</td>
            <td>{{ hasCause("downstream-support" , "apron.cracks") }}</td>
            <td>{{ hasCause("slope" , "apron.cracks") }}</td>
            <td>{{ hasCause("dimensions" , "apron.cracks") }}</td>
            <td>{{ hasCause("others" , "apron.cracks") }}</td>
          </tr>
          <tr>
            <td>Desprinderi</td>
            <td>{{ hasCause("use" , "apron.detach") }}</td>
            <td>{{ hasCause("flood" , "apron.detach") }}</td>
            <td>{{ hasCause("maintenance" , "apron.detach") }}</td>
            <td>{{ hasCause("materials" , "apron.detach") }}</td>
            <td>{{ hasCause("tehnology" , "apron.detach") }}</td>
            <td>{{ hasCause("downstream-support" , "apron.detach") }}</td>
            <td>{{ hasCause("slope" , "apron.detach") }}</td>
            <td>{{ hasCause("dimensions" , "apron.detach") }}</td>
            <td>{{ hasCause("others" , "apron.detach") }}</td>
          </tr>
          <tr>
            <td>Afuieri</td>
            <td>{{ hasCause("use", "apron.af") }}</td>
            <td>{{ hasCause("flood", "apron.af") }}</td>
            <td>{{ hasCause("maintenance", "apron.af") }}</td>
            <td>{{ hasCause("materials", "apron.af") }}</td>
            <td>{{ hasCause("tehnology", "apron.af") }}</td>
            <td>{{ hasCause("downstream-support", "apron.af") }}</td>
            <td>{{ hasCause("slope", "apron.af") }}</td>
            <td>{{ hasCause("dimensions", "apron.af") }}</td>
            <td>{{ hasCause("others", "apron.af") }}</td>
          </tr>
          <tr>
            <td>Eroziuni</td>
            <td>{{ hasCause("use", "apron.erosion") }}</td>
            <td>{{ hasCause("flood", "apron.erosion") }}</td>
            <td>{{ hasCause("maintenance", "apron.erosion") }}</td>
            <td>{{ hasCause("materials", "apron.erosion") }}</td>
            <td>{{ hasCause("tehnology", "apron.erosion") }}</td>
            <td>{{ hasCause("downstream-support", "apron.erosion") }}</td>
            <td>{{ hasCause("slope", "apron.erosion") }}</td>
            <td>{{ hasCause("dimensions", "apron.erosion") }}</td>
            <td>{{ hasCause("others", "apron.erosion") }}</td>
          </tr>


          <tr>
            <td rowspan="3" class="vert-center">Ziduri<br>de<br>conducere</td>
            <td>Fisuri</td>
            <td>{{ hasCause("use", "sidewalls.cracks") }}</td>
            <td>{{ hasCause("flood", "sidewalls.cracks") }}</td>
            <td>{{ hasCause("maintenance", "sidewalls.cracks") }}</td>
            <td>{{ hasCause("materials", "sidewalls.cracks") }}</td>
            <td>{{ hasCause("tehnology", "sidewalls.cracks") }}</td>
            <td>{{ hasCause("downstream-support", "sidewalls.cracks") }}</td>
            <td>{{ hasCause("slope", "sidewalls.cracks") }}</td>
            <td>{{ hasCause("dimensions", "sidewalls.cracks") }}</td>
            <td>{{ hasCause("others", "sidewalls.cracks") }}</td>
          </tr>
          <tr>
            <td>Desprinderi</td>
            <td>{{ hasCause("use", "sidewalls.detach") }}</td>
            <td>{{ hasCause("flood", "sidewalls.detach") }}</td>
            <td>{{ hasCause("maintenance", "sidewalls.detach") }}</td>
            <td>{{ hasCause("materials", "sidewalls.detach") }}</td>
            <td>{{ hasCause("tehnology", "sidewalls.detach") }}</td>
            <td>{{ hasCause("downstream-support", "sidewalls.detach") }}</td>
            <td>{{ hasCause("slope", "sidewalls.detach") }}</td>
            <td>{{ hasCause("dimensions", "sidewalls.detach") }}</td>
            <td>{{ hasCause("others", "sidewalls.detach") }}</td>
          </tr>
          <tr>
            <td>Eroziuni</td>
            <td>{{ hasCause("use", "sidewalls.erosion") }}</td>
            <td>{{ hasCause("flood", "sidewalls.erosion") }}</td>
            <td>{{ hasCause("maintenance", "sidewalls.erosion") }}</td>
            <td>{{ hasCause("materials", "sidewalls.erosion") }}</td>
            <td>{{ hasCause("tehnology", "sidewalls.erosion") }}</td>
            <td>{{ hasCause("downstream-support", "sidewalls.erosion") }}</td>
            <td>{{ hasCause("slope", "sidewalls.erosion") }}</td>
            <td>{{ hasCause("dimensions", "sidewalls.erosion") }}</td>
            <td>{{ hasCause("others", "sidewalls.erosion") }}</td>
          </tr>

          <tr>
            <td rowspan="4" class="vert-center">Pinteni</td>
            <td>Decastrări</td>
            <td>{{ hasCause("use", "spurs.decastr") }}</td>
            <td>{{ hasCause("flood", "spurs.decastr") }}</td>
            <td>{{ hasCause("maintenance", "spurs.decastr") }}</td>
            <td>{{ hasCause("materials", "spurs.decastr") }}</td>
            <td>{{ hasCause("tehnology", "spurs.decastr") }}</td>
            <td>{{ hasCause("downstream-support", "spurs.decastr") }}</td>
            <td>{{ hasCause("slope", "spurs.decastr") }}</td>
            <td>{{ hasCause("dimensions", "spurs.decastr") }}</td>
            <td>{{ hasCause("others", "spurs.decastr") }}</td>
          </tr>
          <tr>
            <td>Fisuri</td>
            <td>{{ hasCause("use", "spurs.cracks") }}</td>
            <td>{{ hasCause("flood", "spurs.cracks") }}</td>
            <td>{{ hasCause("maintenance", "spurs.cracks") }}</td>
            <td>{{ hasCause("materials", "spurs.cracks") }}</td>
            <td>{{ hasCause("tehnology", "spurs.cracks") }}</td>
            <td>{{ hasCause("downstream-support", "spurs.cracks") }}</td>
            <td>{{ hasCause("slope", "spurs.cracks") }}</td>
            <td>{{ hasCause("dimensions", "spurs.cracks") }}</td>
            <td>{{ hasCause("others", "spurs.cracks") }}</td>
          </tr>
          <tr>
            <td>Desprinderi</td>
            <td>{{ hasCause("use", "spurs.detach") }}</td>
            <td>{{ hasCause("flood", "spurs.detach") }}</td>
            <td>{{ hasCause("maintenance", "spurs.detach") }}</td>
            <td>{{ hasCause("materials", "spurs.detach") }}</td>
            <td>{{ hasCause("tehnology", "spurs.detach") }}</td>
            <td>{{ hasCause("downstream-support", "spurs.detach") }}</td>
            <td>{{ hasCause("slope", "spurs.detach") }}</td>
            <td>{{ hasCause("dimensions", "spurs.detach") }}</td>
            <td>{{ hasCause("others", "spurs.detach") }}</td>
          </tr>
          <tr>
            <td>Eroziuni</td>
            <td>{{ hasCause("use", "spurs.erosion") }}</td>
            <td>{{ hasCause("flood", "spurs.erosion") }}</td>
            <td>{{ hasCause("maintenance", "spurs.erosion") }}</td>
            <td>{{ hasCause("materials", "spurs.erosion") }}</td>
            <td>{{ hasCause("tehnology", "spurs.erosion") }}</td>
            <td>{{ hasCause("downstream-support", "spurs.erosion") }}</td>
            <td>{{ hasCause("slope", "spurs.erosion") }}</td>
            <td>{{ hasCause("dimensions", "spurs.erosion") }}</td>
            <td>{{ hasCause("others", "spurs.erosion") }}</td>
          </tr>

          <tr>
            <td colspan="2" class="vert-center">Disfuncționalități</td>
            <td>{{ hasCause("use", "disfunctionalities") }}</td>
            <td>{{ hasCause("flood", "disfunctionalities") }}</td>
            <td>{{ hasCause("maintenance", "disfunctionalities") }}</td>
            <td>{{ hasCause("materials", "disfunctionalities") }}</td>
            <td>{{ hasCause("tehnology", "disfunctionalities") }}</td>
            <td>{{ hasCause("downstream-support", "disfunctionalities") }}</td>
            <td>{{ hasCause("slope", "disfunctionalities") }}</td>
            <td>{{ hasCause("dimensions", "disfunctionalities") }}</td>
            <td>{{ hasCause("others", "disfunctionalities") }}</td>
          </tr>

        </tbody>
      </table>

      <h4>Observaţii</h4>
      <div class="row">
        <!-- Comments  -->
        <div class="col-xs-12" v-html="inventory.comments">

        </div>
      </div>





    </div>
  </div>
</template>

<script>
import constructionMixin from './../../mixins/construction'

export default{
  mixins: [ constructionMixin ],
  props: [ 'construction', 'inventory'],

  data() {
    return {
    }
  },

  methods: {
    hasCause(causeName, causeLine){
      let arr = causeLine.split(".")
      let cause = this.inventory.causes
      arr.forEach(e => {
        if(cause){
          cause = cause[e]
        }
      })
      if(cause && Array.isArray(cause) && cause.includes(causeName)){
        return 'x'
      }else{
        return ''
      }
    }
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
