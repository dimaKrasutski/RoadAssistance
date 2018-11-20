const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const offerList = require('./OfferList');
const deletedOffers = require('./DeletedOffer');

const ProblemSchema = new Schema({
  description: {type:String,lowercase:true},
  direction:{type:Number},
  extra:{type:Number},
  lat: {type:Number},
  lng:{type:Number},
  problemType:{type:Number},
  helpingUser:{type:String},
  requestingUser:{type:String},
  status: {type: Number},
  deletedOffers:[deletedOffers],
  offerList:[offerList]
},{versionKey:false});

module.exports = Problem = mongoose.model('problems',ProblemSchema);
