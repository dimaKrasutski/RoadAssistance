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
        // time: Date,
        status: Number,

},{versionKey:false});

mongoose.model("Problem",ProblemSchema);

const ProblemEvents = MongooseTrigger(OfferListSchema, {
    events: {
        remove: {
            select: 'offerList',
           // populate: 'something'
        }
    }
});

ProblemEvents.on('remove', problem => console.log('[remove] says:', problem));


 module.exports = mongoose.model('Problem');