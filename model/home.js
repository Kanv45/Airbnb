const mongoose = require('mongoose')
const homeSchema = mongoose.Schema({
  username:{type: String , required:true},
  price:{type: Number , required:true},
  rating:{type: Number , required:true},
  location:{type: String , required:true},
})
module.exports= mongoose.model("Home",homeSchema)