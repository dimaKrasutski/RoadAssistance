var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');

router.use(bodyParser.urlencoded({ extended: false }));
router.use(bodyParser.json());

var User = require('../collectionsMongo/User');
var Feedback = require('../collectionsMongo/Feedback');
var Problem = require('../collectionsMongo/Problem');



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




module.exports = router;