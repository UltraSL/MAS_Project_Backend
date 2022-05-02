var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var ProductSchema = new Schema({
  userId: {
    type: String,
  },
  file: {
    type: String,
    default: null,
  },
  price: {
    type: Number,
  },
  description: {
    type: String,
  },
  thumnail: {
    type: String,
    default: null,
  },
  promotions: {
    type: String,
  },
});

const Product = mongoose.model("Product", ProductSchema);
module.exports = Product;
