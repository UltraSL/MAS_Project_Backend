const User = require("../models/user.model");
const mongoose = require("mongoose");
const cloudinary = require("../lib/cloudinary");
const messages = require("../messages/messages");

const { emailVerification, sendForgotEmail } = require("../lib/emailService");

const utils = require("../lib/utils");
const jsonwebtoken = require("jsonwebtoken");
const jwt = require("jsonwebtoken");
const _ = require("lodash");
const { OAuth2Client } = require("google-auth-library");
const client = new OAuth2Client(
  "530601765024-73j5qb4rks89g9lab94dieekq45rrr89.apps.googleusercontent.com"
);

const bcrypt = require("bcrypt");
const { userRegistrationValidation, loginValidate } = require("../validation");


//User Register
exports.addUser = async function (req, res) {
  let userData = req.body;
  User.findOne({ email: req.body.email }, (error, user) => {
    if (error) {
      console.log(error)
    } else if (!user) {
      let user = new User(userData);
      const hash = bcrypt.hashSync(user.password,10)
      user.password = hash
      user.save(async (error, registeredUser) => {
        if (error) {
          console.log(error);
        } else {
          let payload = { subject: registeredUser._id };
          let token = jwt.sign(payload, "secretKey");
          res.status(200).send({ token, user });
        }
      });

    } else {

      return res.status(401).send("Email Already Exists");
    }
  })
};

//User Login
exports.loginUser = async function (req, res) {
  let userData = req.body;
  User.findOne({ email: userData.email }, (error, user) => {
    if (error) {
      console.log(error);
    } else if (!user) {
      res.status(401).send("Invalid email");
    } else {
      bcrypt.compare(userData.password, user.password, (error,result) => {
        if(error){
          console.log(error)
        } else if(!result){
          res.status(402).send("Invalid Password");
        }
        else if(result){
          let payload = { subject: user._id };
          let token = jwt.sign(payload, "secretKey");
          res.status(200).json({ token, user });
        }
      })
    } 
  });
}

