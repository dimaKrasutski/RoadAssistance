const express = require('express'),
      router = express.Router(),
      bodyParser = require('body-parser');

router.use(bodyParser.urlencoded({ extended: false }));
router.use(bodyParser.json());

const User = require('../collectionsMongo/User'),
      Feedback = require('../collectionsMongo/Feedback'),
      Problem = require('../collectionsMongo/Problem'),
      Places = require('../collectionsMongo/Places'),
      VerifyToken = require('../auth/VerifyToken');
      Geodist = require('geodist');

router.post('/create_new_place',function (req,res) {


    Places.create({

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

    const userPosition = {lat:req.body.lat,lon:req.body.lng},
        radius = req.body.radius,
        type  =[]= req.body.type.split(','),
        shabbat = String(req.body.shabbat);

              Places.find({},function (err,places) {
                  let placesToClient = [];
                  if (err) {
                      console.log(err);
                      res.send({message: 'Something went wrong'})
                  }

                  if (shabbat === 'true') {
                      for (let i = 0; i < places.length; i++) {

                          let currPlace = places[i];
                          const distance = Geodist(userPosition, {lat: currPlace.lat, lon: currPlace.lng}, {unit: 'km'});
                          if (distance <= radius / 1000 && String(places[i].shabbat) === 'true' ) {
                              for (let i = 0; i < type.length; i++) {
                                  if (type[i] == currPlace.type ) {
                                      placesToClient.push(currPlace);

                                  }
                              }
                          }
                      }
                  } else  {

                      for (let i = 0; i < places.length; i++) {
                          let currPlace = places[i];
                          const distance = Geodist(userPosition, {lat: currPlace.lat, lon: currPlace.lng}, {unit: 'km'});
                          if (distance <= radius / 1000) {
                              for (let i = 0; i < type.length; i++) {
                                  if (type[i] == currPlace.type) {
                                      placesToClient.push(currPlace);
                                  }
                              }
                          }
                      }
                  }
                  res.status(200).send(placesToClient);
              })
});


router.get('/get_place', function (req, res) {

    Places.findById(req.headers['uid'], function (err, place) {
        if (err) return res.status(500).send({message:'Error on the server'});
        if (!place) return res.status(404).send({message:'No place found'});
        res.status(200).json({currentPlace:place});
    })
});

module.exports = router;

