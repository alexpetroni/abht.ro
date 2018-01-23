const mongoose = require('mongoose')
const Schema = mongoose.Schema
const ObjectId = Schema.Types.ObjectId


const cadastralSchema = new Schema({
  name: String,
  slug: String,
  order: Number,
  parent: { type: ObjectId, ref: 'Cadastral' },
  ancestors: [ {type: ObjectId, ref: 'Cadastral'} ],
  breadcrumb: String
})

module.exports = mongoose.model("Cadastral", cadastralSchema)
