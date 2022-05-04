const nodemailer = require("nodemailer");
require("dotenv").config({ path: "./.env" });

const transport = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'doctorapp100@gmail.com',
    pass: 'doctor@100'
  }
});

exports.sendForgotEmail = async function (token,user ) {
  transport
    .sendMail({
      from: "doctorapp100@gmail.com",
      to: user.email,
      subject: "Reset your password",
      html: `<h1><b>Hello ${user.firstName} !</b></h1>

                <h4><i>You're on your way!</i></h4>
                <h5>Let's reset your password</h5>
                <p>By clicking on the following link, you can reset your password.</p>
                <a href="${process.env.BASE_URL}/user/resetpassword?token=${token}"><b><i> Reset Password </i></b></a>`,
    })
    .then(() => {
      console.log("Email Sent to " + user.email + " for Reset Password");
    })
    .catch(() => {
      console.log(
        "Email Not Sent to " + user.email + " for Reset Password");
    });
};
