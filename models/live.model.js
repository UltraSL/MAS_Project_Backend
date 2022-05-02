var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var LiveSchema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  url: {
    type: String,
    required: true,
  },
  thumbnail_url: {
    type: String,
  },
  cloudinary_id: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    required: true,
  },
  description:{
    type: String,
  },
  duration: {
    type: Number,
  },
  likes: [
    {
      type: Schema.Types.ObjectId,
      ref: "user",
    },
  ],
  sharing: [
    {
      type: Schema.Types.ObjectId,
      ref: "user",
    },
  ],
  views: [
    {
      type: Schema.Types.ObjectId,
      ref: "user",
    },
  ],
});

const Live = mongoose.model("Live", LiveSchema);
module.exports = Live;
