let express = require('express');
let router = express.Router();
let bodyParser = require('body-parser');
let mongoose = require('mongoose');

router.use(bodyParser.urlencoded({ extended: false }));
router.use(bodyParser.json()); // парсит тело только тех запросов, для которых 'Content-Type' равен 'application/json', Результат парсинга сохраняется в объекте req.body

const User = require('../collectionsMongo/User');
const Feedback = require('../collectionsMongo/Feedback');
const Problem = require('../collectionsMongo/Problem');
const VerifyToken = require('../auth/VerifyToken');
const SendFcm = require('../fcm');
const tok = 'd5XVP0kR3xs:APA91bFNmzNUZJs-em2HBzfbHHqHIP2mCvInqAg_K7SnOgmDp2Nr4mERjD2m6Uj_L9z5jN4bVkVWRzOfDPuot8ro6laZWhVbQicWcQMx0qKI6KOXYU_up_FGShEjdV3kaUm6_arqEm6ANvKyqOJHlYaDju63m4nGyA';

router.get('/get_offer_list',function (req,res) {
    Problem.findById(req.headers['uid'], function (err, problem) {
        if (err) return res.status(500).send('Error on the server.');
        if (!problem) return res.status(404).send('No problem found.');
        res.status(200).send(problem.offerList);
    })
});

router.post('/agree_problem', function (req, res) {   //ПРЕДЛОЖЕНИЕ ХЕЛПЕРА ПОПАДАЕТ В OFFER-LIST

    Problem.findById(req.body.uidProblem, function (err, problem) {

        if (err) return res.status(500).send('Error on the server.');

        console.log(err);

        if (!problem) return res.status(404).send('No problem found.');

       let offer = {
            answer:0,
            description:req.body.description,
            helper:req.body.uidHelper,
            price:req.body.price,
            problemName:req.body.uidProblem,
        };

        problem.offerList.push(offer);

        User.findById(problem.requestingUser,function (err,user) {
            SendFcm(user.deviceIdFcmToken,'New offer was added!')
        })

        problem.save(function (err,problemUpdated) {
            if(err) return "Error!";
            res.status(200).send({msg:'offer added'});
        });

    })
});

router.post('/refuse_offer', function (req, res) { // ОТМЕНИТЬ ПРЕДЛОЖЕНИ HELPERA О ПОМОЩИ(ЕСЛИ ЕГО СОГЛАСИЕ ЕЩЕ НЕ ПОДТВЕРДИЛИ)

// добавить проверку нa helpingUser: ""
    Problem.findById(req.body.uidProblem, function (err, problem) {

        if (err) return res.status(500).send('Error on the server.');
        console.log(err);
        if (!problem) return res.status(404).send('No problem found.');

        var list = problem.offerList;

        for(let i=0;i<list.length;i++){
            let currOffer = list[i];
            if (currOffer['helper'] == req.body.uidHelper){
                list.splice(currOffer,1)
            }
        }
        problem.save(function (err, updatedProblem) {
            if (err) return "Error!";
            res.status(200).send({message:'Offer refused'});
        })
    })

});

router.post('/offer_accept',function (req,res) { //helper принимает чей то offer,offerList очищается,uid helpera в problem.helperUid

    Problem.findById(req.body.uidProblem, function (err, problem) {
    var problemUid = req.body.problemUid;
        if (err) return res.status(500).send('Error on the server.');
        if (!problem) return res.status(404).send('No problem found.');

        let offersArr = problem.offerList ;
        for (let i=0;i<offersArr.length;i++){
            if(req.body.uidOffer == offersArr[i]._id){
                problem.helpingUser = offersArr[i].helper;
             break;
            }
        }
        problem.offerList = [];
        problem.save(function (err, updatedProblem) {
            if (err) return "Error!";

        });
        User.findById(problem.helpingUser,function (err,user) {
            SendFcm(user.deviceIdFcmToken,'your offer was accepted',problemUid)
        })
        res.status(200).json({msg:'Offer_accepted'});
    })
})

router.post('/offer_reject',function (req,res) { //helper отменяет чей то offer, этот offer удаляется из offerList и добавляется в deletedOffers
   var currentOffer;
    Problem.findById(req.body.uidProblem, function (err, problem) {

        if (err) return res.status(500).send('Error on the server.');
        if (!problem) return res.status(404).send('No problem found.');

        let offersArr = problem.offerList ;
        for (let i=0;i<offersArr.length;i++){
            if(req.body.uidOffer == offersArr[i]._id){
                currentOffer = offersArr[i];
                 problem.deletedOffers.push(offersArr[i]);
                offersArr.splice(i,1);
                break;
            }
        }
        User.findById(currentOffer.helper, function (err,user) {
            SendFcm(user.deviceIdFcmToken,"your offer was cancelled")
        })
        problem.save(function (err, updatedProblem) {
            if (err) return "Error!";
        });
        res.status(200).json({msg:'Offer_rejected'});
    })

});


module.exports = router;
