const Mongoose = require('mongoose');

const OfferListSchema = require('./problemSchema/offerListSchema');
const ProblemSchema = require('./problemSchema/problemSchema');
const DeletedOffers = require('./problemSchema/deletedOffers');

Mongoose.model('DeletedOffers',DeletedOffers);
Mongoose.model('OfferList',OfferListSchema);
Mongoose.model("Problem",ProblemSchema);


 module.exports = Mongoose.model('Problem');