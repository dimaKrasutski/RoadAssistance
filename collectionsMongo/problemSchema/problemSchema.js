const mongoose = require('mongoose');
const OfferListSchema= require('./offerListSchema');
const DeletedOffers = require('./deletedOffers');

const ProblemSchema = new mongoose.Schema({
    description: {type:String,lowercase:true},
    direction:{type:Number},
    extra:{type:Number},
    lat: {type:Number},
    lng:{type:Number},
    problemType:{type:Number},
    helpingUser:{type:String},
    requestingUser:{type:String},
    offerList:[OfferListSchema],
    // time: Date,
    status: {type: Number},
    deletedOffers:[DeletedOffers]
},{versionKey:false});

module.exports = ProblemSchema;