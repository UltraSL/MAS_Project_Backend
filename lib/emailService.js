const nodemailer = require("nodemailer");
require("dotenv").config({ path: "./.env" });

const transport = nodemailer.createTransport({
  service: process.env.EMAIL_SERVICE,
  auth: {
    user: process.env.EMAIL_USERNAME,
    pass: process.env.EMAIL_PASSWORD,
  },
});
 
function sendForgotEmail (password,user ) {
  transport
    .sendMail({
      from: process.env.EMAIL_FROM,
      to: user.email,
      subject: "Reset your password",
      html: `<h1><b>Hello ${user.firstName} !</b></h1>

                <h4><i>You're on your way!</i></h4>
                <h5>Let's reset your password</h5>
                <p>${password} is your new password</p>`      
    }) 
    .then(() => {
      console.log("Email Sent to " + user.email + " for Reset Password");
    })
    .catch(() => {
      console.log(
        "Email Not Sent to " + user.email + " for Reset Password");
    });
};

module.exports.sendForgotEmail = sendForgotEmail