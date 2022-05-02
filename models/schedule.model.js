const mongoose = require('mongoose');
var Schema = mongoose.Schema;

const scheduleSchema = new Schema({
    message: {
        type: String,
        required: true,
    },
    date: {
        type: Date,
        required: true,
    },
    time: {
        type: String,
        required: true,
    },
});

const Schedule = mongoose.model('schedule', scheduleSchema);
module.exports = Schedule;