<template>
  <div class="row">
    <div class="col-sm-12">
      <form  @submit.prevent="onSubmit">


        <div class="row">


          <div class="col-xs-12 col-sm-3 col-md-2">
            <div class="form-group">
              <label for="constructionType">Tip lucrare</label>
              <select id="constructionType" v-model="type"  class="form-control">
                <option v-for="type in constrTypesArr" :value="type.val">{{type.text}}</option>
              </select>
            </div>
          </div>


          <!-- Ys  -->
          <div class="col-xs-12 col-sm-3 col-md-2">
            <div class="form-group">
              <label for="construction_year_from">Indicele de stare (Ys)</label>
              <input type="text" v-model="query.ys_from" placeholder="min" class="form-control">
            </div>
          </div>

          <div class="col-xs-12 col-sm-3 col-md-2">
            <div class="form-group">
              <label  class="hidden-xs">&nbsp;</label>
              <input type="text" v-model="query.ys_to" placeholder="max" class="form-control">
            </div>
          </div>





          <!-- Final spur -->
          <div  v-if="query.type == 'long'" class="col-xs-12 col-sm-3 col-md-2">
            <div class="form-group">
              <label>Pinten terminal</label>
              <select id="inventory_year_to" v-model="query.has_final_spur"  class="form-control">
                <option v-for="el in presenceArr" :value="el.val">{{el.txt}}</option>
              </select>
            </div>
          </div>



          <template  v-if="query.type == 'trans'">
            <!-- Apron -->
            <div class="col-xs-12 col-sm-3 col-md-2">
              <div class="form-group">
                <label>Radier</label>
                <select v-model="query.has_apron"  class="form-control" @change="apronSelChanged">
                  <option v-for="el in presenceArr" :value="el.val">{{el.txt}}</option>
                </select>
              </div>
            </div>

            <!-- Confuseur -->
            <div class="col-xs-12 col-sm-3 col-md-2">
              <div class="form-group">
                <label>Confuzor</label>
                <select id="inventory_year_to" v-model="query.has_confuseur"  class="form-control" :disabled="constrWithoutApron">
                  <option v-for="el in presenceArr" :value="el.val">{{el.txt}}</option>
                </select>
              </div>
            </div>


            <!-- Final spur -->
            <div class="col-xs-12 col-sm-3 col-md-2">
              <div class="form-group">
                <label>Pinten terminal</label>
                <select id="inventory_year_to" v-model="query.has_final_spur"  class="form-control" :disabled="constrWithoutApron">
                  <option v-for="el in presenceArr" :value="el.val">{{el.txt}}</option>
                </select>
              </div>
            </div>


          </template>



        </div><!-- row -->



        <div class="row">
          <!-- Cadastral Code  -->
          <div class="col-xs-12">
            <div class="form-group">
              <label>Cod cadastral</label>
              <div class="row">
                <template v-for="i in 6" >
                  <div class="col-xs-4 col-sm-2 col-md-2" >
                    <select :id="'code_level_'+(i-1)"
                    v-model="query['cc_l_'+ (i-1)]"
                    class="form-control"
                    @change="cadastralSelectChanged(i-1)"
                    :disabled="!cadastralCodesArr[i-1].length">

                      <option v-for="el in cadastralCodesArr[i-1]" :value="el._id">{{ el.name }}</option>
                    </select>
                  </div>
                </template>
            </div>
          </div>
          </div>
        </div>

      <div class="row">

        <!-- Location -->
        <div class="col-xs-12 col-sm-3 col-md-2">
          <div class="form-group">
            <label>Judeţ</label>
            <select v-model="query.county"  class="form-control">
              <option v-for="el in countiesListOptions(countiesList)" :value="el._id">{{el.name}}</option>
            </select>
          </div>
        </div>

        <div class="col-xs-12 col-sm-3 col-md-2">
          <div class="form-group">
            <label class="hidden-xs">Localitate</label>
            <select v-model="query.city"  class="form-control" :disabled="citiesArr.length == 0">
              <option v-for="el in citiesSelectionArr" :value="el._id">{{el.name}}</option>
            </select>
          </div>
        </div>
        </div><!-- row -->


        <div class="row">

          <!-- Construction year -->
          <div class="col-xs-12 col-sm-3 col-md-2">
            <div class="form-group">
              <label for="construction_year_from">An execuţie</label>
              <select id="construction_year_from" v-model="query.construction_year_from"  class="form-control">
                <option v-for="el in yearsArr({txt:'Intre anul'})" :value="el.val">{{el.txt}}</option>
              </select>
            </div>
          </div>

          <div class="col-xs-12 col-sm-3 col-md-2">
            <div class="form-group">
              <label for="construction_year_to" class="hidden-xs">&nbsp;</label>
              <select id="construction_year_to" v-model="query.construction_year_to"  class="form-control">
                <option v-for="el in yearsArr({txt:'Si anul'})" :value="el.val">{{el.txt}}</option>
              </select>
            </div>
          </div>


          <!-- Inventory year -->
          <div class="col-xs-12 col-sm-3 col-md-2">
            <div class="form-group">
              <label for="inventory_year_from">An inventariere</label>
              <select id="inventory_year_from" v-model="query.inventory_year_from"  class="form-control">
                <option v-for="el in yearsArr({txt:'Intre anul'})" :value="el.val">{{el.txt}}</option>
              </select>
            </div>
          </div>

          <div class="col-xs-12 col-sm-3 col-md-2">
            <div class="form-group">
              <label for="inventory_year_to"  class="hidden-xs">&nbsp;</label>
              <select id="inventory_year_to" v-model="query.inventory_year_to"  class="form-control">
                <option v-for="el in yearsArr({txt:'Si anul'})" :value="el.val">{{el.txt}}</option>
              </select>
            </div>
          </div>


          <!-- Protected area -->
          <div class="col-xs-12 col-sm-3 col-md-2">
            <div class="form-group">
              <label>Arie protejată</label>
              <select v-model="query.protected_area"  class="form-control">
                <option v-for="el in presenceArr" :value="el.val">{{el.txt}}</option>
              </select>
            </div>
          </div>


        </div><!-- row -->

        <!-- LONGITUDINALS -->
        <template v-if="query.type == 'long'">


          <div class="row">



            <!-- Total length -->
            <div class="col-xs-6 col-sm-4 col-md-3">
              <div class="form-group row">
                <div class="col-xs-12">
                  <label>Lungime totală (m)</label>
                </div>
                <div class="col-xs-6">
                  <input type="text" v-model="query.total_length_from" placeholder="min" class="form-control">
                </div>
                <div class="col-xs-6">
                  <input type="text" v-model="query.total_length_to" placeholder="max" class="form-control">
                </div>
              </div>
            </div>

            <!-- Sector length -->
            <div class="col-xs-6 col-sm-4 col-md-3">
              <div class="form-group row">
                <div class="col-xs-12">
                  <label>Lungime sector - Ls (m)</label>
                </div>
                <div class="col-xs-6">
                  <input type="text" v-model="query.ls_from" placeholder="min" class="form-control">
                </div>
                <div class="col-xs-6">
                  <input type="text" v-model="query.ls_to" placeholder="max" class="form-control">
                </div>
              </div>
            </div>


            <!-- Sector deep -->
            <div class="col-xs-6 col-sm-4 col-md-3">
              <div class="form-group row">
                <div class="col-xs-12">
                  <label>Adâncime - Hs (m)</label>
                </div>
                <div class="col-xs-6">
                  <input type="text" v-model="query.hs_from" placeholder="min" class="form-control">
                </div>
                <div class="col-xs-6">
                  <input type="text" v-model="query.hs_to" placeholder="max" class="form-control">
                </div>
              </div>
            </div>


            <!-- Spur width -->
            <div class="col-xs-6 col-sm-4 col-md-3">
              <div class="form-group row">
                <div class="col-xs-12">
                  <label>Lăţime radier - bs (m)</label>
                </div>
                <div class="col-xs-6">
                  <input type="text" v-model="query.bs_from" placeholder="min" class="form-control">
                </div>
                <div class="col-xs-6">
                  <input type="text" v-model="query.bs_to" placeholder="max" class="form-control">
                </div>
              </div>
            </div>

          </div><!-- row -->


          <!-- Construction materials -->
          <div class="row">
            <div class="col-xs-12"><label>Materiale de construcţie</label></div>

            <template v-for="sel in longSelectionMaterials">

              <div class="col-sm-12">{{sel.title}}</div>

              <template v-for="mat in constructionMaterialsList(sel.materials)"
              class="form-group">
              <div class="col-xs-3 col-sm-2 col-md-1 form-inline">
                <div class="form-group">
                  <input type="checkbox"
                  class="form-control"
                  :id="sel.materials+'_'+mat.slug"
                  :value="mat.slug"
                  :key="sel.materials+'___'+mat.slug"
                  v-model="query[sel.materials]" >
                  <label :for="sel.materials+'_'+mat.slug" >{{ mat.name }} </label>
                </div>
              </div>
            </template>

          </template>

        </div><!-- row -->

      </template> <!-- end longitudinals -->




      <!-- TRANVERSALS -->
      <template v-if="query.type == 'trans'">

        <div class="row">

          <!-- Ye -->
          <div class="col-xs-6 col-sm-4  col-md-4">
            <div class="form-group row">
              <div class="col-xs-12">
                <label>Înălțime elevație - Ye (m)</label>
              </div>
              <div class="col-xs-6">
                <input type="text" v-model="query.ye_from" placeholder="min" class="form-control">
              </div>
              <div class="col-xs-6">
                <input type="text" v-model="query.ye_to" placeholder="max" class="form-control">
              </div>
            </div>
          </div>

          <!-- Sarcina in deversor -->
          <div class="col-xs-6 col-sm-4  col-md-4">
            <div class="form-group row">
              <div class="col-xs-12">
                <label>Sarcină în deversor - H (m)</label>
              </div>
              <div class="col-xs-6">
                <input type="text" v-model="query.h_from" placeholder="min" class="form-control">
              </div>
              <div class="col-xs-6">
                <input type="text" v-model="query.h_to" placeholder="max" class="form-control">
              </div>
            </div>
          </div>


          <!-- Apron length -->
          <div class="col-xs-6 col-sm-4 col-md-4">
            <div class="form-group row">
              <div class="col-xs-12">
                <label>Lungime radier - Lr (m)</label>
              </div>
              <div class="col-xs-6">
                <input type="text" v-model="query.lr_from" placeholder="min" class="form-control">
              </div>
              <div class="col-xs-6">
                <input type="text" v-model="query.lr_to" placeholder="max" class="form-control">
              </div>
            </div>
          </div>



        </div><!-- row -->


        <!-- Construction dam type -->
      <div class="row">
        <div class="col-xs-12"><label>Tip lucrare</label></div>

        <template v-for="type in transConstructionTypes()"
        class="form-group">
        <div class="col-xs-3 col-sm-2 col-md-1 form-inline">
          <div class="form-group">
            <input type="checkbox"
            class="form-control"
            :id="'dam_type_'+type.slug"
            :value="type.slug"
            :key="'dam_type__'+type.slug"
            v-model="query.transversal_type" >
            <label :for="'dam_type_'+type.slug" >{{ type.name }} </label>
          </div>
        </div>
      </template>

      </div><!-- row -->

          <!-- Construction disip type -->
        <div class="row">
          <div class="col-xs-12"><label>Tip disipator</label></div>

          <template v-for="(type, index) in transDisipTypes()"
          class="form-group">
          <div class="col-xs-6 col-sm-3 col-md-2 form-inline">
            <div class="form-group">
              <input type="checkbox"
              class="form-control"
              :id="'dam_disip_type_'+type.slug"
              :value="type.slug"
              :key="'dam_disip_type__'+type.slug"
              v-model="query.disip_type" >
              <label :for="'dam_disip_type_'+type.slug" >{{ type.name }} </label>
            </div>
          </div>
        </template>

        </div><!-- row -->


        <!-- Construction materials -->
        <div class="row">
          <div class="col-xs-12"><label>Materiale de construcţie</label></div>

          <template v-for="sel in transSelectionMaterials">

            <div class="col-sm-12">{{sel.title}}</div>

            <template v-for="mat in constructionMaterialsList(sel.materials)"
            class="form-group">
            <div class="col-xs-3 col-sm-2 col-md-1 form-inline">
              <div class="form-group">
                <input type="checkbox"
                class="form-control"
                :id="sel.materials+'_'+mat.slug"
                :value="mat.slug"
                :key="sel.materials+'___'+mat.slug"
                v-model="query[sel.materials]" >
                <label :for="sel.materials+'_'+mat.slug" >{{ mat.name }} </label>
              </div>
            </div>
          </template>

        </template>

      </div><!-- row -->
      </template> <!-- end transversals -->

      <div class="col-sm-12 text-center">
        <button type="submit" class="btn btn-primary">Submit</button>
      </div>
    </form>
  </div>
