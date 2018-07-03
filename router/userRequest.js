var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');

router.use(bodyParser.urlencoded({ extended: false }));
router.use(bodyParser.json());

var VerifyToken = require('../auth/VerifyToken');

var User = require('../collectionsMongo/User');
var Problem = require('../collectionsMongo/Problem');
var Feedback = require('../collectionsMongo/Feedback');


var jwt = require('jsonwebtoken');
var bcrypt = require('bcryptjs');
var config = require('../config');

router.post('/user_create', function(req, res) {

    var hashedPassword = bcrypt.hashSync(req.body.password, 8);

    User.create({
            login : req.body.login,
            password : hashedPassword,
            name : req.body.name,
            surname:req.body.surname,
            phoneId:req.body.phoneId, // IMEI телефона
            car: {color:"", drive: '', make: '', model: '', number: '', transmission: '', year: ''},
            phone:"",
            volunteer:false,
            works:[],
            photo:'',
            position:{lat:'',lng:'',direction:''},
            currentState:{currentProblem:'',currentSolvingProblem:''},
            currentProblem:'',
            history: {historyHelps:[],historyProblems:[]},
            rating:[],
        },
        function (err, user) {
            if (err) return res.status(500).send(err);
            // create a token
            var token = jwt.sign({ id: user._id }, config.secret, {
                expiresIn: 200000 // expires in 24 hours
            });
            //  res.status(200).send({ auth: true, token: token });
            res.status(200).json({auth:true,token:token, message:"User Added",uid:user._id})
        });
});

router.post('/login', function(req, res) {
    User.findOne({ login: req.body.login }, function (err, user) {
        if (err) return res.status(500).send('Error on the server.');
        if (!user) return res.status(404).send('No user found.');

        var passwordIsValid = bcrypt.compareSync(req.body.password, user.password);

        if (!passwordIsValid) return res.status(401).send({ auth: false, token: null });
        var token = jwt.sign({ id: user._id }, config.secret, {
            expiresIn: 86400 // expires in 24 hours
        });

        res.status(200).json({ auth: true, token: token , message:"Login Ok",uid:user._id });
    });
});

router.get('/user_logout', function(req, res) {
    res.status(200).send({ auth: false, token: null });
});

router.post('/user_edit_info',VerifyToken,function (req,res) {
    User.findById(req.body.uid ,function (err, user) {
        if (err) return handleError(err);
        var curr = user.car;
        var requestBody = req.body;

        user.phone = req.body.phone;
        user.volunteer = req.body.volunteer;
        user.works = requestBody.works;

        curr['color'] = requestBody.color;
        curr['drive'] = requestBody.drive;
        curr['make'] = requestBody.make;
        curr['model']  = requestBody.model;
        curr['number'] = requestBody.number;
        curr['transmission'] = requestBody.transmission;
        curr['year'] = requestBody.year;

        user.save(function (err, updatedUser) {
            if (err) return handleError(err);
            res.send(updatedUser);
        });
    });
});

router.post('/user_edit_photo', VerifyToken,function(req, res) {
    User.findById(req.body.uid, function (err, user) {
        if (err) return res.status(500).send('Error on the server.');
        if (!user) return res.status(404).send('No user found.');

        user.photo = req.body.photo;

        user.save(function (err,updatedUser) {
            if(err) return "Error!";
            res.status(200).send({message:"Photo updated!"});
        })

    });
});

// router.get('/me', function(req, res) {
//     var token = req.headers['c'];
//     if (!token) return res.status(401).send({ auth: false, message: 'No token provided.' });
//
//     jwt.verify(token, config.secret, function(err, decoded) {
//         if (err) return res.status(500).send({ auth: false, message: 'Failed to authenticate token.' });
//         // res.status(200).send(decoded);
//
//         User.findById(decoded.id,
//             { password: 0 }, // projection
//             function (err, user) {
//                 if (err) return res.status(500).send("There was a problem finding the user.");
//                 if (!user) return res.status(404).send("No user found.");
//                 res.status(200).send(user);
//             });
//     });
// });

// router.get('/me', VerifyToken, function(req, res, next) {
//     User.findById(req.userId, { password: 0 }, function (err, user) {
//         if (err) return res.status(500).send("There was a problem finding the user.");
//         if (!user) return res.status(404).send("No user found.");
//
//         res.status(200).send(user);
//     });
// });
module.exports = router;