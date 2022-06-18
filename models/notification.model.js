const mongoose = require("mongoose");
const Schema = mongoose.Schema;


const notification = new Schema({
    reqId : String,
    user_id : String,
    managerUserName : String,
    assignedDriver : String,
    isDriverAccepted : Boolean,
    message : String,
    status : {
        type: [{
            type: String,
            enum: ['pending', 'approved', 'rejected', 'assigned']
        }],
        default: ['pending']
    }
});


module.exports = mongoose.model("notification", notification);