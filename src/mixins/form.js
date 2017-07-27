import SimpleVueValidation from 'simple-vue-validator'
const Validator = SimpleVueValidation.Validator

const formMixin = {
  data() {
    return {
      validForm: true
    }
  },

  methods: {

    showInvalidFormMessage(){
      this.validForm = false
      setTimeout(this.hideInvalidFormMessage, 2000)
    },

    hideInvalidFormMessage(){
      this.validForm = true
    },

    validatePositiveInteger(value){
      return Validator.value(value).required().regex(/^\d+$/, 'Numar intreg.')
    },

    validatePositiveNumber(value){
      return Validator.value(value).required().regex(/^\d+([.]\d+)?$/, 'Numar pozitiv.')
    },

    validatePercent(value){
      return Validator.value(value).required().between(0, 100)
    },

    validate1To5(value){
      return Validator.value(value).required().in(['1', '2', '3', '4', '5'])
    },

  }

}

export default formMixin
