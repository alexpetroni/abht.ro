import * as axios from './../api'

import { EditState } from './../models/EditState'

import store from './../store'

const editorMixin = {
  data() {
    return {

    }
  },

  methods: {

    getEditorId(){
      return store.getters.user._id
    },

    // for new constructions
    onGeneralDataSubmit(jsonData){
      let data = JSON.parse(jsonData)

      if(this.editState == EditState.EDIT){
        let gd = data.construction.gd

        gd.last_edit_author = this.getEditorId()
        gd.date_last_modified = new Date().toISOString()

        let req = { url: 'constructions/'+this.construction._id + '/generaldata' , data: gd }

        axios._put(req)
        .then( res => {
          this.$emit('constructionUpdated', res.data);
          this.invalidateConstructionsList()
        })
        .catch( error => console.log(error) )

      }else{

        this.construction = data.construction

        this.markupCurrentStepAsValid()
        this.showNextFormStep()
      }

    },


    onDamDataSubmit(jsonData){
      let data = JSON.parse(jsonData)

      if(this.editState == EditState.EDIT){

        data.type = this.construction.type
        data.last_edit_author = this.getEditorId()
        data.date_last_modified = new Date().toISOString()

        let req = { url: 'constructions/'+this.construction._id + '/constructiondata', data: data }
        axios._put(req)
        .then( res => {
          this.$emit('constructionUpdated', res.data);
          this.invalidateConstructionsList()
        })
        .catch( error => console.log(error) )

      }else{

        this.construction.cd.dam = data.dam
        this.construction.cd.final_spur = data.final_spur

        this.markupCurrentStepAsValid()
        this.showNextFormStep()
      }
    },

    calculateLongitudinalTotalLength(sectorsArr){
      let total_length = 0;
      if(sectorsArr && Array.isArray(sectorsArr)){
        sectorsArr.forEach( s => {

          total_length += parseFloat(s.sector_length)

        } )

      }
      return total_length
    },

    onSectorDataSubmit(jsonData){
      let data = JSON.parse(jsonData)
      let sector = data.sector

      let index = this.construction.cd.sectors.findIndex( e => e.sector_nr == sector.sector_nr)

        if(this.editState == EditState.EDIT){
          if(index != -1){
            let sectorsArr = this.jsonCopy(this.construction.cd.sectors)
            sectorsArr.splice(index, 1, sector)

            let updateData = {
              type: this.construction.type,
              sectors: sectorsArr,
              total_length: this.calculateLongitudinalTotalLength(sectorsArr),

              date_last_modified: new Date().toISOString(),
              last_edit_author: this.getEditorId()
            }

            // if was the last sector and has final spur
            if(this.showFinalSpur){
              updateData.final_spur = data.finalSpur
            }

            let req = { url: 'constructions/'+ this.construction._id + '/constructiondata', data: updateData }

            axios._put(req)
            .then( res => {
              this.$emit('constructionUpdated', res.data)
              this.invalidateConstructionsList()
            })
            .catch( error => console.log(error) )

          }else{
            alert('Error occured on Sector Data Update')
          }

        }else{ // if is a a new inventory

          if(index != -1){
            this.construction.cd.sectors.splice(index, 1, sector)

            // if was the last sector and has final spur
            if(this.showFinalSpur){
              this.construction.cd.final_spur = data.finalSpur
            }

            this.markupCurrentStepAsValid()
            this.showNextFormStep()
          }else{
            alert('Error occured onSectorDataSubmit')
          }
        }
    },


    onObsAndCauseSubmit(jsonData){
      let data = JSON.parse(jsonData)
      this.inventory.comments = data.comments
      this.inventory.causes = data.causes

      if(this.editState == EditState.EDIT){ // edit existent inventory
        this.updateCurrentInventory()
      }else{
        this.markupCurrentStepAsValid()
        this.showNextFormStep()
      }
    },


    onDamInventoryDataSubmit(jsonData){
      let data = JSON.parse(jsonData)
      this.inventory = data.inventory

      if(this.editState == EditState.EDIT){ // edit existent inventory
        this.updateCurrentInventory()

      }else{ // add inventory
        console.log(  ' add new ')
        let yearRecorded = false
        // check if is a new construction or is an inventory addition to an existent construction
        if(this.construction.current_inventory && this.construction.inventories_archive){
            yearRecorded = this.checkIfInventoryYearAlreadyExist(this.construction, this.inventory.year)
        }

        if(!yearRecorded){
          this.markupCurrentStepAsValid()
          this.showNextFormStep()
        }
      }
    },


    onSectorInventoryDataSubmit(jsonData){
      let data = JSON.parse(jsonData)
      let sectorInventory = data.sectorInventory

      let sectorIndex = this.inventory.sectors.findIndex(e => e.sector_nr == sectorInventory.sector_nr)

      if(sectorIndex == -1) {
        this.setupErrorMsg('A aparut o eroare la salvarea sectorului '+sectorInventory.sector_nr+'.')
        this.$router.push('/error')
        return
      }

      this.inventory.sectors.splice(sectorIndex, 1, sectorInventory)

      // if was the last sector and has final spur
      if(this.showFinalSpur){
        this.inventory.final_spur = data.finalSpurInventory
      }

      if(this.editState == EditState.EDIT){

        let url = 'constructions/'+this.construction._id+'/inventory/' + this.inventory.year

        let data = this.jsonCopy(this.inventory)
        data.last_edit_author = this.getEditorId()
        data.date_last_modified = new Date().toISOString()

        const req = { url: url, data: data  }
        axios._put( req )
        .then( res => {
          // this.construction = res.data
          this.invalidateConstructionsList()
        })
        .catch(err => console.log(err))
      }else{
        let year = data.year
        if(this.inventory.year != data.year){
          this.inventory.year = data.year
        }
        this.markupCurrentStepAsValid()
        this.showNextFormStep()
      }


    },

    registerNewConstructionWithInventory(){
      this.construction.current_inventory =  this.inventory

      if(this.isLongitudinal){
        this.construction.cd.total_length = this.calculateLongitudinalTotalLength(this.construction.cd.sectors)
      }

      let data = this.jsonCopy(this.construction)
      data.author = this.getEditorId()



      let req = { url:'constructions', data: data }

      axios._post(req)
      .then( res => {
        this.invalidateConstructionsList()
        this.$router.push({name: 'construction', params: {id: res.data._id}})
      })
      .catch( error => console.log(error) )
    },


    // images
    // this is only for new constructions with inventory
    onSaveNewContructionWithInventorySubmit(jsonData){
      let data = JSON.parse(jsonData)
      this.inventory.images = data

      this.markupCurrentStepAsValid()
      this.registerNewConstructionWithInventory()
    },

    // this is only when a new inventory is added for an existing construction
    onSaveNewInventorySubmit(jsonData){
      let data = JSON.parse(jsonData)
      this.inventory.images = data

      // check if an inventory with this year does not already exists
      let yearRecorded = this.checkIfInventoryYearAlreadyExist(this.construction, this.inventory.year)
      if(!yearRecorded){
        this.markupCurrentStepAsValid()
        this.registerNewInventoryForConstruction()
      }
    },

    onDeleteImageSubmit(jsonData){
      let data = JSON.parse(jsonData)

      if(this.editState == EditState.EDIT){ // edit existent inventory
        const url = 'constructions/'+ this.construction._id + '/inventory/' + this.inventory.year +'/images?imgid='+ data._id
        const req = { url: url, data: data }

        axios._delete(req)
        .then(response => {

          let construction = response.data

          let images = []

          // update images in edited construction
          this.construction.inventories_archive = construction.inventories_archive
          this.construction.current_inventory = construction.current_inventory


          let updatedInventory = construction.inventories_archive.find( inv => inv.year == this.inventory.year)
          if(updatedInventory){
            images = updatedInventory.images
          }else if(construction.current_inventory.year == this.inventory.year){
            images = construction.current_inventory.images
          }

          this.inventory.images = images

        //  console.log(error.response.data);
        })
        .catch(function (error) {
          console.log(error)
          if (error.response) {
            // The request was made and the server responded with a status code
            // that falls out of the range of 2xx

          } else if (error.request) {
            // The request was made but no response was received
            // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
            // http.ClientRequest in node.js
            console.log(error.request);
          } else {
            // Something happened in setting up the request that triggered an Error
            console.log('Error', error.message);
          }
          console.log(error.config);
        });
      }else{ // if is new, just delete the image file, no db involved
      //  consol.log("new images request delete")
        const req = { url: 'upload/delete', data: data }
        axios._post(req)
        .then(function (response) {

        })
        .catch(function (error) {
          console.log(error);
        });
      }
    },

    onAppendImagesSubmit(jsonData){
      let data = JSON.parse(jsonData)

      if(this.editState == EditState.EDIT){ // edit existent inventory
        const url = 'constructions/'+ this.construction._id + '/inventory/' + this.inventory.year +'/images'
        const req = { url: url, data: { images: data, type: this.construction.type } }

        axios._put(req)
        .then(response => {

          let construction = response.data

          let images = []

          // update images in edited construction
          this.construction.inventories_archive = construction.inventories_archive
          this.construction.current_inventory = construction.current_inventory


          let updatedInventory = construction.inventories_archive.find( inv => inv.year == this.inventory.year)
          if(updatedInventory){
            images = updatedInventory.images
          }else if(construction.current_inventory.year == this.inventory.year){
            images = construction.current_inventory.images
          }

          this.inventory.images = images
        })
        .catch(function (error) {
          console.log(error);
        });

      }else{
        this.markupCurrentStepAsValid()
        this.registerNewInventoryForConstruction()
      }
    },

    updateCurrentInventory(){
      let url = 'constructions/'+this.construction._id+'/inventory/' + this.inventory.year

      let data = this.jsonCopy(this.inventory)

      data.last_edit_author = this.getEditorId()

      data.date_last_modified = new Date().toISOString()

      let req = { url, data }

      axios._put(req)
      .then( res => {
        this.invalidateConstructionsList()
      })
      .catch( error => console.log(error) )
    },


    registerNewInventoryForConstruction(){

      let url = 'constructions/' + this.construction._id + '/inventory'
      let data = this.jsonCopy(this.inventory)

      data.author = this.getEditorId()

      data.date_added = Date.now()

      let req = { url, data }
      axios._post( req )
    .then( res => {
      if(res.data.error){
        alert(res.data.error)
      }else{
        this.$router.push({name: 'construction', params: {id: res.data._id}})
        this.invalidateConstructionsList()
      }

    })
    .catch(err => console.log(err))
    },




    checkIfInventoryYearAlreadyExist(construction, year, alertMsg = true){
      let index = construction.inventories_archive.findIndex(inv => { return inv.year == year } )

      if(index != -1 || construction.current_inventory.year == year){
        if(alertMsg){
          alert("Un inventar cu anul " + year + " exista deja. Te rugam modifica anul.")
        }
        return true
      }
      return false
    },





  }
}

export default editorMixin
