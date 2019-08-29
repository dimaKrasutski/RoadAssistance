const mongoose = require('mongoose');

const FeedBackSchema = new mongoose.Schema({
    role:{type:String,lowercase:true},
    problemUid:{type:String},
    userMain:{type:String},
    userAbout:{type:String},
    content:{type:String,lowercase:true},
    rating:{type:Number},
    time:{type:Date},
},{versionKey:false});

const Feedback = mongoose.model("Feedback",FeedBackSchema);

module.exports = Feedback;