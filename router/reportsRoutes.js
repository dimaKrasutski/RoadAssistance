const Express = require('express');
const Router = express.Router();
const BodyParser = require('body-parser');

Router.use(BodyParser.urlencoded({ extended: false }));
Router.use(BodyParser.json());

const User = require('../collectionsMongo/User');
const Feedback = require('../collectionsMongo/Feedback');
const Problem = require('../collectionsMongo/Problem');
const Place = require('../collectionsMongo/Places');
const Geodist = require('geodist');

const VerifyToken = require('../auth/VerifyToken');



module.exports = Router;


