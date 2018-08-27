var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
var mongoose = require('mongoose');

router.use(bodyParser.urlencoded({ extended: false }));
router.use(bodyParser.json()); // парсит тело только тех запросов, для которых 'Content-Type' равен 'application/json', Результат парсинга сохраняется в объекте req.body

var User = require('../collectionsMongo/User');
var Feedback = require('../collectionsMongo/Feedback');
var Problem = require('../collectionsMongo/Problem');

var geodist = require('geodist')

var VerifyToken = require('../auth/VerifyToken');

router.post('/create_problem',function (req,res) {

    Problem.create({
            description: req.body.description,
            direction:req.body.direction,
            extra:req.body.extra,
            lat: req.body.lat,
            lng:req.body.lng,
            problemType:req.body.problemType,
            helpingUser:"",
            requestingUser:req.body.requestingUser,
        offerList:[],
         //   time:new Date(),
            status : 1,
        deletedOffers: []
        },
        function (err, problem) {
            User.findById(req.body.requestingUser, function (err, user) {
                if (err) return res.status(500).send('Error on the server.');
                console.log(err)
                if (!user) return res.status(404).send('No user found.');

                user.currentProblem = problem._id;

                user.save(function (err, updatedUser) {
                    if (err) return "Error Motherfucker!"
                });

            if (err) return res.status(500).send(err);
                res.status(200).send({message:"Problem Added",uid:problem._id})
        });

});
    
    });

router.post('/problem_cancel',function (req,res) {

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

router.post('/problem_done', function (req, res) {
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

router.post('/download_problems', function (req, res) {

        var userPosition = {lat:req.body.lat,lon:req.body.lng};
        let radius = req.body.radius;
        var type  =[]= req.body.type;

    let compare = false;
    let problemsToClient = [];

        Problem.find({},function (err,problems) {

                 if(err){res.send('Something went wrong')}
                  for(let i=0;i<problems.length;i++){

                                  let currProblem = problems[i];
                                  let distance = geodist(userPosition, {lat: currProblem.lat, lon: currProblem.lng },{unit:'km'});
                      var compareType = function () {
                          for (let i=0;i<type.length;i++){
                              if(type[i] == currProblem.problemType){
                                  return compare = true;
                              }}};
                               if(  distance <= radius/1000 && currProblem.status == 1){
                                      compareType();
                                      if(compare)
                                   problemsToClient.push(currProblem)
                               }}
                 res.status(200).send(problemsToClient);
    });

});

router.post('/problems_map', function (req, res) {

    var userPosition = {lat: req.body.lat, lon: req.body.lng};
    let radius = req.body.radius;
    var type =[]= req.body.type;
    let compare = false;
    var problemsToClient = [];
    Problem.find({},function (err, problems) {
        if (err) {
            res.send('Something went wrong')} 
        for (let i = 0; i < problems.length; i++) {
            let currProblem = problems[i];

            var compareType = function () {
                for (let i=0;i<type.length;i++){
                    if(type[i] == currProblem.problemType){
                        return compare = true;

                    }}};
            let distance = geodist(userPosition, {lat: currProblem.lat, lon: currProblem.lng}, {unit: 'km'});
            if (distance <= radius / 1000 && currProblem.status == 1) {
                compareType();
                if(compare){
                    problemsToClient.push(currProblem)
                }
            }
        }}).then(function (err,ok) {
            for(let i=0;i<problemsToClient.length;i++){
                 problemsToClient[i].description = undefined;
                 problemsToClient[i].extra = undefined;
                 problemsToClient[i].requestingUser = undefined;
                 problemsToClient[i].time = undefined;
                 problemsToClient[i].helpingUser = undefined;
                 problemsToClient[i].status = undefined
            }
        }).then(function () {
        res.status(200).send(problemsToClient);
    })
})

router.post('/problem_change_position',function (req,res) {
    Problem.findById(req.body.uid,function (err,problem) {
        if (err) return res.status(500).send('Error on the server.');
        if (!problem) return res.status(404).send('No problem found.');

        problem.lat = req.body.lat;
        problem.lng = req.body.lng;
        problem.direction = req.body.direction;

        problem.save(function (err, updatedProblem) {
            if (err) return "Error!";
            res.status(200).send('Problem was changed!');
        })
    })
})

router.post('/helper_change_position',function (req,res) {
    User.findById(req.body.uid,function (err,user) {
        if (err) return res.status(500).send('Error on the server.');
        if (!user) return res.status(404).send('No user found.');

        user.position.lat = req.body.lat;
        user.position.lng = req.body.lng;
        user.position.direction = req.body.direction;

        user.save(function (err, updatedUser) {
            if (err) return "Error!";
            res.status(200).send('User was changed!');
        })
    })
})
router.get('/get_problem', function (req, res) {

    Problem.findById(req.headers['uid'], function (err, problem) {
        if (err) return res.status(500).send('Error on the server.');
        if (!problem) return res.status(404).send('No problem found.');
        res.status(200).json({currentProblem:problem});
    })
});






module.exports = router;




