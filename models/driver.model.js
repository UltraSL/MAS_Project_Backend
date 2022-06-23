
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const driverSchema = new Schema ({
    name : String,
    mobile : String,
    availablity : Boolean,
    WorkingDates :Array,
    milage: {
        type: Number,
        //expires in 30 days from creation date (30*24*60*60*1000) = 2592000 milliseconds (30 days) this field
        expires: 2592000,
        default: 0
    }
    
    
   
})

module.exports = mongoose.model('driver', driverSchema , 'drivers')


