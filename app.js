const express = require('express');
     const app = express();
    
const MainRoute = require('./router/mainRoutes');
 const ProblemReq = require('./router/problemRequest');
const UserReq = require('./router/userRequest');
 const OffersProblem = require('./router/offersProblemsRequests');
    const PlacesRoute = require('./router/placesRoutes');

app.use('/',OffersProblem);
app.use('/', MainRoute);
app.use('/',ProblemReq);
app.use('/',UserReq);
app.use('/',PlacesRoute);

module.exports = app;