</div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

import * as axios from './../../api'

// import Popper from 'popper.js'

import generalMixin from './../../mixins/general'
import constructionMixin from './../../mixins/construction'

export default{
  mixins: [ generalMixin, constructionMixin ],
  props: [ ],

  data() {
    return {
      query: {
        type: undefined,

        ys_from: undefined,
        ys_to: undefined,

        // cadastral codes
        cc_l_0: undefined,
        cc_l_1: undefined,
        cc_l_2: undefined,
        cc_l_3: undefined,
        cc_l_4: undefined,
        cc_l_5: undefined ,

        inventory_year_from: undefined,
        inventory_year_to: undefined,

        construction_year_from: undefined,
        construction_year_to: undefined,

        protected_area: undefined,

        county: undefined,
        city: undefined,


      },

      cadastralCodesArr: [
        [],
        [],
        [],
        [],
        [],
        []
      ],

      citiesArr: [],

      longQtyCriterias: [
        'has_final_spur',

        'total_length_from',
        'total_length_to',

        'ls_from',
        'ls_to',
        'hs_from',
        'hs_to',
        'bs_from',
        'bs_to',
      ],

      longMultiCriterias: [
        'mat_sect_apron',
        'mat_sect_walls',
        'mat_sect_spur',
      ],

      transQtyCriterias: [
        'has_final_spur',
        'has_confuseur',
        'has_apron',

        'ye_from',
        'ye_to',

        'lr_from',
        'lr_to',

        'h_from',
        'h_to'


      ],

      transMultiCriterias: [
        'transversal_type',
        'disip_type',


        'mat_main_body',
        'mat_wings',
        'mat_apron',
        'mat_counter_dam',
        'mat_side_walls',

        'mat_final_spur',

      ],

      constrTypesArr: [{val: undefined, text: "Selectează"}, {val: 'long', text: "Longitudinală"}, {val: 'trans', text: "Transversală"}],

      longSelectionMaterials: [
        {title: "Radier sector", materials: 'mat_sect_apron' },
        {title: "Ziduri gardă", materials: 'mat_sect_walls' },
        {title: "Pinteni", materials: 'mat_sect_spur' }
      ],

      transSelectionMaterials: [
        {title: "Corp lucrare", materials: 'mat_main_body' },
        {title: "Aripi lucrare", materials: 'mat_wings' },
        {title: "Radier", materials: 'mat_apron' },
        {title: "Contrabaraj", materials: 'mat_counter_dam' },
        {title: "Ziduri de conducere", materials: 'mat_side_walls' },
        {title: "Pinten terminal", materials: 'mat_final_spur' },
      ],


      constrWithoutApron: false,

      initializedSelectionForm: false

    }
  },

  methods: {
    ...mapActions(['updateConstructionsSelectionFilters']),

    onSubmit(){
      console.log( ' query before json ' , this.query)
      let query = this.jsonCopy(this.query)
      query.page = 1
      this.updateConstructionsSelectionFilters(query)

      console.log(query)
      this.$router.push({ name: 'constructions-list', query: query })
    },

    yearsArr: function(firstSelectItem){
      const startYear = 1900
      let currentYear = new Date().getFullYear()

      let yearsArr = []
      if(firstSelectItem){
        yearsArr.push(firstSelectItem)
      }

      for(let i = currentYear; i >= startYear; i--){
        yearsArr.push({txt: i, val: i})
      }
      return yearsArr
    },

    clearQuery(type){
      let cq = {}
      if(type == undefined || type == 'long'){
        this.longQtyCriterias.forEach(c => cq[c] = undefined )
        this.longMultiCriterias.forEach(c => cq[c] = [])
      }

      if(type == undefined || type == 'trans'){
        this.transQtyCriterias.forEach(c => cq[c] = undefined )
        this.transMultiCriterias.forEach(c => cq[c] = [])
      }

      this.query = Object.assign({}, this.query, cq)
    },

    apronSelChanged(val){
      if(this.query.has_apron == false){
        this.query.has_confuseur = undefined
        this.query.has_final_spur = undefined
        this.constrWithoutApron = true
      }else{
        this.constrWithoutApron = false
      }
    },

    getCadastralOptionsList(arr){
      return [{ _id: undefined, name: "Selecteaza"}, ...arr ]
    },


    updateCadastralSelectLevel(level, cadOptionsArr){
      this.cadastralCodesArr.splice(level, 1,  cadOptionsArr)
    },


    fetchCadastralForLevel(level, parentId, cb){
      if(parentId){
        let req = {url: '/cadastrals/'+ parentId }
        axios._get(req)
        .then( res => {
          let cadOptionsArr = []
          if(res.data.length){
            cadOptionsArr = this.getCadastralOptionsList(res.data)
          }

          cb(null, cadOptionsArr)

        })
        .catch( error =>  cb(error) )
      }
    },


    cadastralSelectChanged(level){
      if(!this.initializedSelectionForm) return
      console.log('level ' + level + ' changed:  ' + this.query['cc_l_'+level])
      let parentId = this.query['cc_l_'+level]

      if(level < 5){
        for(let i = 5; i > level; i--){
          this.cadastralCodesArr.splice(i, 1,  [])
          this.query['cc_l_'+i] = undefined
        }

        this.fetchCadastralForLevel(level+1, parentId, (err, res) => {
          if(err) return console.log(err)

          this.updateCadastralSelectLevel(level+1, res)
        })
      }
    },

    // used on created component; fetch and restore the selection
    restoreCadastralCodesSelect(){

      // level 0 selection options
      this.cadastralCodesArr.splice(0, 1, this.getCadastralOptionsList(this.cadastralListLevel_0) )

      let selectionsArr = []

      for(let i = 0; i < 6; i++){
        if(this.query['cc_l_'+i]){
          selectionsArr.push(this.query['cc_l_'+i])
        }else{
          break
        }
      }

      // if nothing has to be done
      if(selectionsArr.length == 0){
        this.initializedSelectionForm = true
        return
      }

      this.waterfallSelectionsCadastrals(selectionsArr, 0, (err, res) => {
        if(err) return console.log(err)

        console.log('res waterfallSelectionsCadastrals', res)
        if(res < selectionsArr.length - 1){ // if some of the items were not finded
          for(let i = res; i < 6; i++){
            this.query['cc_l_'+i] = undefined
          }
        }

        this.initializedSelectionForm = true
        console.log('gata')

      })
    },


    waterfallSelectionsCadastrals(selectionsArr, currentLevel, cb ){
      if(!selectionsArr[currentLevel]) return cb(new Error("Aiurea"))
      let itemExists = this.cadastralCodesArr[currentLevel].find(e => e._id == selectionsArr[currentLevel])
      if(!itemExists) cb(null, currentLevel)

      this.fetchCadastralForLevel(currentLevel+1, selectionsArr[currentLevel], (err, res) => {
        if(err) return cb(err)

        this.updateCadastralSelectLevel(currentLevel+1, res)

        if(currentLevel + 1  < selectionsArr.length){
          this.waterfallSelectionsCadastrals(selectionsArr, currentLevel+1, cb)
        }else{
          cb(null, currentLevel)
        }
      })
    }

  },

  computed: {
    ...mapGetters([ 'constrFilters', 'countiesList', 'cadastralListLevel_0' ]),

    presenceArr: function(){
      return [
        {txt: 'Selectează', val: undefined},
        {txt: 'Da', val: true},
        {txt: 'Nu', val: false},
      ]
    },

    type: {
      get: function(){
        return this.query.type
      },

      set: function(val){
        this.query.type = val
        if(val == 'long'){
          this.clearQuery('trans')
        }else if(val == 'trans'){
          this.clearQuery('long')
        }else{ // if is removed long or trans selection, clear all
          this.clearQuery()
        }
      }
    },

    citiesSelectionArr: function(){
      if(this.citiesArr == 0){
        if(this.query.county){
          return [{name: 'Nu exista localitati', val: undefined}]
        }else{
          return []
        }
      }
      return [{name: 'Selectează', val: undefined}, ...this.citiesArr]
    },

  },

  components: {

  },

  watch: {
    'query.county': function(id){

      this.citiesArr = []

      if(id){
        let req = {url: '/cities/'+id}
        axios._get(req)
        .then( res => {
          this.citiesArr = res.data
          // on creation, city should be kept, otherwise set it to undefined
          if(!this.citiesArr.find(e => {return e._id == this.query.city})){
            this.query.city = undefined
          }
        })
        .catch( error => console.log(error) )
      }
    },

    'cadastralListLevel_0': function(val){
      this.cadastralCodesArr.splice(0, 1, this.getCadastralOptionsList(val) )
    }
  },

  created: function(){
    this.clearQuery()

    let filtersCopy =  this.jsonCopy(this.constrFilters)

    let multiCriterias = [...this.transMultiCriterias, ...this.longMultiCriterias]

    multiCriterias.forEach(e => {
      if(filtersCopy[e] && !Array.isArray(filtersCopy[e])){
        filtersCopy[e] = [filtersCopy[e] ]
      }
    })

    Object.assign(this.query, filtersCopy)

    this.restoreCadastralCodesSelect()
  },

}
</script>

<style>
</style>
