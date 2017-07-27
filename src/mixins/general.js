const generalMixin = {
  methods: {

    jsonCopy(obj){
      return JSON.parse(JSON.stringify(obj))
    },

  }

}

export default generalMixin
