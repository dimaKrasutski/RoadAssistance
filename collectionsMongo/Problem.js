const mongoose = require('mongoose');

const OfferListSchema = require('./schema/offerListSchema');
const ProblemSchema = require('./schema/problemSchema');
const DeletedOffers = require('./schema/deletedOffers');

mongoose.model('DeletedOffers',DeletedOffers);
mongoose.model('OfferList',OfferListSchema);
mongoose.model("Problem",ProblemSchema);



 module.exports = mongoose.model('Problem');