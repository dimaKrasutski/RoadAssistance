var mongoose = require('mongoose');

var PlacesSchema = new mongoose.Schema({
    address: String,
    email:String,
    lat: Number,
    lng:Number,
    name:String,
    phone:String,
    rating: Number,
    shabbat:String,
    type: Number,
    workTime:String,
});

mongoose.model("Places",PlacesSchema);

module.exports = mongoose.model('Places');