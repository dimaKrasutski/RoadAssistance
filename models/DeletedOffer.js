const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const DeletedOfferSchema = new Schema({
  answer:0,
  description:{type:String,lowercase:true},
  helper:{type:String},
  price: {type:Number},
  problemName: {type:String}
},{versionKey:false});

module.exports = DeletedOfferSchema