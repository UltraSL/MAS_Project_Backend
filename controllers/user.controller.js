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

exports.addUser = async function (req, res) {
  const body = req.body;

  const result = await cloudinary.uploader.upload(
    req.file.path,
    { folder: "profilePicture" },
    function (error, result) {
      console.log(result, error);
    }
  );

  const { error } = userRegistrationValidation({
    ...body,
  });
  if (error)
    return res.status(200).json({
      code: 200,
      success: false,
      message: error.details[0].message,
    });

  const emailExist = await User.findOne({ email: req.body.email });
  if (emailExist)
    return res
      .status(200)
      .json({ code: 200, success: true, message: "Email already available" });

  const user = new User({
    userName: req.body.userName,
    email: req.body.email,
    image: result.secure_url,
    password: req.body.password,
    language: req.body.language,
    type: "NormalRegister",
  });
  try {
    var savedUser = await user.save();
    savedUser = await User.findOne({ _id: savedUser._id });
    const token = utils.generateAuthToken(user);
    res.status(200).json({
      code: 200,
      success: true,
      token: token,
      data: savedUser,
      message: "Register successfully",
    });
  } catch (error) {
    res
      .status(500)
      .json({ code: 500, success: false, message: "Internal Server Error" });
  }
};
/////////////////////////

///////////////////////////////////
exports.loginUser = async function (req, res) {
  try {
    const { error } = loginValidate(req.body);
    if (error)
      return res.status(200).json({
        code: 200,
        success: false,
        message: error.details[0].message,
      });

    const user = await User.findOne({ email: req.body.email }).select(
      "+password"
    );

    if (!user)
      return res
        .status(200)
        .json({ code: 200, success: false, message: "Invalid userName" });

    const validPassword = await bcrypt.compare(
      req.body.password,
      user.password
    );

    if (!validPassword)
      return res
        .status(200)
        .json({ code: 200, success: false, message: "Invalid Password" });
    const token = utils.generateAuthToken(user);
    res.status(200).json({
      code: 200,
      success: true,
      token: token,
      message: "logged in successfully",
    });
  } catch (error) {
    res
      .status(500)
      .json({ code: 500, success: false, message: "Internal Server Error" });
  }
};

exports.forgotPassword = async function (req, res, next) {
  const { email } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res
        .status(200)
        .json({ code: 200, success: false, message: "User not found" });
    }

    const token = utils.generateAuthToken(user);

    sendForgotEmail(token.token, user);
    res.status(200).json({
      code: 200,
      success: true,
      data: "Please check your email to reset password.",
    });
  } catch (error) {
    res
      .status(500)
      .json({ code: 500, success: false, message: "Internal Server Error" });
  }
};

exports.resetPassword = async function (req, res) {
  try {
    if (req.query.token) {
      const tokenParts = req.query.token.split(" ");

      if (
        tokenParts[0] === "Bearer" &&
        tokenParts[1].match(/\S+\.\S+\.\S+/) !== null
      ) {
        try {
          const verification = jsonwebtoken.verify(
            tokenParts[1],
            process.env.ACCESS_TOKEN_SECRET
          );
          const user = await User.findOne({ email: verification.sub.email });
          if (!user) {
            return res.status(200).json({
              code: 200,
              success: false,
              status: "Unauthorized",
              msg: "Token is invalid. Please contact Administrator",
            });
          }
          user.password = req.body.password;
          await user.save();
          const token = utils.generateAuthToken(user);
          res.status(200).json({
            code: 200,
            success: true,
            data: user,
            token: token,
            message: "Password reset successfully",
          });
        } catch (err) {
          res.status(200).json({
            code: 200,
            success: false,
            status: "Unauthorized1",
            msg: "Can't reset your password. Please contact Administrator",
          });
        }
      } else {
        res.status(200).json({
          code: 200,
          success: false,
          status: "Unauthorized2",
          msg: "Can't reset your password. Please contact Administrator",
        });
      }
    } else {
      res.status(200).json({
        code: 200,
        success: false,
        status: "TokenError",
        msg: "Can't reset your password. Please contact Administrator",
      });
    }
  } catch (error) {
    res
      .status(500)
      .json({ code: 500, success: false, message: "Internal Server Error" });
  }
};

