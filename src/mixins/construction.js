


const cons_materials = {
    'mat_main_body' : [
        'B',
        'M',
        'GA',
        'CBG',
        'CBGM',
        'CBPB',
        'CMG',
        'CMPB',
        'CMPM',
        'CL',
        'L',
        'ZU',
        'ME',
        'PB',
        'PP',
        'PT',
        'PG',
        'PM',
        'XX'
      ],
    'mat_wings' : [
        'B',
        'M',
        'GA',
        'CBG',
        'CBGM',
        'CBPB',
        'CMG',
        'CMPB',
        'CMPM',
        'CL',
        'L',
        'ZU',
        'ME',
        'PB',
        'PP',
        'PT',
        'PG',
        'PM',
        'XX'
    ],
    'mat_apron' : [
        'B',
        'M',
        'GA',
        'ZU',
        'PP',
        'PG',
        'XX',
        'NA'
    ],
    'mat_counter_dam' : [
        'B',
        'M',
        'GA',
        'XX',
        'NA'
    ],
    'mat_side_walls' : [
        'B',
        'M',
        'GA',
        'ZU',
        'PB',
        'PP',
        'PT',
        'PG',
        'PM',
        'XX',
        'NA'
    ],
    'mat_final_spur' : [
        'B',
        'M',
        'GA',
        'PP',
        'XX',
        'NA'
    ],
    'mat_sect_apron' : [
        'B',
        'M',
        'ZU',
        'PP',
        'PM',
        'XX'
    ],
    'mat_sect_walls' : [
        'B',
        'M',
        'ZU',
        'PP',
        'XX'
    ],
    'mat_sect_spur' : [
        'B',
        'M',
        'ZU',
        'PP',
        'XX',
        'NA'
    ]}

const terms_explanations = {
			'B' :"Beton, Beton ciclopian, Beton armat",
			'M' :"Zidarie de piatra cu mortar de ciment (beton placat cu zidarie)",
			'GA' :"Gabion (zidarie uscata in plasa de sarma)",
			'CBG' :"Contraforti din beton si grinzi din beton (armat)",
			'CBGM' :"Contraforti din beton si grinzi metalice",
			'CBPB' :"Contraforti din beton si placi din beton (armat)",
			'CMG' :"Contraforti din zidarie si grinzi din beton (armat)",
			'CMPB' :"Contraforti din zidarie si placi din beton (armat)",
			'CMPM' :"Contraforti din zidarie si placi din zidarie",
			'CL' :"Casoaie din lemn",
			'L' :"Lemn",
			'ZU' :"Zidarie uscata",
			'ME' :"Elemente metalice",
			'PB' :"Blocuri, casete din beton prefabricate",
			'PP' :"Placi prefabricate, placi tip L, fasii cu goluri",
			'PT' :"Tuburi prefabricate din beton",
			'PG' :"Grinzi din beton armat, grinzi tip I",
			'PM' :"Pamant",
			'XX' :"Alte materiale",
			'NA' :"Nu exista"
	}

const trans_disip_types = [
  { name: "Fără", slug: 'n', description: "Fără" },
  { name: "Placă disipatoare", slug: 'd', description: "Placă disipatoare" },
  { name: "Bazin disipator", slug: 's', description: "Bazin disipator" },
  { name: "N/A", slug: 'na', description: "N/A" },
]


const trans_constr_types = [
  { name: "AR", slug: 'ar', description: "" },
  { name: "FI", slug: 'fi', description: "" },
  { name: "GFE", slug: 'gfe', description: "" },
  { name: "GR", slug: 'gr', description: "" },
  { name: "GS", slug: 'gs', description: "" },
  { name: "P", slug: 'p', description: "" },
  { name: "PC", slug: 'pc', description: "" },
  { name: "T", slug: 't', description: "" },
  { name: "XX", slug: 'xx', description: "" },
]




function getNewConstructionData(type){
  var construction = {
    _id: '',
    type: type ? type : '',
    gd: { // general_data
      cadastral_code: { name: '', _id: '', parent: '', ancestors: [], breadcrumb: ''},
      _cadastral_code_items_arr: ['', '', '', '', '', ''],
      construction_code: '',
      basin_name: '',
      geolocation: {lat: {deg: '', min: '', sec: ''}, long: {deg: '', min: '', sec: ''}},
      adminlocation: { county: '', county_slug: '', county_id: '', city: '', city_id: '' },
      construction_year: '',
      reparation_years: [],
      inventory_years: [],
      //
      owner: '',
      //
      protected_area: false,
      protected_area_name: ''
    }

  }

  return construction;
}








