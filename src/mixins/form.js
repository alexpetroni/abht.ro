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
      if(value == undefined) value = ''
      return Validator.value(value).required("Camp obligatoriu")
    },

    validatePositiveInteger(value){
      if(value == undefined) value = ''
      return Validator.value(value).required().regex(/^(0|[1-9]\d?)$/, 'Introduceti nr. intreg')
    },

    validatePositiveNumber(value){
      if(value == undefined) value = ''
      return Validator.value(value).required().regex(/^\d+([.]\d+)?$/, 'Introduceti nr. pozitiv')
    },

    validatePositiveNumberGtZero(value){
      if(value == undefined) value = ''
      return Validator.value(value).required().regex(/^([1-9]\d*([.]\d+)?|0\.\d+)$/, 'Introduceti nr. mai mare decat 0')
    },

    validateLatitudeCoordDeg(value){
      if(value == undefined) value = ''
      return Validator.value(value).required().between(0, 180, 'Introduceti numar intre 0 si 180')
    },

    validateLatitudeCoordMin(value){
      if(value == undefined) value = ''
      return Validator.value(value).required().between(0, 59, 'Introduceti numar intre 0 si 59')
    },

    validateLatitudeCoordSec(value){
      if(value == undefined) value = ''
      return Validator.value(value).required().between(0, 59.9, 'Introduceti numar intre 0 si 59.9')
    },

    validatePercent(value){
      if(value == undefined) value = ''
      return Validator.value(value).required().between(0, 100, 'Introduceti numar intre 0 si 100')
    },

    validate1To5(value){
      if(value == undefined) value = ''
      return Validator.value(value).required().regex(/[1-5]/)
    },

    validateYear(value){
      if(value == undefined) value = ''
      return Validator.value(value).required().regex(/^(19|20)\d{2}$/, 'Introduceti un an valid')
    }

  }

}

export default formMixin
