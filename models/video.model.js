var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var VideoSchema = new Schema({
  userId: {
    type: String,
  },
  name: {
    type: String,
    required: true,
  },
  url: {
    type: String,
  },
  cloudinary_id: {
    type: String,
  },
  image:{
    type:String,
  },
  duration: {
    type: Number,
  },

  description: {
    type: String,
  },
  likes: [
    {
      type: Schema.Types.ObjectId,
      ref: "user",
    },
  ],
});

const Video = mongoose.model("Video", VideoSchema);
module.exports = Video;
