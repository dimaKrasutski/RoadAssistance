const mongoose = require('mongoose');
const OfferListSchema= require('./offerListSchema');
const DeletedOffers = require('./deletedOffers');

const ProblemSchema = new mongoose.Schema({
    description: String,
    direction:Number,
    extra:Number,
    lat: Number,
    lng:Number,
    problemType:Number,
    helpingUser:String,
    requestingUser:String,
    offerList:[OfferListSchema],
    // time: Date,
    status: Number,
    deletedOffers:[DeletedOffers]
},{versionKey:false});

module.exports = ProblemSchema;