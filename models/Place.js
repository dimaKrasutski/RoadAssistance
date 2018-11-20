const mongoose = require('mongoose');

const PlaceSchema = new mongoose.Schema({
    address: { type:String},
    email:{type:String,lowercase:true},
    lat: {type:Number},
    lng:{type:Number},
    name:{type:String},
    phone:{type:String,lowercase:true},
    rating:{type: Number},
    shabbat:{type:Boolean},
    type: {type:Number,max:11},
    workTime:{type:String},
},{versionKey:false});

const Place = mongoose.model("Places",PlaceSchema);

module.exports = Place;