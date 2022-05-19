
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const driverSchema = new Schema ({
    name : String,
    mobile : String,
    availablity : Boolean,
    WorkingDates : Array
})

module.exports = mongoose.model('driver', driverSchema , 'drivers')