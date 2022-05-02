const mongoose = require('mongoose');
var Schema = mongoose.Schema;

const notificationSchema = new Schema({


    description: {
        type: String,
        required: true,
    },
    userId: {
        type: String,
        required: true,
    },
    userImage: {
        type: String,
       
      },
    created_at: {
        type: Date,
        default: Date.now
    }
},

);

const Notification = mongoose.model('notification', notificationSchema);
module.exports = Notification;