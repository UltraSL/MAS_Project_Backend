
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const vehicleSchema = new Schema ({
    type : String,
    image: String,
    number : String,
    availablity : Boolean,
    reservedDates : Array,
    
})

module.exports = mongoose.model('vehicle', vehicleSchema , 'vehicles')