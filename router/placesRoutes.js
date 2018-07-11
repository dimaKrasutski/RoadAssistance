var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');

router.use(bodyParser.urlencoded({ extended: false }));
router.use(bodyParser.json());


var User = require('../collectionsMongo/User');
var Feedback = require('../collectionsMongo/Feedback');
var Problem = require('../collectionsMongo/Problem');
var Places = require('../collectionsMongo/Places');
var geodist = require('geodist');

var VerifyToken = require('../auth/VerifyToken');



// router.post('/download_places', function (req, res) {
//
//     let userPosition = {lat:req.body.lat,lon:req.body.lng}; let radius = req.body.radius;
//     let type  = req.body.type; let shabbat = req.body.shabbat;
//     Place.find({},function (err,places) {
//
//         var placesToClient = [];
//         if(err){
//             res.send('Something went wrong')
//         }
//         for(let i=0;i<places.length;i++){
//             let currPlace = places[i];
//             let distance = geodist(userPosition, {lat: currPlace.lat, lon: currPlace.lng },{unit:'km'});
//             if(  distance <= radius/1000  && currPlace.type == type && currPlace.shabbat == shabbat){
//                 placesToClient.push(places[i])
//             }
//         }
//         res.status(200).send(placesToClient);
//     });
// });

module.exports = router;
