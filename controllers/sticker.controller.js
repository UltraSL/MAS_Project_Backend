const PointModel = require("../models/point.model");
const StickerModel = require("../models/sticker.model");

const StickerController = {
  getStickerForVideo: async (req, res) => {
    const params = req.params;
    const body = req.body;

    if (params.id) {
      const id = params.id;

      await StickerModel.find({ category: body.category })
        .then((data) => {
          if (!data) {
          } else {
            PointModel.findOne({ userId: id }).then((point) => {
              if (!point) {
                return res
                  .status(400)
                  .json({ code: 400, success: false, message: "Bad request" });
              } else {
                return res.status(200).json({
                  code: 200,
                  success: true,
                  message: "Success",
                  points: point,
                  category: data,
                });
              }
            });
          }
        })
        .catch((err) => {
          res.status(500).json({
            code: 500,
            status: "Internal Server Error",
            success: false,
            message: err.message,
          });
        });
    }
  },
};

module.exports = StickerController;
