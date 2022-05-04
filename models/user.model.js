const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const Schema = mongoose.Schema;

const userSchema = new Schema({
  empNumber: {
    type: String,
    required: true,
  },
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
    select: false
  },
  NICNumber: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    required: true,
  },
  supervisorName:{
    type: String,
    required: true,
  },
  mobile: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    default:"https://www.seekpng.com/png/detail/73-730482_existing-user-default-avatar.png"
  },
});

userSchema.pre("save", async function(next) {
    if (!this.isModified("password")) {
        next();
    }

    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
});


module.exports = mongoose.model("user", userSchema);
