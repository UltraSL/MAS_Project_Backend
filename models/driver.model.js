
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const driverSchema = new Schema ({
    name : String,
    mobile : String,
    availablity : Boolean,
    WorkingDates :Array,
    milage: {
        type: Number,
        default: 0
    }
    
    ,
   
})

module.exports = mongoose.model('driver', driverSchema , 'drivers')


