const mongoose = require('mongoose');

const FeedBackSchema = new mongoose.Schema({
    role:String,
    problemUid:String,
    userMain:String,
    userAbout:String,
    content:String,
    rating:Number,
    time:Date,
},{versionKey:false});
mongoose.model("Feedback",FeedBackSchema);

module.exports = mongoose.model('Feedback');