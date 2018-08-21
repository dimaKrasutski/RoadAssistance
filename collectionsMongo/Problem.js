var mongoose = require('mongoose');

const MongooseTrigger = require('mongoose-trigger');

var OfferListSchema = new mongoose.Schema({
    answer: Number,
    description: String,
    helper: String,
    price: Number,
    problemName: String
});
const tok = 'd5XVP0kR3xs:APA91bFNmzNUZJs-em2HBzfbHHqHIP2mCvInqAg_K7SnOgmDp2Nr4mERjD2m6Uj_L9z5jN4bVkVWRzOfDPuot8ro6laZWhVbQicWcQMx0qKI6KOXYU_up_FGShEjdV3kaUm6_arqEm6ANvKyqOJHlYaDju63m4nGyA';

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

function sendPushNotifications  (token,key,msg,time) {

    var admin = require("firebase-admin");

    var serviceAccount = require("../road-assistance-1-firebase-adminsdk-j28g9-985a9898cb");

    admin.initializeApp({
        credential: admin.credential.cert(serviceAccount),
        databaseURL: "https://road-assistance-1.firebaseio.com"
    });
    let payLoad = {
        data:{
            key: msg
        }
    };

    let options = {
        priority:"high",
        timeToLive:time
    };

    admin.messaging().sendToDevice(token,payLoad,options).then(function (response) {
        console.log('Success' + '-' +response)
    }).catch(function (error) {
        console.log('Error' +'-' +error)
    });
};


 let key = 'key', message = 'шаломчики';
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
 //ProblemEvents.on('update',data => console.log('[update] says -'+data.helpingUser));
// ProblemEvents.on('create', data => console.log('[create] says:', data));
 ProblemEvents.on('update', data =>compare(data.helpingUser));
// ProblemEvents.on('partial:skills', data => console.log('[partial:skills] says:', data));
// ProblemEvents.on('partial:x', data => console.log('[partial:x] says:', data));
// ProblemEvents.on('remove', data => console.log('[remove] says:', data));
 function compare (info){
     if(info.length>5){
         sendPushNotifications(tok,key,'шаломчики',60*60*24)
     }
 }
 module.exports = mongoose.model('Problem');