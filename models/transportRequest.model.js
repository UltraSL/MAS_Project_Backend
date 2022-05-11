const mongoose = require('mongoose')

const Schema = mongoose.Schema

const requestSchema = new Schema ({
    user_id : String,
    username : String,
    reason : String,
    dateOfReservation : String,
    timeOfReservation : String,
    dateOfTrip : String,
    timeOfTrip : String,
    locationFrom : String,
    locationTo : String,
    vehicleType : String,
    status : {
        type: [{
            type: String,
            enum: ['pending', 'approved', 'rejected']
        }],
        default: ['pending']
    }
})

module.exports = mongoose.model('request', requestSchema , 'requests')