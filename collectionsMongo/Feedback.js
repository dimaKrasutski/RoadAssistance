var mongoose = require('mongoose');

var FeedBackSchema = new mongoose.Schema({
    role:String,
    problemUid:String,
    userMain:String,
    userAbout:String,
    content:String,
    rating:Number,
    time:Date
});
mongoose.model("Feedback",FeedBackSchema);

module.exports = mongoose.model('Feedback');