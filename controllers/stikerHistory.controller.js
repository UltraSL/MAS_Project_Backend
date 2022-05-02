const StickerHistory = require("../models/stikerHistory.model");

exports.saveSticker = async function (req, res) {

  const { userId, videoId, category, types, owenerId } = req.body;
  console.log("data", req.body);
  try {
    if (!req.body) {
      return res.status(400).json({
        code: 400,
        status: "Bad Request",
        Success: false,
        message: "All field must be entered.",
      });
    } else {

      const newStickerHistory = new StickerHistory({
        userId,
        category,
        types,
        videoId,
        owenerId


      });

      await newStickerHistory.save();
      return res.status(200).json({
        code: 200,
        status: "Success",
        Success: true,
        Details: newStickerHistory,
      });
    }
  } catch (error) {
    return res.status(400).json({
      code: 400,
      status: "Bad Request",
      Success: false,
      message: error.message,
    });
  }
};

exports.getStikersById = function (req, res) {

  StickerHistory.find({ owenerId: req.params.owenerId })
  .then((data) => {
    if (!data) {
   console.log("error");

    }
    else {
      console.log(">>>>>>>>", data);
      return res.status(200).json({
        code: 200,
        success: true,
        message: "Success",
        category: data,
      });
    }
  });

}
