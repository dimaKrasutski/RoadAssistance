const Express = require('express'),
      Router = Express.Router(),
      BodyParser = require('body-parser');

Router.use(BodyParser.urlencoded({ extended: false }));
Router.use(BodyParser.json());

const User = require('../collectionsMongo/User'),
      Feedback = require('../collectionsMongo/Feedback'),
      Problem = require('../collectionsMongo/Problem'),
      Place = require('../collectionsMongo/Places'),
      Geodist = require('geodist');

const VerifyToken = require('../auth/VerifyToken');



module.exports = Router;


