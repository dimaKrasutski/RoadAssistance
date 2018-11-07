const mongoose = require('mongoose');

 const DeletedOffers = new mongoose.Schema({
     answer:0,
     description:{type:String,lowercase:true},
     helper:{type:String},
     price: {type:Number},
     problemName: {type:String}
 });

 module.exports = DeletedOffers;