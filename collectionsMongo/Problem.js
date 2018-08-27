const mongoose = require('mongoose');


const OfferListSchema = require('./schema/offerListSchema');
const ProblemSchema = require('./schema/problemSchema');
const DeletedOffers = require('./schema/deletedOffers');

mongoose.model('DeletedOffers',DeletedOffers);
mongoose.model('OfferList',OfferListSchema);
mongoose.model("Problem",ProblemSchema);

const MongooseTrigger = require('mongoose-trigger');

const tok = 'd5XVP0kR3xs:APA91bFNmzNUZJs-em2HBzfbHHqHIP2mCvInqAg_K7SnOgmDp2Nr4mERjD2m6Uj_L9z5jN4bVkVWRzOfDPuot8ro6laZWhVbQicWcQMx0qKI6KOXYU_up_FGShEjdV3kaUm6_arqEm6ANvKyqOJHlYaDju63m4nGyA';


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
            populate: 'offerList'
        },
        remove:{
            populate:'offerList',
            triggers: 'offerList',
            select:'offerList'
        }
    },
    debug: false
});

 //ProblemEvents.on('remove', data =>compare(data.helpingUser));
ProblemEvents.on('remove', data=>console.log(data.offerList));
//ProblemEvents.on('remove',data=>compare())
//ProblemEvents.on('update',data=>console.log(data.offerList));
 
function offerDeleted() {
    
}
 function compare (info){
     if(info.length != undefined){
     if(info.length>5){
         sendPushNotifications(tok,key,message,60*60*24)
     }
     }
 }



 module.exports = mongoose.model('Problem');