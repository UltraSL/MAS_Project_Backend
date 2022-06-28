const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const emergency = new Schema({
  user_id: String,
  username: String,
  mobile: String,
  message: String,
  date: String,
});

module.exports = mongoose.model("emergency", emergency);
