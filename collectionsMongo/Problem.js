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

const ProblemEvents = MongooseTrigger(ProblemSchema, {
    events: {
        create: {
            select: 'email skills',
            populate: {
                path: 'skills',
                select: 'name'
            }
        },
        update: {
            populate: 'skills'
        },
        remove:{
            populate:"skills"
        }
    },
    partials: [
        {
            eventName: 'custom_event',
            triggers: 'name',
            select: 'name email',
            populate: 'something' //if it is a reference...
        }
    ],
    debug: false
});

ProblemEvents.on('create', data => console.log('[create] says:', data));
ProblemEvents.on('update', data => console.log('[update] says:', data.offerList));
ProblemEvents.on('partial:skills', data => console.log('[partial:skills] says:', data));
ProblemEvents.on('partial:x', data => console.log('[partial:x] says:', data));
ProblemEvents.on('remove', data => console.log('[remove] says:', data));


 module.exports = mongoose.model('Problem');