const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const feedbackSchema = new Schema({
  name: String,
  email: String,
  message: String,

});

module.exports = mongoose.model("feedback", feedbackSchema);