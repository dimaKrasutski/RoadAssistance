var newRelic =  require('newrelic');

var app = require('./node_modules/@tyriar/app');
var port = process.env.PORT || 3000;

var server = app.listen(port, function() {
  console.log('Express server listening on port ' + port);
});