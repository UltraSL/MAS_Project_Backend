const { date } = require('@hapi/joi')
const mongoose = require('mongoose')

const Schema = mongoose.Schema

const requestSchema = new Schema ({
    user_id : String,
    username : String,
    user_image : String,
    reason : String,
    managerUserName : String,
    dateOfTrip : Date,
    timeOfTrip : String,
    time : String,
    distance : Number,
    locationFrom : String,
    locationTo : String,
    vehicleType : String,
    assignedDriver : String,
    assignedVehicle : String,
    isDriverAccepted : {
        type: Boolean,
        default: false
    },
    status : {
        type: [{
            type: String,
            enum: ['pending', 'approved', 'rejected', 'assigned']
        }],
        default: ['pending']
    },
  
createAt : {
    type: Date,
    default: Date.now,
    expires: '1d'+'dateOfTrip'
}


})

module.exports = mongoose.model('request', requestSchema , 'requests')