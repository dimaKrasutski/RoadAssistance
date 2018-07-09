var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');

router.use(bodyParser.urlencoded({ extended: false }));
router.use(bodyParser.json());


var User = require('../collectionsMongo/User');
var Feedback = require('../collectionsMongo/Feedback');
var Problem = require('../collectionsMongo/Problem');

var distanceService = require('google-distance');

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
            helpingUser:"",
            time:new Date(),
            status : 1
        },
        function (err, problem) {
            User.findById(req.body.requestingUser, function (err, user) {
                if (err) return res.status(500).send('Error on the server.');
                if (!user) return res.status(404).send('No user found.');

                user.currentProblem = problem._id;

                user.save(function (err, updatedUser) {
                    if (err) return "Error Motherfucker!"
                })
            if (err) return res.status(500).send(err);
            res.status(200).json({message:"Problem Added",uid:problem._id})
        });

});
    
    });

router.post('/problem_cancel',VerifyToken,function (req,res) {

    User.findById(req.body.uid, function (err, user) {
        if (err) return res.status(500).send('Error on the server.');
        if (!user) return res.status(404).send('No user found.');

        user.currentProblem = "";

        user.save(function (err, updatedUser) {
            if (err) return "Error Motherfucker!"
        })

        Problem.findById(req.body.problemUid, function (err, problem) {
            if (problem.helpingUser !== "") {
                User.findById(problem.helpingUser, function (err, user) {
                    user.currentState['currentSolvingProblem'] = ''
                })
            }
        });

        Problem.findByIdAndRemove(req.body.problemUid, function (err, problem) {
            if (err) return res.status(500).send('Error on the server.');
            if (!user) return res.status(404).send('Problem user found.');

            res.status(200).json({message: 'Problem Cancelled'})
        })


    });
});

    router.post('/problem_done', VerifyToken,function (req, res) {
        let problemUid =  req.body.problemUid;
        let requesting,helping =0;

        Problem.findById(problemUid, function (err, problem) {
            helping = problem.helpingUser;
            requesting = problem.requestingUser;

            problem.status = - 1;
            problem.save(function (err) {
                if (err) return "Error!";
            });

            User.findById(requesting, function (err, user) {
                if (err) return res.status(500).send('Error on the server 1');
                if (!user) return res.status(404).send('No user found 1');

                user.currentState = '';
                user.currentProblem = '';
                user.history.historyProblems.push(problemUid);
                user.save(function (err, updatedUser) {
                    if (err) return "Error!";
                })
            });

            User.findById(helping, function (err, user) {
                if (err) return res.status(500).send('Error on the server 2');

                if (!user) return res.status(404).send('No user found 2');

                user.currentState = '';
                user.history.historyHelps.push(problemUid);

                user.save(function (err, updatedUser) {
                    if (err) return "Error!";
                    res.status(200).send({message: "Problem done!"});
                })
            });
        });
    });


router.post('/download_problems', VerifyToken,function (req, res) {

var dist;


   // Problem.find({},function (err,problems) {

         //  let userLat = req.body.lat;
          // let userLng = req.body.lng;
           // let radius = req.body.radius;
           // var problemsToClient = [];
          // let types = [] = req.body.types;
          //        if(err){
          //            res.send('Something went wrong')
          //        }
          //         for(let i=0;i<problems.length;i++){
          //            let currentProblem = problems[i];
          //         if( findDistance(userLat,userLng,currentProblem.lat,currentProblem.lng) * 1000 <= radius  ){
          //             problemsToClient.push(currentProblem)
          //         }
          //         }
          //        res.status(200).send(problemsToClient);
          //
          //    })

    // findDistance(31.771959,35.217018);

   var x =  function  (coordLat,coordLng){

        distanceService.get(
            {
                index: 1,
                origin: '32.109333,34.855499 ',
                destination: coordLat,coordLng
            },
            function(err, data) {
                if (err) return console.log(err);
                dist = data.distance;
            });
        return dist
    }

    res.status(200).send( x(31.771959,35.217018))

});
module.exports = router;




