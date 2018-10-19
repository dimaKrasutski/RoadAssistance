const mongoose = require('mongoose');

 const DeletedOffers = new mongoose.Schema({
     answer:0,
     description:String,
     helper:String,
     price: Number,
     problemName: String
 });

 module.exports = DeletedOffers;