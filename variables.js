const Express = require('express'),
Router = Express.Router(),
BodyParser = require('body-parser');

Router.use(BodyParser.urlencoded({ extended: false }));
Router.use(BodyParser.json());   // парсит тело только тех запросов, для которых 'Content-Type'
// равен 'application/json', Результат парсинга сохраняется в объекте req.body

const User = require('./collectionsMongo/User'),
      Feedback = require('./collectionsMongo/Feedback'),
      Problem = require('./collectionsMongo/Problem'),
      Place = require('./collectionsMongo/Places'),
      Geodist = require('geodist'),
      VerifyToken = require('./auth/VerifyToken'),
      SendFcm = require('./fcm');

module.exports = {
    Router:Router,
    User:User,
    Feedback:Feedback,
    Problem:Problem,
    Place:Place,
    Geodist:Geodist,
    VerifyToken:VerifyToken,
    SendFcm:SendFcm};
