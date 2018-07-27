var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');

router.use(bodyParser.urlencoded({ extended: false }));
router.use(bodyParser.json());

var User = require('../collectionsMongo/User');
var Feedback = require('../collectionsMongo/Feedback');
var Problem = require('../collectionsMongo/Problem');
var Place = require('../collectionsMongo/Places');
var geodist = require('geodist');

var VerifyToken = require('../auth/VerifyToken');

router.post('/create_feedback',function (req,res) {

    Feedback.create({
            role:req.body.role,
            problemUid:req.body.problemUid,
            userMain:req.body.userMain,
            userAbout:req.body.userAbout,
            content:req.body.content,
            rating:req.body.rating,
            time:new Date()
        },
        function (err, fb) {
            console.log(err);
            if (err) return res.status(500).send(err);
            res.status(200).json({message:"Feedback Added",uid:fb._id})
        });

});
router.post('/get_feedbacks', function (req, res) {

    var fbs = [];

    Feedback.find({}, function (err, feedback) {
        if (err) return res.status(500).send('Error on the server.');
        if (!feedback) return res.status(404).send('No feedback found.');

        for (let i=0;i<feedback.length;i++){
            if(req.body.uid == feedback[i].userAbout )
                fbs.push(feedback[i])
        }
        res.status(200).send(fbs);
    });
})
router.post('/create_new_place',function (req,res) {


    Place.create({

        address: req.body.address,
        email:req.body.email,
        lat: req.body.lat,
        lng:req.body.lng,
        name:req.body.name,
        phone:req.body.phone,
        rating: '',
        shabbat:req.body.shabbat,
        type: req.body.type,
        workTime:req.body.workTime

    },
        function (err, place) {
            console.log(err);
            if (err) return res.status(500).send(err);
            res.status(200).json({message: "Place Added", uid: place._id})
        });
})
router.post('/download_places', function (req, res) {

    let userPosition = {lat:req.body.lat,lon:req.body.lng};
    let radius = req.body.radius;
    let type  = req.body.type;
    let shabbat = req.body.shabbat;

    Place.find({},function (err,places) {
        var placesToClient = [];

        if(err){
            console.log(err);
            res.send('Something went wrong')
        }

        for(let i=0;i<places.length;i++){
            let currPlace = places[i];
            let distance = geodist(userPosition, {lat: currPlace.lat, lon: currPlace.lng },{unit:'km'});
            if(  distance <= radius/1000  && currPlace.type == type && currPlace.shabbat == shabbat){
                placesToClient.push(places[i])
            };
            res.status(200).send(places);

        }
    })

});
router.get('/get_place', function (req, res) {

    Place.findById(req.headers['uid'], function (err, place) {
        if (err) return res.status(500).send('Error on the server.');
        if (!place) return res.status(404).send('No place found.');
        res.status(200).json({currentPlace:place});
    })
})

module.exports = router;