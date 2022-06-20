const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const emergency = new Schema({
  user_id: String,
  message: String,
  date: String,
});

module.exports = mongoose.model("emergency", emergency);
