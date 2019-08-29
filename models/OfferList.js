const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const OfferListSchema = new Schema({
  answer: {type:Number},
  description: {type:String,lowercase:true},
  helper: {type:String},
  price: {type:Number},
  problemName:{type:String}
},{versionKey:false});

module.exports = OfferListSchema