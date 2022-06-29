const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const feedbackSchema = new Schema({
  name: String,
  email: String,
  message: String,
  createAt : {
    type: Date,
    default: Date.now,
    expires: '7d'
}

});

module.exports = mongoose.model("feedback", feedbackSchema);