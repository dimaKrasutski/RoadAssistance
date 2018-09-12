var admin = require("firebase-admin");

var serviceAccount = require("./road-assistance-1-firebase-adminsdk-j28g9-985a9898cb");

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://road-assistance-1.firebaseio.com"
});
module.exports = function (token,msg,uid) {

    let payLoad = {
        data:{
            message: msg,
            myKey: uid,
            image: "https://www.google.by/url?sa=i&rct=j&q=&esrc=s&source=images&cd=&cad=rja&uact=8&ved=2ahUKEwja2o_AmrbdAhXR1qQKHfaWBx4QjRx6BAgBEAU&url=https%3A%2F%2Fwww.vanityfair.com%2Fnews%2Fpolitics%2F2012%2F07%2Fbenjamin-netanyahu-on-israel-mitt-romney&psig=AOvVaw1pKLemwa2o4-9tFKqM2Smh&ust=1536867162318679"
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