const Gift = require('../models/gift.model');

exports.getGiftCountByUser = function (req, res) {
    Gift.findOne({user_id: req.params.id}).exec(function (err, giftData) {
      if (err) {
        return res
            .status(200)
            .json({ code: 200, success: false, data: "Invalid ID!" });
      } else {
        return res.status(200).json({ code: 200, success: true, data: giftData });
      }
    })
  }; 