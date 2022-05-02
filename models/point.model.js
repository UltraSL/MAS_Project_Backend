const mongoose = require("mongoose");

const PointSchema = new mongoose.Schema({
  userId: { type: String, trim: true, requried: true },
  points: { type: Number, trim: true, required: true },
});

module.exports = mongoose.model("Point", PointSchema);
