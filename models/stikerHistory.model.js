var mongoose = require("mongoose");

const TypeSchema = new mongoose.Schema({
  color: String,
  point: Number,
});

const StickerHistorySchema = new mongoose.Schema({
    videoId:{type:String, required:true},
    owenerId:{type:String, required:true},
    userId: { type: String,required: true},
  category: { type: String, trim: true, required: true },
  types: [TypeSchema],
});





module.exports = mongoose.model("StikerHistory", StickerHistorySchema);