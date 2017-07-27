const formGeneralMixin = {
  methods: {

    markupCurrentStepAsValid(){
      if(this.formState.steps && this.formState.currentIndex != undefined){
        let currentIndex = this.formState.currentIndex
        if(this.formState.steps[currentIndex]){
          this.formState.steps[currentIndex].status = 'valid'
        }
      }
    },


    // stepsIndexes can be int or an array of integers with the formState.steps indexes that will be marked as invalid
    markupStepsAsInvalid(stepsIndexes){
      if(this.formState && this.formState.steps){
        if(!Array.isArray(stepsIndexes)){
          stepsIndexes = [stepsIndexes]
        }

        for(let i = 0; i < stepsIndexes.length; i++){
          let index = parseInt(stepsIndexes[i])
          if(this.formState.steps[index] != undefined){
            if(this.formState.steps[index].status != 'pristine'){ // a pristine step cannot be set as invalid
              this.formState.steps[index].status = 'invalid'
            }
          }
        }
      }
    },


    showFormStep(index){
      this.formState.currentIndex = index
    },


    showNextFormStep(){
      let currentIndex = this.formState.currentIndex;
      if(currentIndex != undefined && this.formState.steps[currentIndex+1]){
        this.showFormStep(currentIndex+1)
      }

      return false
    },


  }

}

export default formGeneralMixin
