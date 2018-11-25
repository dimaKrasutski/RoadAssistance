const { Router, User, Feedback, Problem, Place, Geodist, VerifyToken, SendFcm } = require('../variables');

Router.post('/create_feedback', function (req, res) {

    Problem.findById(req.body.problemUid, function (err, currProblem) {
        if (err) return res.status(500).send({ message: 'Error on the server' });
        if (!currProblem) return res.status(404).send({ message: 'No problem found' });

        if (req.body.role.toString() === 'helper') {
            Feedback.create({
                role: req.body.role,
                problemUid: req.body.problemUid,
                userMain: currProblem.helpingUser,
                userAbout: currProblem.requestingUser,
                content: req.body.content,
                rating: req.body.rating,
            },
                function (err, fb) {
                    console.log(err);
                    if (err) return res.status(500).send(err);
                    res.status(200).json({ message: "Feedback Added", uid: fb._id })
                });
        }
        else if (req.body.role.toString() === 'requester') {
            Feedback.create({
                role: req.body.role,
                problemUid: req.body.problemUid,
                userMain: currProblem.helpingUser,
                userAbout: currProblem.requestingUser,
                content: req.body.content,
                rating: req.body.rating,
            },
                function (err, fb) {
                    console.log(err);
                    if (err) return res.status(500).send(err);
                    res.status(200).json({ message: "Feedback Added", uid: fb._id })
                });
        }
        else return res.status(404).send({ message: "unknown role, feedback wasn't created" });
    });

});
Router.post('/get_feedbacks', function (req, res) {

    var fbs = [];

    Feedback.find({}, function (err, feedback) {
        if (err) return res.status(500).send({ message: 'Error on the server' });
        if (!feedback) return res.status(404).send({ message: 'No feedback found' });

        for (let i = 0; i < feedback.length; i++) {
            if (req.body.uid == feedback[i].userAbout)
                fbs.push(feedback[i])
        }
        res.status(200).send(fbs);
    });
})


module.exports = Router;