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
            time:new Date(),
            helpingUser:"",
            status : ""
        },
        function (err, problem) {
            console.log(err);
            console.log(problem);
            if (err) return res.status(500).send(err);
            res.status(200).json({message:"Problem Added",uid:problem._id})
        });

});

router.post('/problem_cancel',VerifyToken,function (req,res) {

    User.findById(req.body.userUid, function (err, user) {
        if (err) return res.status(500).send('Error on the server.');
        if (!user) return res.status(404).send('No user found.');

        user.currentProblem = "";

        user.save(function (err,updatedUser) {
            if(err) return "Error!";
        })

    });
    Problem.findById(req.body.problemUid,function (err,problem) {
        if(problem.helpingUser !== ""){
            User.findById(problem.helpingUser,function (err,user) {
                 user.currentState['currentSolvingProblem'] = ''
            })
        }
    })
    Problem.findByIdRemove(req.body.problemUid,function (err,problem) {
        if (err) return res.status(500).send('Error on the server.');
        if (!user) return res.status(404).send('Problem user found.');
    })

});


module.exports = router;