const mongoose = require('mongoose')
const Schema = mongoose.Schema
const ObjectId = Schema.Types.ObjectId


const Adminlocation = require('./schemas/adminlocation')
const Cadastral = require('./schemas/cadastral')

const construction = require('./schemas/construction')
const inventory = require('./schemas/inventory')

const Construction = construction.Construction
const LongitudinalConstruction = construction.LongitudinalConstruction
const TransversalConstruction = construction.TransversalConstruction

const Inventory = inventory.Inventory

const User = require('./schemas/user')


// mongoose.connect('mongodb://abht:SteelTape3@localhost:27017/abhtro')
//
// const db = mongoose.connection
//
// db.on('error', function(){
//   console.log('Database connection error')
// })
//
// db.on('open', function(){
//     console.log('The database has connected.')
// })


mongoose.Promise = global.Promise;

// Connect to MongoDB on localhost:27017
mongoose.connect('mongodb://localhost:27017/abhtro',
{
    "useMongoClient": true
});


const Models = {
  Construction,
  LongitudinalConstruction,
  TransversalConstruction,
  Inventory,
  Adminlocation,
  Cadastral,
  User
}

module.exports = Models