exports.googlelogin = async function (req, res) {
  console.log("1", req);
  try {
    const { tokenId } = req.body;

    client
      .verifyIdToken({
        idToken: tokenId,
        audience:
          "530601765024-73j5qb4rks89g9lab94dieekq45rrr89.apps.googleusercontent.com",
      })
      .then((response) => {
        const { email_verified, name, email, picture } = response.payload;

        // console.log("ssssss",response.payload);
        if (email_verified) {
          User.findOne({ email }).exec(async (err, user) => {
            if (err) {
              res.status(400).json({
                code: 400,
                success: false,
                msg: "something went wrong..",
              });
            } else {
              if (user) {
                const token = jwt.sign(
                  { _id: user._id },
                  process.env.JWT_SIGNIN_KEY,
                  { expiresIn: "2w" }
                );
                const { _id, userName, email } = user;
                res.status(200).json({
                  code: 200,
                  success: true,
                  token,
                  user: { _id, userName, email },
                });
              } else {
                let password = email + process.env.JWT_SIGNIN_KEY;
                let newUser = new User({
                  userName: name,
                  email: email,
                  password: password,
                  type: "GoogleLogin",
                  image: picture,
                });
                // var savedUser = await newUser.save();
                await newUser.save((err, data) => {
                  if (err) {
                    res.status(400).json({
                      code: 400,
                      success: false,
                      msg: "something went wrong..",
                    });
                  }

                  const token = jwt.sign(
                    { _id: data._id },
                    process.env.JWT_SIGNIN_KEY,
                    { expiresIn: "2w" }
                  );

                  const { _id, userName, email } = newUser;

                  res.status(200).json({
                    code: 200,
                    success: true,
                    token,
                    user: { _id, userName, email },
                  });
                });
              }
            }
          });
        }
      });
  } catch (error) {
    res
      .status(500)
      .json({ code: 500, success: false, message: "Internal Server Error" });
  }
};

//dilusha amarasekara
exports.getUser = function (req, res) {
  let followers = [];
  let following = [];
  try {
    // let id = req.jwt.sub.id;
    // console.log(id);
    User.findById(req.params.id, function (err, user) {
      followers = user.followers;
      following = user.following;
      if (err) {
        return res
          .status(200)
          .json({ code: 200, success: false, message: "Invalid ID!" });
      }
      if (user) {
        res.status(200).json({
          code: 200,
          success: true,
          data: user,
          followersCount: followers.length,
          followingsCount: following.length,
          message: "Profile is received",
        });
      } else {
        res.status(200).json({
          code: 200,
          success: false,
          data: user,
          message: "Profile is not found",
        });
      }
    });
  } catch (error) {
    res
      .status(500)
      .json({ code: 500, success: false, message: "Internal Server Error" });
  }
};

exports.getAllUsers = async function (req, res) {
  User.find()
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving User.",
      });
    });
};

exports.followUser = async function (req, res) {
  try {
    const followUserId = req.params.followUserId;
    //const userId = req.jwt.sub.id;
    const userId = req.params.userId;
    if (!mongoose.Types.ObjectId.isValid(followUserId))
      return res.status(200).json({
        code: 200,
        success: false,
        message: `No valid user with id: ${followUserId}`,
      });
    let followUser = await User.findById(followUserId);
    if (!followUser) {
      return res.status(200).json({
        code: 200,
        success: false,
        message: `No valid user with id : ${followUserId}`,
      });
    }

    if (followUserId === userId) {
      return res.status(200).json({
        code: 200,
        success: false,
        message: "You cannot follow yourself",
      });
    }
    let user = await User.findById(userId);
    if (
      followUser.followers.filter((follower) => follower.toString() === userId)
        .length > 0
    ) {
      followUser.followers.remove(userId);
      user.following.remove(followUserId);
      followUser = await followUser.save();
      user = await user.save();
      return res.status(200).json({
        code: 200,
        success: true,
        message: `You unfollowed the user ${followUser.userName}`,
        FollowUser: followUser,
        User: user,
      });
    } else {
      followUser.followers.push(userId);
      user.following.push(followUserId);
      followUser = await followUser.save();
      user = await user.save();
      return res.status(200).json({
        code: 200,
        success: true,
        message: `You followed the user ${followUser.userName}`,
        FollowUser: followUser,
        User: user,
      });
    }
  } catch (error) {
    res
      .status(500)
      .json({ code: 500, success: false, message: "Internal Server Error" });
  }
};

