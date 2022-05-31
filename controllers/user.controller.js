const User = require("../models/user.model");
const Driver = require("../models/driver.model")
const cloudinary = require("../lib/cloudinary");
const { sendForgotEmail } = require("../lib/emailService");
const utils = require("../lib/utils");
const jsonwebtoken = require("jsonwebtoken");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
var randomstring = require("randomstring");
const nodemailer = require('nodemailer');
const { userRegistrationValidation, loginValidate } = require("../validation");

//user registration
exports.addUser = async function (req, res) {
  const body = req.body;

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
  console.log(body);
  const user = new User({
    empNumber: body.empNumber,
    username: body.username,
    firstName: body.firstName,
    lastName: body.lastName,
    email: body.email,
    password: body.password,
    confirmPassword: body.confirmPassword,
    position: body.position,
    mobile: body.mobile,
    supervisorName: body.supervisorName,
    NICNumber: body.NICNumber,
    department: body.department,
  });
  if (body.position == "driver") {
    const driver = new Driver({
      name: body.username,
      mobile: body.mobile
    });
    await driver.save()

  }
  try {
    var savedUser = await user.save();
    const token = utils.generateAuthToken(savedUser);

    res.status(200).json({
      code: 200,
      success: true,
      data: savedUser,
      token: token,
      message: "Registration Successfully",
    });
  } catch (error) {
    res
      .status(500)
      .json({ code: 500, success: false, message: "Internal Server Error" });
  }
};
//user login

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
    console.log("1");
    const token = utils.generateAuthToken(user);

    res.status(200).json({
      code: 200,
      success: true,
      token: token,
      data: user,
      message: "logged in successfully",
    });
  } catch (error) {
    res
      .status(500)
      .json({ code: 500, success: false, message: "Internal Server Error" });
  }
};

/*
 
exports.loginUser = async function (req, res) {
var AdminData = req.body;
console.log(AdminData);
User.findOne({ email: AdminData.email }, (error, User) => {
  if (error) {
    console.log(error);
  } else if (!User) {
    res.status(401).send("Invalid email");
    
  } else {

    bcrypt.compare(AdminData.password, User.password, (error,result) => {
      if(error){
        console.log(error)
      } else if(!result){
        res.status(402).send("Invalid Password");
      }
      else if(result){
        let payload = { subject: User._id };
        let AdminToken = jwt.sign(payload, "secretKey");
        console.log("no Error password")
        res.status(200).json({ AdminToken, User });
      }
    })

  } 

});
};

*/

