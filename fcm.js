

const gcm = require('node-gcm');


var message = new gcm.Message({
    collapseKey: 'demo',
    priority: 'high',
    contentAvailable: true,
    delayWhileIdle: true,
    timeToLive: 3,
    restrictedPackageName: "somePackageName",
    dryRun: true,
    data: {
        key1: 'message1',
        key2: 'message2'
    },
    notification: {
        title: "Hello, Igor",
        icon: "ic_launcher",
        body: 'It is our first fcm notification Yoffi!!!!!!!!'
    }
});

// Set up the sender with you API key
var sender = new gcm.Sender('AAAAHMAUjrA:APA91bFYw2_60jFAhub-S8796F-7cxo4lBH9iUrNRQOhWg5QcaZXWkT7rwCD0VgPXXcsX-Ane2vGe3homrzjCwKlyW-4GI6hEG0pLZSmVrTGuxyHzWVzVJqWEH-xzzxLzmKu9khcK7HB');

// Add the registration tokens of the devices you want to send to
var registrationTokens = [];
registrationTokens.push('d5XVP0kR3xs:APA91bFNmzNUZJs-em2HBzfbHHqHIP2mCvInqAg_K7SnOgmDp2Nr4mERjD2m6Uj_' +
    'L9z5jN4bVkVWRzOfDPuot8ro6laZWhVbQicWcQMx0qKI6KOXYU_up_FGShEjdV3kaUm6_arqEm6ANvKyqOJHlYaDju63m4nGyA');


sender.sendNoRetry(message, { registrationTokens: registrationTokens }, function(err, response) {
    if(err) console.error(err);
    else    console.log(response);
});

// ... or retrying
sender.send(message, { registrationTokens: registrationTokens }, function (err, response) {
    if(err) console.error(err);
    else    console.log(response);
});

// ... or retrying a specific number of times (10)
sender.send(message, { registrationTokens: registrationTokens }, 10, function (err, response) {
    if(err) console.error(err);
    else    console.log(response);
});



 // let FCM = require('fcm-push');
 // let serverkey = 'AAAAHMAUjrA:APA91bFYw2_60jFAhub-S8796F-7cxo4lBH9iUrNRQOhWg5QcaZXWkT7rwCD0VgPXXcsX-Ane2vGe3homrzjCwKlyW-4GI6hEG0pLZSmVrTGuxyHzWVzVJqWEH-xzzxLzmKu9khcK7HB';
 // let fcm = new FCM(serverkey);
 // let message = {
 //     to : 'd5XVP0kR3xs:APA91bFNmzNUZJs-em2HBzfbHHqHIP2mCvInqAg_K7SnOgmDp2Nr4mERjD2m6Uj_' +
//     'L9z5jN4bVkVWRzOfDPuot8ro6laZWhVbQicWcQMx0qKI6KOXYU_up_FGShEjdV3kaUm6_arqEm6ANvKyqOJHlYaDju63m4nGyA',
 //         collapse_key : 'smth',
 //         data : {
 //     <weather> : '<Good weather today>',
 //
 //     },
 //     notification : {
 //            title : 'Road Assistance',
 //             body : 'Hello everyone'
 //     }
 // };
 // fcm.send(message, function(err,response){
 //     if(err) {
 //         console.log("Something has gone wrong !");
 //     } else {
 //         console.log("Successfully sent with resposne :",response);
 //     }
 // });