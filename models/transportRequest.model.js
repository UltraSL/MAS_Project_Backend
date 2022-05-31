const mongoose = require('mongoose')

const Schema = mongoose.Schema

const requestSchema = new Schema ({
    user_id : String,
    username : String,
    user_image : String,
    reason : String,
    managerUserName : String,
    dateOfTrip : String,
    timeOfTrip : String,
    time : String,
    distance : String,
    locationFrom : String,
    locationTo : String,
    vehicleType : String,
    assignedDriver : String,
    assignedVehicle : String,
    isDriverAccepted : Boolean,
    status : {
        type: [{
            type: String,
            enum: ['pending', 'approved', 'rejected', 'assigned']
        }],
        default: ['pending']
    }
})

module.exports = mongoose.model('request', requestSchema , 'requests')