const constructionMixin = {
  methods: {

    countiesListOptions(countiesArr, firstElement){
      let list = []
      if(firstElement && typeof firstElement === 'object'){
        list.push(firstElement)
      }

      if(firstElement !== false){
          list.push({name: "Selecteaza", slug: '', description: '', _id: ''})
      }

      list.push(...countiesArr)

      return list
    },

    constructionMaterialsList(type){
       if(!cons_materials[type]) return undefined

       let list = []
       cons_materials[type].forEach(name => list.push ({
         name: name, slug: name.toLowerCase(), description: terms_explanations[name]
       }))

       return list
     },

     // used for generating <select> <option> elements
     constructionMaterialsListOptions(type, firstElement){
        if(!cons_materials[type]) return undefined

        let list = []

        if(firstElement && typeof firstElement === 'object'){
          list.push(firstElement)
        }

        if(firstElement !== false){
            list.push({name: "Selecteaza", slug: '', description: '', _id: ''})
        }

        cons_materials[type].forEach(name => list.push ({
          name: name, slug: name.toLowerCase(), description: terms_explanations[name]
        }))

        return list
      },

     getConstrMaterialBySlug(type, slug, key){
       let matList = this.constructionMaterialsList(type)

       if(!matList){
         return undefined
       }

       let el = matList.find(e =>
         e.slug == slug
       )

       if(el){
         if(key) return el[key]
         return el
       }

       return undefined
     },

     transDisipTypes(){
       return trans_disip_types
     },

     getTransDisipTypeBySlug(slug, key){
       let el = trans_disip_types.find( e => e.slug == slug)
       if(el){
         if(key) return el[key]
         return el
       }

       return undefined
     },

     transConstructionTypes(){
       return trans_constr_types
     },

     getTransConstructionTypesBySlug(slug, key){
       let el = trans_constr_types.find( e => e.slug == slug)
       if(el){
         if(key) return el[key]
         return el
       }

       return undefined
     },



    getNewTransversalConstruction(){
      var construction = getNewConstructionData('trans')
      construction.cd = { // construction_data
        has_apron: true,
        has_final_spur: false,
        has_confuseur: false,

        dam: this.getNewDam(),

        final_spur: this.getDamFinalSpur()
      }

      return construction
    },

    getNewLongitudinalConstruction(){
      var construction = getNewConstructionData('long')

      construction.cd = { // construction_data
        has_final_spur: false,

        sectors: [this.getNewSector()],

        total_length: 0,

        final_spur: this.getNewSectorsFinalSpur()
      }

      return construction
    },

    getConstructionCadastralCode(){
      if(this.construction && this.construction.gd && this.construction.gd.cadastral_code){
        return this.construction.gd.cadastral_code.breadcrumb
      }
      return '-'
    },

    getConstructionLongitude(){
      if(this.construction && this.construction.gd && this.construction.gd.geolocation && this.construction.gd.geolocation.long && this.construction.gd.geolocation.long.deg){
        let long = this.construction.gd.geolocation.long
        return long.deg + "° " + long.min + '′ ' + long.sec + '″ E'
      }
      return '-'
    },

    getConstructionLatitude(){
      if(this.construction && this.construction.gd && this.construction.gd.geolocation && this.construction.gd.geolocation.lat && this.construction.gd.geolocation.lat.deg){
        let lat = this.construction.gd.geolocation.lat
        return lat.deg + "° " + lat.min + '′ ' + lat.sec + '″ N'
      }
      return '-'
    },
    // ================ get dam fieldsets for each components ====================

    // construction itself
    getDamConstructionItself(){
      return {
        ye: '',
        h: '',
        a: '',
        b: '',
        transversal_type: ''
      }
    },

    // apron
    getDamApron(){
      return {
        lr: '',
        br: '',
        disip_type: '',
        hz: '',
        apron_teeth_no: '',
      }
    },

    // confuzor
    getDamConfuseur(){
      return {
        lc: '',
        bc: '',
      }
    },

    // final spur
    getDamFinalSpur(){
      return {
        spur_length: '',
        mat_final_spur: ''
      }
    },

    // construction materials
    getDamConstructionMaterials(){
      return {
        mat_main_body: '',
        mat_wings: '',
        mat_apron: '',
        mat_counter_dam: '',
        mat_side_walls: ''
      }
    },

    getNewDam(){
      return Object.assign({},
        this.getDamConstructionItself(),
        this.getDamApron(),
        this.getDamConfuseur(),
        this.getDamConstructionMaterials()
      )
    },








    // ================ longitudinal ===================================

    getNewSector(nr){
      return  {
        sector_nr: nr ? nr : 1,
        nr_of_stairs: '',
        spurs: [this.getNewSectorSpur()],
        sector_length: '',
        sector_deep: '',
        fruit_guard_wall: '',
        apron_width: '',

        mat_sect_apron: '',
        mat_sect_walls: ''
      }
    },

    getNewSectorSpur(nr){
      return {
        spur_nr: nr ? nr : 1,
        mat_sect_spur: '',
        spur_sidewall_height: '',
        spur_stair_height: '',
        spur_length: '',

      }
    },

    getNewSectorsFinalSpur(){
      return {
        spur_length: '',
        mat_final_spur: '',
        sidewall_height: '',

      }
    },

    getConstructionTypeName(){
      return this.getTypeNameFor(this.construction)
    },

    getTypeNameFor(construction){
      if(!construction || !construction.type) return ''

      if(construction.type == 'trans'){
        return 'transversala'
      }

      if(construction.type == 'long'){
        return 'longitudinala'
      }

      return 'unknown construction type'
    },


    /*
    // When longitudinal construction change status from 'with' to 'without' final spur, delete evetually date stored in construction
    */
    clearSectorFinalSpurData(){
      if(this.construction){
        let sfs = this.getNewSectorsFinalSpur()
        Object.keys(sfs).forEach( k => this.construction.cd[k] = '')
      }
    },

    getSectorByNr(nr){
      if(this.construction && Array.isArray(this.construction.cd.sectors)){
        return this.construction.cd.sectors.find(e => e.sector_nr == nr)
      }
      return null
    },


    getSectorFormStepData(nr, status){
      if(nr == undefined ){
        nr = 1;
      }
      if(status == undefined ){
        status = 'pristine'
      }
      return {
        group: 'sectors',
        groupName: "Sectoare",
        label: nr,
        data: { currentView: 'editor-sector', sector_nr: nr },
        status: status}
    },

    getLastSectorFormStepIndex(){
      let lastIndex = -1
      if(this.formState && this.formState.steps){
        for(let i = 0; i < this.formState.steps.length; i++){
          if(this.formState.steps[i].data.currentView == 'editor-sector'){
            lastIndex = i
          }
        }
      }
      return lastIndex
    },

    isLastSector(sector, sectorsArr){
      if( !sector.sector_nr || !Array.isArray(sectorsArr) ) return false
      const sector_nr = sector.sector_nr
      let index = sectorsArr.findIndex( e => e.sector_nr == sector_nr)
      if(index == sectorsArr.length - 1){
        return true
      }
      return false
    },


    getYearsArrayFromString(str){
      let years = str.split(/[ ,]+/)
      let currentYear = new Date().getFullYear()
      years = years.map(e => e.trim())
      years = years.filter( (element, index, self) => {
        return self.indexOf(element) === index && !isNaN(parseFloat(element)) && isFinite(element) && element.match(/^(19|20)\d{2}$/) && element <= currentYear
      })
      years.sort((a, b) => a - b)

      return years
    },


    calculateYs(construction, inventory){

      return Math.round(100* Math.random())
    },



  },


  computed: {

    isLongitudinal(){
      return this.construction && this.construction.type == 'long'
    },

    isTransversal(){
      return this.construction && this.construction.type == 'trans'
    },

    //  css styling
    noApronClass(){
      if(this.construction){
        return { disabledLabel: !this.construction.cd.has_apron }
      }
      return {}
    },

    noConfuseurClass(){
      if(this.construction){
        return { disabledLabel: !this.construction.cd.has_confuseur }
      }
      return {}
    },

    noFinalSpurClass(){
      if(this.construction){
        return { disabledLabel: !this.construction.cd.has_final_spur }
      }
      return {}
    }
  },


}

export default constructionMixin
