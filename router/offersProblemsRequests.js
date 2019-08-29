const {Router,User,Feedback,Problem,Place,Geodist,VerifyToken,SendFcm} = require('../variables');

Router.get('/get_offer_list',function (req,res) {
    Problem.findById(req.headers['uid'], function (err, problem) {
        if (err) return res.status(500).send('Error on the server.');
        if (!problem) return res.status(404).send('No problem found.');
        res.status(200).send(problem.offerList);
    })
});
// OK
Router.post('/agree_problem', (req, res) =>{   //ПРЕДЛОЖЕНИЕ ХЕЛПЕРА ПОПАДАЕТ В OFFER-LIST
    Problem.findById(req.body.uidProblem).then(problem =>{
        const offer = {
            answer:0,
            description:req.body.description,
            helper:req.body.uidHelper,
            price:req.body.price,
            problemName:req.body.uidProblem,
        };
        problem.offerList.push(offer);
       
        problem.save().then(problemUpdated => {
            res.status(200).send({msg:'offer added'});
        });

        User.findById(problem.requestingUser).then(user=>{
            SendFcm(user.deviceIdFcmToken,'New offer was added!',user._id.toString())
        }) 
           
        }).catch(error => res.status(500).json(error));
    })

// OK
Router.post('/refuse_offer', function (req, res) { // ОТМЕНИТЬ ПРЕДЛОЖЕНИ HELPERA О ПОМОЩИ(ЕСЛИ ЕГО СОГЛАСИЕ ЕЩЕ НЕ ПОДТВЕРДИЛИ)

// добавить проверку нa helpingUser: ""
    Problem.findById(req.body.uidProblem, function (err, problem) {

        if (err) return res.status(500).send('Error on the server.');
        console.log(err);
        if (!problem) return res.status(404).send('No problem found.');

        var list = problem.offerList;

        for(let i=0;i<list.length;i++){
            let currOffer = list[i];
            if (currOffer['helper'] == req.body.uidHelper && currOffer.helpingUser == '') {
                list.splice(currOffer,1)
            }
        }
        problem.save(function (err, updatedProblem) {
            if (err) return "Error!";
            res.status(200).send({message:'Offer refused'});
        })
    })

});

Router.post('/offer_accept',function (req,res) { //requester принимает чей то offer,offerList очищается,uid helpera в problem.helperUid

    Problem.findById(req.body.uidProblem, function (err, problem) {
    let problemUid = req.body.uidProblem;
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
            SendFcm(user.deviceIdFcmToken,'your offer was accepted',problemUid) //ОТПРАЛЯЕМ НОТИФИКАЦИЮ ХЕЛПЕРУ КОГДА ЕГО ОФФЕР ОДОБРИЛИ
            user.solvingProblem = problemUid;
            user.save(function (err, updatedUser) {
                if (err) return "Error!";

            });
        });
        res.status(200).json({msg:'Offer_accepted'});
    })
})

//OK
Router.post('/offer_reject',function (req,res) { //requester отменяет чей то offer, этот offer удаляется из offerList и добавляется в deletedOffers

    Problem.findById(req.body.uidProblem, function (err, problem) {
        let currentOffer;

        if (err) return res.status(500).send('Error on the server.');
        if (!problem) return res.status(404).send('No problem found.');

        //сделать через map
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
            SendFcm(user.deviceIdFcmToken,"Your offer was cancelled",req.body.uidProblem)  });   // ON_REJECT_OFFER НОТИФИКАЦИЯ ХЕЛПЕРУ ЧТО ЕГО ОФФЕР ОТМЕНИЛИ
        problem.save(function (err, updatedProblem) {
            if (err) return "Error!";
        });
        res.status(200).json({msg:'Offer_rejected'});
    })

});

Router.get('/reject_help', function (req, res) {

    User.findById(req.headers['uid'], function (err, user) {
        if (err) return res.status(500).send('Error on the server.');
        if (!user) return res.status(404).send('No problem found.');

        const ProblemUid =  user.solvingProblem;
        user.solvingProblem = '';
        user.save(function (err, updatedUser) {
            if (err) return "Error!";
        });

        Problem.findById(ProblemUid,function (err,problem) {
            if (err) return res.status(500).send({message:'Error on the server'});
            if (!problem) return res.status(404).send({message:'No problem found'});

            problem.helpingUser = '';
            problem.save(function (err,updatedProblem) {
                if (err) return "Error!";
            })
        });

        res.status(200).json({message:'Help_Rejected'});
    })
});
module.exports = Router;
