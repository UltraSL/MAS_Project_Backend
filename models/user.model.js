const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const Schema = mongoose.Schema;

const userSchema = new Schema({
  empNumber: {
    type: String,
    required: true,
  },username :{
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
  confirmPassword: {
    type: String,
    select: false
  },
  NICNumber: {
    type: String,
    required: true,
  },
  position: {
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
  department: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    default:"https://www.seekpng.com/png/detail/73-730482_existing-user-default-avatar.png"
  },
});



userSchema.pre("save",async function(next){
  const user=this;
  if(user.isModified("password")){
    user.password=await bcrypt.hash(user.password,10);
  }
  next()
})

userSchema.pre("save",async function(next){
  const user=this;
  if(user.isModified("confirmPassword")){
    user.confirmPassword=await bcrypt.hash(user.confirmPassword,10);
  }
  next()
})


module.exports = mongoose.model("user", userSchema);
