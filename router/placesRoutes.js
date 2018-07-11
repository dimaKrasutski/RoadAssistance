var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');

router.use(bodyParser.urlencoded({ extended: false }));
router.use(bodyParser.json());


var User = require('../collectionsMongo/User');
var Feedback = require('../collectionsMongo/Feedback');
var Problem = require('../collectionsMongo/Problem');
var Places = require('../collectionsMongo/Places');
var geodist = require('geodist');

var VerifyToken = require('../auth/VerifyToken');





module.exports = router;
