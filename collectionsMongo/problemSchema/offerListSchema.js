const mongoose = require('mongoose');


const OfferListSchema = new mongoose.Schema({
    answer: {type:Number},
    description: {type:String,lowercase:true},
    helper: {type:String},
    price: {type:Number},
    problemName:{type:String}
});

module.exports=OfferListSchema;