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

    validateRequired(value){
        return Validator.value(value).required("Camp obligatoriu")
    },

    validatePositiveInteger(value){
      return Validator.value(value).required().regex(/^(0|[1-9]\d?)$/, 'Introduceti nr. intreg')
    },

    validatePositiveNumber(value){
      return Validator.value(value).required().regex(/^\d+([.]\d+)?$/, 'Introduceti nr. pozitiv')
    },

    validatePositiveNumberGtZero(value){
      return Validator.value(value).required().regex(/^([1-9]\d?([.]\d+)?|0\.\d+)$/, 'Introduceti nr. mai mare decat 0')
    },

    validateLatitudeLongitude(value){
      return Validator.value(value).required().regex(/^\d+\.\d{4,}?$/, 'Introduceti valoare coordonata valida')
    },

    validatePercent(value){
      return Validator.value(value).required().between(0, 100, 'Introduceti numar intre 0 si 100')
    },

    validate1To5(value){
      return Validator.value(value).required().in(['1', '2', '3', '4', '5'])
    },

    validateYear(value){
      return Validator.value(value).required().regex(/^(19|20)\d{2}$/, 'Introduceti un an valid')
    }

  }

}

export default formMixin
