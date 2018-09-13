var admin = require("firebase-admin");

var serviceAccount = require("./road-assistance-1-firebase-adminsdk-j28g9-985a9898cb");

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://road-assistance-1.firebaseio.com"
});
module.exports = function (token,msg,uid,lt,lg,direct) {

    let payLoad = {
        data:{
            message: msg,
            myKey: uid,
            lat:lt,
            lng:lg,
            direction: direct
        }
    };

    let options = {
        priority:"high",
        timeToLive:60*60*24
    };

    admin.messaging().sendToDevice(token,payLoad,options).then(function (response) {
        console.log('Success FCM' + '-' +response)
        console.log(JSON.stringify(response))
    }).catch(function (error) {
        console.log('Error FCM' +'-' +error)
    });
}