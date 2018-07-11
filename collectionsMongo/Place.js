var mongoose = require('mongoose');

var PlaceSchema = new mongoose.Schema({
    address: String,
    email:String,
    lat: Number,
    lng:Number,
    name:String,
    phone:String,
    rating: Number,
    shabbat:Boolean,
    type: Number,
    workTime:String

},{versionKey:false});
mongoose.model("Place",PlaceSchema);

module.exports = mongoose.model('Place');