exports.getFollowers = async function (req, res) {
  try {
    const followUserId = req.jwt.sub.id;
    if (!mongoose.Types.ObjectId.isValid(followUserId))
      return res.status(200).json({
        code: 200,
        success: false,
        message: `No valid user with id: ${followUserId}`,
      });
    const followUser = await User.findById(followUserId);
    if (!followUser) {
      return res.status(200).json({
        code: 200,
        success: false,
        message: `No valid user with id : ${followUserId}`,
      });
    }
    const followers = await User.find({ _id: { $in: followUser.followers } });
    console.log(followers.length);
    if (followers.length) {
      return res.status(200).json({
        code: 200,
        success: true,
        message: `count of followers`,
        data: followers.length,
      });
    } else {
      return res.status(200).json({
        code: 200,
        success: false,
        message: `Followers count is empty`,
        data: 0,
      });
    }
  } catch (error) {
    res
      .status(500)
      .json({ code: 500, success: false, message: "Internal Server Error" });
  }
};

exports.getFollowings = async function (req, res) {
  try {
    const userId = req.jwt.sub.id;
    if (!mongoose.Types.ObjectId.isValid(userId))
      return res.status(200).json({
        code: 200,
        success: false,
        message: `No valid user with id: ${userId}`,
      });
    const user = await User.findById(userId);
    if (!user) {
      return res.status(200).json({
        code: 200,
        success: false,
        message: `No valid user with id : ${userId}`,
      });
    }
    const following = await User.find({ _id: { $in: user.following } });
    console.log(following.length);
    if (following.length) {
      return res.status(200).json({
        code: 200,
        success: true,
        message: `Count of following`,
        data: following.length,
      });
    } else {
      return res.status(200).json({
        code: 200,
        success: false,
        message: `Following list is empty`,
        data: 0,
      });
    }
  } catch (error) {
    res
      .status(500)
      .json({ code: 500, success: false, message: "Internal Server Error" });
  }
};

/*exports.updateUserProfileByID = async function(req, res, next) {
    try {
        if (req.params && req.params.id) {
            const {
                userName,
                email,
                password,
                language
            } = req.body;

            await User.findByIdAndUpdate(req.params.id, {
                userName,
                email,
                password,
                language
            });

            const Profile = await User.findById(req.params.id);

            return res.status(200).json({
                code: messages.SuccessCode,
                success: messages.Success,
                status: messages.SuccessStatus,
                data: Profile,
                message: Profile.userName + "profile is Updated.",
            });
        }
    } catch (err) {
        return res.status(500).json({
            code: messages.InternalCode,
            success: messages.NotSuccess,
            status: messages.InternalStatus,
            message: err.message,
        });
    }
};
*/

exports.updateUserProfileByID = async function (req, res) {
  try {
    
    let user = await User.findById(req.params.id);
    let result;
  
    if (req.file.path) {
      result = await cloudinary.uploader.upload(req.file.path);
    }

    const data = {
      userName: req.body.userName || user.userName,
      image: result?.secure_url || user.image,
      email: req.body.email || user.email,
      language: req.body.language || user.language,
    };

    console.log("data",data)
    user = await User.findByIdAndUpdate(req.params.id, data, { new: true });
    res.status(200).json({
      code: 200,
      success: true,
      data: user,
      message: "User Updated Successfully!",
    });
  } catch (err) {
    res
      .status(500)
      .json({ code: 500, success: false, message: "Internal Server Error" });
  }
};
