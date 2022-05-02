const mongoose = require("mongoose");

const TypeSchema = new mongoose.Schema({
  color: String,
  point: Number,
});

const StickerSchema = new mongoose.Schema({
  category: { type: String, trim: true, required: true },
  types: [TypeSchema],
});

module.exports = mongoose.model("Stiker", StickerSchema);
