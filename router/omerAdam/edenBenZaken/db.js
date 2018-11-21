const mongoose = require('mongoose');
mongoose.connect('mongodb://krasutski:123_Destination@ds147450.mlab.com:47450/road_assistance_database',{ useNewUrlParser: true });

module.exports = {
  'secret': 'dima_igor'
};

const googleApiKey= 'AIzaSyDwDBCneJDrfCtHpTzcUPK9EYQmgk8whpw';