const mongoose = require('mongoose')
const Schema = mongoose.Schema
const ObjectId = Schema.Types.ObjectId


const adminlocationSchema = new Schema({
  name: String,
  slug: String,
  parent: { type: ObjectId, ref: 'Adminlocation' }
})

module.exports = mongoose.model("Adminlocation", adminlocationSchema)
