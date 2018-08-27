var mongoose = require('mongoose');

 let DeletedOffers = new mongoose.Schema({
     answer:0,
     description:String,
     helper:String,
     price: Number,
     problemName: String
 });

 module.exports = DeletedOffers;