
module.exports = function (token,msg,uid) {
    var admin = require("firebase-admin");

    var serviceAccount = require("./road-assistance-1-firebase-adminsdk-j28g9-985a9898cb");

    admin.initializeApp({
        credential: admin.credential.cert(serviceAccount),
        databaseURL: "https://road-assistance-1.firebaseio.com"
    });
    let payLoad = {
        data:{
            message: msg,
            myKey: uid
        }
    };

    let options = {
        priority:"high",
        timeToLive:60*60*24
    };

    admin.messaging().sendToDevice(token,payLoad,options).then(function (response) {
        console.log('Success FCM' + '-' +response)
    }).catch(function (error) {
        console.log('Error FCM' +'-' +error)
    });
}