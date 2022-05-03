const mongoose = require('mongoose')

const Schema = mongoose.Schema

const requestSchema = new Schema ({
    reason : String,
    dateOfReservation : String,
    timeOfReservation : String,
    dateOfTrip : String,
    timeOfTrip : String,
    locationFrom : String,
    locationTo : String,
    vehicleType : {
        type: [{
            type: String,
            enum: ['threeWheel', 'car', 'van']
        }],
        default: ['threeWheel']
    }
})

module.exports = mongoose.model('request', requestSchema , 'requests')