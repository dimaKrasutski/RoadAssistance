const mongoose = require('mongoose');

const OfferListSchema = require('./problemSchema/offerListSchema');
const ProblemSchema = require('./problemSchema/problemSchema');
const DeletedOffers = require('./problemSchema/deletedOffers');

mongoose.model('DeletedOffers',DeletedOffers);
mongoose.model('OfferList',OfferListSchema);
mongoose.model("Problem",ProblemSchema);


 module.exports = mongoose.model('Problem');