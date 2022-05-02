var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var withdrawSchema = new Schema({
  fullName: {
    type: String,
  },
  bankName: {
    type: String,
  },

  accountNumber: {
    type: Number,
  },

  accountType: {
    type: String,
  },
  email: {
    type: String,
  },
  address: {
    type: String,
  },
  postalCode: {
    type: String,
  },
  country: {
    type: String,
  },
  comments: {
    type: String,
  }
});

const withdraw = mongoose.model("withdraw", withdrawSchema);
module.exports = withdraw;
