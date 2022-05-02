const Notification = require("../models/notification.model");
const mongoose = require('mongoose');

exports.addNotification = async function(req, res) {
    const userId = req.jwt.sub.id;
    const body = req.body;


    const notification = new Notification({
        description: req.body.description,
        userId: userId,
        userImage: req.jwt.sub.image,
    });
    try {
        var savedNotification = await notification.save();
        //savedSchedule = await Schedule.findOne({ _id: savedUser._id });
        res.status(200).json({
            code: 200,
            success: true,
            data: savedNotification,
            message: 'notification recorded successfully',
        });
    } catch (error) {
        res
            .status(500)
            .json({ code: 500, success: false, message: 'Internal Server Error' });
    }
}

exports.getUserNotification = async function(req, res) {
    const userId = req.jwt.sub.id;

    Notification.find({ userId: userId })
        .then((data) => {
            res.send(data);
        })
        .catch((err) => {
            res.status(500).send({
                message: err.message || "Some error occurred while retrieving Notification.",
            });
        });
};