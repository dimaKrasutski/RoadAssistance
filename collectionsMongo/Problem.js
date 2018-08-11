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

 // const ProblemEvents = MongooseTrigger(OfferListSchema, {
 //     partials: [
 //         {
 //             eventName: 'custom_',
 //             triggers: 'name email',
 //             select: 'email',
 //             populate: 'something'
 //         }
 //     ]
 //     });
 //
 // ProblemEvents.on('update', problem => console.log('[update] says:', problem.offerList));
 // ProblemEvents.on('remove', problem => console.log('[remove] says:', problem.offerList));

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