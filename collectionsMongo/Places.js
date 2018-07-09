var mongoose = require('mongoose');

var PlaceSchema = new mongoose.Schema({
    address: String,
    email:Number,
    lat: Number,
    lng:Number,
    name:String,
    phone:String,
    rating: Number,
    shabbat:Boolean,
    type: Number,
    workTime:String

},{versionKey:false});
mongoose.model("Places",PlaceSchema);

module.exports = mongoose.model('Places');