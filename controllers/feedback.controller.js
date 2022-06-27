const Feedback = require("../models/feedback.model");

//add feedback
exports.addFeedback = async function (req, res) {
    let feedbackData = req.body;
    let feedback = new Feedback(feedbackData);
    feedback.save(async (error, addedFeedback) => {
        if (error) {
        res.status(400).json("Error" + error);
        } else {
        res.status(200).json(addedFeedback);
        }
    });
    }

    //get all feedback
    exports.getAllFeedbacks = async function (req, res) {
        Feedback.find({})
            .exec(function (err, feedbacks) {
                if (err) {
                    res.status(400).json("Not success");
                } else {
                    res.status(200).json(feedbacks);
                }
            })
    }