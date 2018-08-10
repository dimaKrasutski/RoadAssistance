var mongoose = require('mongoose');
const MongooseTrigger = require('mongoose-trigger');

var OfferListSchema = new mongoose.Schema({

    answer: Number,
    description: String,
    helper: String,
    price: Number,
    problemName: String

});

mongoose.model('OfferList',OfferListSchema);

 const ProblemEvents = MongooseTrigger(ProblemSchema, {
     events: {

         debug: false
     }});

 ProblemEvents.on('update', data => console.log('[update] says:', data));


    var ProblemSchema = new mongoose.Schema({
         description: String,
         direction:Number,
         extra:Number,
         lat: Number,
         lng:Number,
         problemType:Number,
         helpingUser:String,
        requestingUser:String,
        offerList:[OfferListSchema],
         time: Date,
        status: Number,

},{versionKey:false});

mongoose.model("Problem",ProblemSchema);

 module.exports = mongoose.model('Problem');