



//  'd5XVP0kR3xs:APA91bFNmzNUZJs-em2HBzfbHHqHIP2mCvInqAg_K7SnOgmDp2Nr4mERjD2m6Uj_L9z5jN4bVkVWRzOfDPuot8ro6laZWhVbQicWcQMx0qKI6KOXYU_up_FGShEjdV3kaUm6_arqEm6ANvKyqOJHlYaDju63m4nGyA';
//  function sendPushNotification(token,key,msg,time) {
//     let payLoad = {
//         data:{
//             key: msg
//         }
//     };
//
//     let options = {
//         priority:"high",
//         timeToLive:time
//     };
//
//     admin.messaging().sendToDevice(token,payLoad,options).then(function (response) {
//         console.log('Success' + '-' +response)
//     }).catch(function (error) {
//         console.log('Error' +'-' +error)
//     });
// }

// module.exports.sendPushNotifications = function (token,key,msg,time) {
//
//     var admin = require("firebase-admin");
//
//     var serviceAccount = require("./road-assistance-1-firebase-adminsdk-j28g9-985a9898cb");
//
//     admin.initializeApp({
//         credential: admin.credential.cert(serviceAccount),
//         databaseURL: "https://road-assistance-1.firebaseio.com"
//     });
//     let payLoad = {
//         data:{
//             key: msg
//         }
//     };
//
//     let options = {
//         priority:"high",
//         timeToLive:time
//     };
//
//     admin.messaging().sendToDevice(token,payLoad,options).then(function (response) {
//         console.log('Success' + '-' +response)
//     }).catch(function (error) {
//         console.log('Error' +'-' +error)
//     });
// };
//
