const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const emergency = new Schema({
  user_id: String,
  username: String,
  message: String,
  date: {
    type: Date,
    default: Date.now

  },
});

module.exports = mongoose.model("emergency", emergency);
