const mongoose = require("mongoose");
const Schema = mongoose.Schema;


const notification = new Schema({
    title: {
        type: String,
        required: true,
    },
    message: {
        type: String,
        required: true,
    },
    date: {
        type: Date,
        default: Date.now
    },
    status: {
        type: Boolean,
        default: false
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: "User"
    }
});


module.exports = mongoose.model("notification", notification);