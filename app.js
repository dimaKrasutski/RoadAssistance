var express = require('express');
var app = express();
var db = require('./db');



let Routes = require('./router/mainRoutes'),
 Problems = require('./router/problemRequest'),
 Users = require('./router/userRequest'),
 OffersProblems = require('./router/offersProblemsRequests'),
    PlacesRoutes = require('./router/placesRoutes');
   // Socket  =require('./router/socket');

app.use('/',OffersProblems);
app.use('/', Routes);
app.use('/',Problems);
app.use('/',Users);
app.use('/',PlacesRoutes);
//app.use('/',Socket);

module.exports = app;