//get user by id
exports.getUser = function (req, res) {
  try {
    User.findById(req.params.id, function (err, user) {
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
//get all users
exports.getAllUsers = async function (req, res) {
  User.find()
    .then((data) => {
      return res.status(200).json({
        code: 200,
        success: true,
        data: data,
        message: "Users are received",
      });
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving User.",
      });
    });
};
//user update
exports.updateUserProfileByID = async function (req, res) {
  console.log("1")
  try {
    let user = await User.findById(req.params.id);
    let result;
    console.log("1")
    if (req.files.image) {
      result = await cloudinary.uploader.upload(req.files.image[0].path);
      console.log("1")
      const data = {
        firstName: req.body.firstName || user.firstName,
        username: req.body.username || user.username,
        image: result.secure_url || user.image,
        lastName: req.body.lastName || user.lastName,
        email: req.body.email || user.email,
        mobile: req.body.mobile || user.mobile,
        supervisorName: req.body.supervisorName || user.supervisorName,
        NICNumber: req.body.NICNumber || user.NICNumber,
        position: req.body.position || user.position,
        department: req.body.department || user.department,
      };
      console.log("1")
      console.log("data", data);
      user = await User.findByIdAndUpdate(req.params.id, data, { new: true });
      res.status(200).json({
        code: 200,
        success: true,
        data: user,
        message: "User Updated Successfully!",
      });
    } else {
      const data = {
        firstName: req.body.firstName || user.firstName,
        username: req.body.username || user.username,
        lastName: req.body.lastName || user.lastName,
        email: req.body.email || user.email,
        mobile: req.body.mobile || user.mobile,
        supervisorName: req.body.supervisorName || user.supervisorName,
        NICNumber: req.body.NICNumber || user.NICNumber,
        position: req.body.position || user.position,
        department: req.body.department || user.department,
      };
      user = await User.findByIdAndUpdate(req.params.id, data, { new: true });
      res.status(200).json({
        code: 200,
        success: true,
        data: user,
        message: "User Updated Successfully!",
      });
    }
  } catch (err) {
    res
      .status(500)
      .json({ code: 500, success: false, message: "Internal Server Error" });
  }
};

//update without image
//user update
exports.updateUserDetailsByID = async function (req, res) {
  try {
    let user = await User.findById(req.params.id);
    let result;

    const data = {
      firstName: req.body.firstName || user.firstName,
      // image: result.secure_url || user.image,
      lastName: req.body.lastName || user.lastName,
      email: req.body.email || user.email,
      mobile: req.body.mobile || user.mobile,
      supervisorName: req.body.supervisorName || user.supervisorName,
      position: req.body.position || user.position,
      department: req.body.department || user.department,
    };

    console.log("data", data);
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


//forgot password
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
//reset password
// exports.resetPassword = async function (req, res) {
//   try {
//     if (req.query.token) {
//       const tokenParts = req.query.token.split(" ");

//       if (
//         tokenParts[0] === "Bearer" &&
//         tokenParts[1].match(/\S+\.\S+\.\S+/) !== null
//       ) {
//         try {
//           const verification = jsonwebtoken.verify(
//             tokenParts[1],
//             process.env.ACCESS_TOKEN_SECRET
//           );
//           const user = await User.findOne({ email: verification.sub.email });
//           if (!user) {
//             return res.status(200).json({
//               code: 200,
//               success: false,
//               status: "Unauthorized",
//               msg: "Token is invalid. Please contact Administrator",
//             });
//           }
//           user.password = req.body.password;
//           await user.save();
//           const token = utils.generateAuthToken(user);
//           res.status(200).json({
//             code: 200,
//             success: true,
//             data: user,
//             token: token,
//             message: "Password reset successfully",
//           });
//         } catch (err) {
//           res.status(200).json({
//             code: 200,
//             success: false,
//             status: "Unauthorized1",
//             msg: "Can't reset your password. Please contact Administrator",
//           });
//         }
//       } else {
//         res.status(200).json({
//           code: 200,
//           success: false,
//           status: "Unauthorized2",
//           msg: "Can't reset your password. Please contact Administrator",
//         });
//       }
//     } else {
//       res.status(200).json({
//         code: 200,
//         success: false,
//         status: "TokenError",
//         msg: "Can't reset your password. Please contact Administrator",
//       });
//     }
//   } catch (error) {
//     res
//       .status(500)
//       .json({ code: 500, success: false, message: "Internal Server Error" });
//   }
// };

//user delete

exports.deleteUser = async function (req, res) {
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    res.status(200).json({
      code: 200,
      success: true,
      data: user,
      message: "User Deleted Successfully!",
    });
  } catch (err) {
    res

      .status(500)
      .json({ code: 500, success: false, message: "Internal Server Error" });
  }
};

//Get User By department and position
exports.getAllSupervisorsByDepartment = async function (req, res) {
  User.find({ position: "manager", department: req.params.department })
    .exec(function (err, users) {
      if (err) {
        res.status(400).json("Not success");
      } else {
        res.status(200).json(users);
      }
    })
}

//forgot password random password send
exports.resetPassword = async function (req, res) {

  const randomPw = randomstring.generate({
    length: 12,
    charset: 'alphabetic'
  });

  console.log("Random pw :" +randomPw)
  const hash = bcrypt.hashSync(randomPw, 10)

  User.findOneAndUpdate({ email: req.params.email }, {
    $set: { password: hash }
  }, {
    new: true,
  },
    function (err, updatedUser) {
      if (err) {
        res.send("Error updating user");
      }
      var transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: 'doctorapp100@gmail.com',
          pass: 'doctor@100'
        }
      });
 
      var mailOptions = {
        from: 'doctorapp100@gmail.com',
        to: `${req.params.email}`,
        subject: "This is Your New Password For MAS System. We recommend you to change it next time you log",
        text: `${randomPw}`
      };

      transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
          console.log(error);
          return res.status(401).send("Wrong Email or Phone Number");
        } else {
          console.log('Email sent: ' + info.response);
          console.log('Email sent to :' + req.body.email)
          
        }
      });
      res.json(updatedUser)
    })

}


 

exports.changePassword = async function (req, res) {

  const randomPw = randomstring.generate({
    length: 12,
    charset: 'alphabetic'
  });
  console.log("RAndom pw :" +randomPw)

  const hash = bcrypt.hashSync(randomPw, 10)
  console.log(hash)
  User.findOneAndUpdate({ email: req.params.email }, {
    $set: { password: hash }
  }, {
    new: true,
  },
    function (err, updatedUser) {
      if (err) {
        res.send("Error updating user");
      }
      res.json(updatedUser)
    })
}
