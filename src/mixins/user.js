const userMixin = {
  methods: {
    getNewUser: function(){
      return {
        _id: '',
        email: '',
        first_name: '',
        last_name: '',
        password: '',
      }
    }
  }

}

export default userMixin
