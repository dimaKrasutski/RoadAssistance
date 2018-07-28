var express = require('express');
var app = express();
var db = require('./db');



var Routes = require('./router/routes');
var Problems = require('./router/problemRequest');
var Users = require('./router/userRequest');

app.use('/', Routes);
app.use('/',Problems);
app.use('/',Users);



module.exports = app;