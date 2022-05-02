const PointModel = require("../models/point.model");

const PointController = {
  updatePoint: async (req, res) => {
    const params = req.params;
    const body = req.body;
    try {
      if (params.id) {
        const id = params.id;
        await PointModel.findOne({ userId: id }).then((pointData) => {
          if (!pointData) {
            return res
              .status(400)
              .json({ code: 400, success: false, message: "Bad request" });
          } else {
            const newPoint = pointData.points - body.sentPoint;

            PointModel.updateOne(
              { userId: id },
              {
                points: newPoint,
              },
              (err, data) => {
                if (err) {
                  return res.status(500).json({
                    code: 500,
                    success: false,
                    message: "Internal Server Error",
                  });
                } else if (!data) {
                  return res.status(400).json({
                    code: 400,
                    success: false,
                    message: "Bad request",
                  });
                } else {
                  return res.status(200).json({
                    code: 200,
                    success: true,
                    message: "Success",
                    points: newPoint,
                  });
                }
              }
            );
          }
        });
      }
    } catch (error) {
      res.status(500).json({
        code: 500,
        status: "Internal Server Error",
        success: false,
        message: error.message,
      });
    }
  },
};

module.exports = PointController;
