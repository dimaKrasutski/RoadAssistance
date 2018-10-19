const mongoose = require('mongoose');


const OfferListSchema = new mongoose.Schema({
    answer: Number,
    description: String,
    helper: String,
    price: Number,
    problemName: String
});

module.exports=OfferListSchema;