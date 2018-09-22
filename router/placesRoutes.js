const express = require('express'),
      router = express.Router(),
      bodyParser = require('body-parser');

router.use(bodyParser.urlencoded({ extended: false }));
router.use(bodyParser.json());

const User = require('../collectionsMongo/User'),
      Feedback = require('../collectionsMongo/Feedback'),
      Problem = require('../collectionsMongo/Problem'),
      Place = require('../collectionsMongo/Places'),
      VerifyToken = require('../auth/VerifyToken');
      Geodist = require('geodist');

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
});

router.post('/download_places', function (req, res) {

    let userPosition = {lat:req.body.lat,lon:req.body.lng};
    let radius = req.body.radius;
    let type  = req.body.type;
    let shabbat = req.body.shabbat;

    Place.find({},function (err,places) {
        let placesToClient = [];

        if(err){
            console.log(err);
            res.send({message:'Something went wrong'})
        }

        for(let i=0;i<places.length;i++){
            let currPlace = places[i];
            let distance = Geodist(userPosition, {lat: currPlace.lat, lon: currPlace.lng },{unit:'km'});
            if(  distance <= radius/1000  && currPlace.type == type && currPlace.shabbat == shabbat){
                placesToClient.push(places[i])
            };


        }
        res.status(200).send({message:placesToClient});
    })

});
router.get('/get_place', function (req, res) {

    Place.findById(req.headers['uid'], function (err, place) {
        if (err) return res.status(500).send({message:'Error on the server'});
        if (!place) return res.status(404).send({message:'No place found'});
        res.status(200).json({currentPlace:place});
    })
});

module.exports = router;