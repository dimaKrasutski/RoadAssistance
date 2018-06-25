var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');

router.use(bodyParser.urlencoded({ extended: false }));
router.use(bodyParser.json());

var User = require('../collectionsMongo/User');
var Feedback = require('../collectionsMongo/Feedback');
var Problem = require('../collectionsMongo/Problem');

var VerifyToken = require('../auth/VerifyToken');

router.post('/create_problem',VerifyToken,function (req,res) {

    Problem.create({
            description: req.body.description,
            direction:req.body.direction,
            extra:req.body.extra,
            lat: req.body.lat,
            lng:req.body.lng,
            problemType:req.body.problemType,
            requestingUser:req.body.requestingUser,
            time:new Date()

        },
        function (err, problem) {
            console.log(err);
            console.log(problem);
            if (err) return res.status(500).send(err);
            res.status(200).json({message:"Problem Added",uid:problem._id})
        });

});

module.exports = router;