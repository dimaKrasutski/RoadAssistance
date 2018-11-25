const express = require('express'),
      app = express(),
    
const MainRoutes = require('./router/mainRoutes'),
 Problems = require('./router/problemRequest'),
 Users = require('./router/userRequest'),
 OffersProblems = require('./router/offersProblemsRequests'),
    PlacesRoutes = require('./router/placesRoutes');

app.use('/',OffersProblems);
app.use('/', MainRoutes);
app.use('/',Problems);
app.use('/',Users);
app.use('/',PlacesRoutes);

module.exports = app;

