var mongoose = require('mongoose');

var ProblemSchema = new mongoose.Schema({
         description: String,
         direction:Number,
         extra:Number,
         lat: Number,
         lng:Number,
         problemType:Number,
         requestingUser:String,
         time: Date

});
mongoose.model("Problem",ProblemSchema);

module.exports = mongoose.model('Problem');