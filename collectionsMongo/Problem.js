var mongoose = require('mongoose');

var ProblemSchema = new mongoose.Schema({
         description: String,
         direction:Number,
         extra:Number,
         lat: Number,
         lng:Number,
         problemType:Number,
         helpingUser:String,
         status: Number,
         requestingUser:String,
         time: Date,
    offerList:[{},{}]

},{versionKey:false});
mongoose.model("Problem",ProblemSchema);

module.exports = mongoose.model('Problem');