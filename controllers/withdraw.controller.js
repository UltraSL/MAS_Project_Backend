// const SECRET_KEY =
//   "sk_test_51Km4jWH27AFWsP3PBQK8p6OwB3NNsh93Bp7YwpY80IbKKHCgvRvxPmfg0eW4wV672gkode201n4d7ds3d5JFVNt200hfIxlupL";

// // const stripe = require("stripe")(SECRET_KEY);
// const { v4: uuidv4 } = require("uuid");

const Withdraw = require('../models/withdraw.model');
const Point = require('../models/point.model')

exports.addWithdraw = function (req, res, next) {
    const withdraw = new Withdraw({
        fullName: req.body.fullName,
        bankName: req.body.bankName,
        accountNumber: req.body.accountNumber,
        accountType: req.body.accountType,
        email: req.body.email,
        address: req.body.address,
        postalCode: req.body.postalCode,
        country: req.body.country,
        comments: req.body.comments,
      });
      try {
        withdraw.save();
        res.status(200).json({ code: 200, success: true, data: withdraw });
      } catch (error) {
        res
          .status(500)
          .json({ code: 500, success: false, message: "Internal Server Error" });
      }
};

exports.getAmountByUser = function (req, res) {
  try {
    Point.findById(req.params.id, function (err, pointDetails) {
      if (err) {
        return res
          .status(200)
          .json({ code: 200, success: false, data: "Invalid ID!" });
      }
        return res.status(200).json({ code: 200, success: true, data: pointDetails });
    });
  } catch (error) {
    res
      .status(500)
      .json({ code: 500, success: false, message: "Internal Server Error" });
  }
}; 