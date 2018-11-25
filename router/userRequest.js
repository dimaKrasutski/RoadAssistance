const {Router,User,Feedback,Problem,Place,Geodist,VerifyToken,SendFcm} = require('../variables');

    const jwt = require('jsonwebtoken'), 
    bcrypt = require('bcryptjs'),
    config = require('../keys/db');

Router.post('/user_create', function(req, res) {

    const hashedPassword = bcrypt.hashSync(req.body.password, 8);
    User.create({
            login : req.body.login,
            password : hashedPassword,
            name : req.body.name,
            surname:req.body.surname,
            phoneId:req.body.phoneId, // IMEI телефона
            car: {color:"", drive: '', make: '', model: '', number: '', transmission: '', year: ''},
            phone:"",
            volunteer:false,
            works:[],
            photo:'',
            position:{lat:'',lng:'',direction:''},
            currentProblem:'',
            solvingProblem:'',
            history: {historyHelps:[],historyProblems:[]},
            rating:[],
            deviceIdFcmToken:req.body.deviceIdFcmToken
        },
        function (err, user) {
            if (err) return res.status(500).send({message:err});
            // create a token
            let token = jwt.sign({ id: user._id }, config.secret, {
                expiresIn: 200000 
            });
            res.status(200).json({auth:true,token:token, message:"User Added",uid:user._id})
        });
});        //OK

Router.post('/login', function(req, res) {
    User.findOne({ login: req.body.login }, function (err, user) {
        if (err) return res.status(500).send({message:'Error on the server'});
        if (!user) return res.status(404).send({message:'No user found'});

        var passwordIsValid = bcrypt.compareSync(req.body.password, user.password);

        if (!passwordIsValid) return res.status(401).send({ auth: false, token: null });
        var token = jwt.sign({ id: user._id }, config.secret, {
            expiresIn: 200000
        });
        user.deviceIdFcmToken = req.body.deviceIdFcmToken;
        user.save(function (err, updatedUser) {
            if (err) return res.status(500).send({message:err});
        });

        res.status(200).json({ auth: true, token: token , message:"Login Ok",uid:user._id });
    });
});

Router.get('/user_logout', function(req, res) {
    res.status(200).send({ auth: false, token: null });
});

Router.post('/user_edit_info',function (req,res) {
    User.findById(req.body.uid ,function (err, user) {
        if (err) return handleError(err);
        let curr = user.car;
        let requestBody = req.body;

        user.phone = requestBody.phone;
        user.volunteer = requestBody.volunteer;
        user.works = requestBody.works;
//         Changed by Igor
         user.name = requestBody.name;
         user.surname = requestBody.surname;
//         Changed by Igor
        curr['color'] = requestBody.color;
        curr['drive'] = requestBody.drive;
        curr['make'] = requestBody.make;
        curr['model']  = requestBody.model;
        curr['number'] = requestBody.number;
        curr['transmission'] = requestBody.transmission;
        curr['year'] = requestBody.year;

        user.save(function (err, updatedUser) {
            if (err) return res.status(500).send({message:err});
            //         Changed by Igor
            res.status(200).send({message:"User Update"});
        });
    });
});

Router.post('/user_edit_photo',function(req, res) {
    User.findById(req.body.uid, function (err, user) {
        if (err) return res.status(500).send({message:'Error on the server'});
        if (!user) return res.status(404).send({message:'No user found'});

        user.photo = req.body.photo;

        user.save(function (err,updatedUser) {
            if(err) return "Error!";
            res.status(200).send({message:"Photo updated!"});
        })

    });
});         //OK

Router.get('/get_user',function (req,res) {
    User.findById(req.headers['uid'], function (err, user) {
        if (err) return res.status(500).send({message:'Error on the server'});
        if (!user) return res.status(404).send({message:'No user found'});
        res.status(200).send({currentUser:user});
        });

    });

// router.get('/me', function(req, res) {
//     var token = req.headers['c'];
//     if (!token) return res.status(401).send({ auth: false, message: 'No token provided.' });
//
//     jwt.verify(token, config.secret, function(err, decoded) {
//         if (err) return res.status(500).send({ auth: false, message: 'Failed to authenticate token.' });
//         // res.status(200).send(decoded);
//
//         User.findById(decoded.id,
//             { password: 0 }, // projection
//             function (err, user) {
//                 if (err) return res.status(500).send("There was a problem finding the user.");
//                 if (!user) return res.status(404).send("No user found.");
//                 res.status(200).send(user);
//             });
//     });
// });

// router.get('/me', VerifyToken, function(req, res, next) {
//     User.findById(req.userId, { password: 0 }, function (err, user) {
//         if (err) return res.status(500).send("There was a problem finding the user.");
//         if (!user) return res.status(404).send("No user found.");
//
//         res.status(200).send(user);
//     });
// });
module.exports = Router;

