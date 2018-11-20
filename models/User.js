const Mongoose = require('mongoose');

const UserSchema = new Mongoose.Schema({
    login : {type:String,required:true,unique:true,lowercase:true},
    password : {type:String,required:true},
    name : { type:String,required:true,lowercase:true},
    surname:{ type:String,required:true,lowercase:true},
    phoneId:{ type:String},
    car: { color: String, drive: String, make: String, model: String, number: String, transmission: String, year: String} ,
    phone:{ type:String},
    volunteer:{ type:Boolean},
    works:[],
    photo:{ type:String},
    position:{lat:String,lng:String,direction:String},
    currentProblem:String,
    solvingProblem:String,
    history: {historyHelps:[],historyProblems:[]},
    rating:[],
    deviceIdFcmToken:{ type:String,unique:true}
}, {versionKey:false});

Mongoose.model('User', UserSchema);


module.exports = Mongoose.model('User');