const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const OrderSchema = new Schema({
  userId: {
    type: String,
    ref: "user",
  },
  email: {
    type: String,
  },
  items: [
    {
      productId: {
        type: String,
        ref: "Product",
      },
      name: String,
      quantity: {
        type: Number,
        required: true,
        min: [1, "Quantity can not be less then 1."],
      },
      price: Number,
    },
  ],
  amount: {
    type: Number,
    required: true,
  },
  date_added: {
    type: Date,
    default: Date.now,
  },
});

module.exports = Order = mongoose.model("Order", OrderSchema);
