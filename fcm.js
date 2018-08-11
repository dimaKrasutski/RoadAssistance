// var FCM = require('fcm-push');
// var serverkey = 'AAAAHMAUjrA:APA91bFYw2_60jFAhub-S8796F-7cxo4lBH9iUrNRQOhWg5QcaZXWkT7rwCD0VgPXXcsX-Ane2vGe3homrzjCwKlyW-4GI6hEG0pLZSmVrTGuxyHzWVzVJqWEH-xzzxLzmKu9khcK7HB';
// var fcm = new FCM(serverkey);
// var message = {
//     to : '<insert-device-token>',
//         collapse_key : '<insert-collapse-key>',
//         data : {
//     <random-data-key1> : '<random-data-value1>',
//     <random-data-key2> : '<random-data-value2>'
//     },
//     notification : {
//         title : 'Title of the notification',
//             body : 'Body of the notification
//     }
// };
// fcm.send(message, function(err,response){
//     if(err) {
//         console.log("Something has gone wrong !");
//     } else {
//         console.log("Successfully sent with resposne :",response);
//     }
// });