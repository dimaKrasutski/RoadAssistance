let mongoose = require('mongoose');

let UserSchema = new mongoose.Schema({
    login : String,
    password : String,
    name : String,
    surname:String,
    phoneId:String,
    car: { color: String, drive: String, make: String, model: String, number: String, transmission: String, year: String} ,
    phone:String,
    volunteer:Boolean,
    works:[],
    photo:String,
    position:{lat:String,lng:String,direction:String},
    currentProblem:String,
    solvingProblem:String,
    history: {historyHelps:[],historyProblems:[]},
    rating:[],
    deviceIdFcmToken:String
}, {versionKey:false});

mongoose.model('User', UserSchema);


module.exports = mongoose.model('User');