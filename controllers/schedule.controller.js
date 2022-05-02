const Schedule = require('../models/schedule.model');
const mongoose = require('mongoose');

exports.addSchedule = async function(req, res) {
    const body = req.body;
    //console.log(body);
    if (!(req.body.message && req.body.date && req.body.time)) {
        return res.status(200).json({
            code: 200,
            success: false,
            message: ' Data fields not be empty !',
        });
    }
    //console.log(schedule);
    const schedule = new Schedule({
        message: req.body.message,
        date: req.body.date,
        time: req.body.time
    });
    try {
        var savedSchedule = await schedule.save();
        //savedSchedule = await Schedule.findOne({ _id: savedUser._id });
        res.status(200).json({
            code: 200,
            success: true,
            data: savedSchedule,
            message: 'Schedule recorded successfully',
        });
    } catch (error) {
        res
            .status(500)
            .json({ code: 500, success: false, message: 'Internal Server Error' });
    }
}

exports.getAllSchedule = async function(req, res) {
    Schedule.find()
        .then((data) => {
            res.send(data);
        })
        .catch((err) => {
            res.status(500).send({
                message: err.message || "Some error occurred while retrieving Schedule.",
            });
        });
};