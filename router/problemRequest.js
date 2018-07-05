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
})

    router.post('/problem_done', VerifyToken,function (req, res) {
        let problemUid =  req.body.problemUid;
        let requesting,helping =0;

        Problem.findById(problemUid, function (err, problem) {
            helping = problem.helpingUser;
            requesting = problem.requestingUser;

            problem.status = - 1;
            User.findById(requesting, function (err, user) {
                if (err) return res.status(500).send('Error on the server 1');
                if (!user) return res.status(404).send('No user found 1');

                user.currentState = '';
                user.history.historyProblems.push(problemUid);
                user.save(function (err, updatedUser) {
                    if (err) return "Error!";
                })
            });

            User.findById(helping, function (err, user) {
                if (err) return res.status(500).send('Error on the server 2'), res.send(err);
                if (!user) return res.status(404).send('No user found 2');

                user.currentState = '';
                user.history.historyHelps.push(problemUid);

                user.save(function (err, updatedUser) {
                    if (err) return "Error!";
                })

            });
            problem.save(function (err) {
                if (err) return "Error!";
                res.status(200).send({message: "Problem done!"});
            })
        });





    });


module.exports = router;
