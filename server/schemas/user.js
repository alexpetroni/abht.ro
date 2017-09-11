const mongoose = require('mongoose')
const Schema = mongoose.Schema
const ObjectId = Schema.Types.ObjectId

const userSchema = new Schema({
  email: { type : String , unique : true, required : true},
  password: { type : String , required : true } ,
  first_name: String,
  last_name: String,
  status: {type: String, default: 'active'},
  role: {type: String, default: 'editor'},
  last_login: { type: Date, default: Date.now }
})

module.exports = mongoose.model("User", userSchema)
