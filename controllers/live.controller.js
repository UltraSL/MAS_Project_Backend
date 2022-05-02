const Live = require("../models/live.model");
const mongoose = require("mongoose");
const cloudinary = require("../lib/cloudinary");
const e = require("express");

const live_status = "LIVE";
const recorded_status = "RECORDED";

exports.create = async function (req, res) {
  try {
    if (!req.body) {
      return res.status(200).json({
        code: 200,
        success: false,
        message: "Content can not be empty",
      });
    }
    if (!req.file) {
      return res.status(200).json({
        code: 200,
        success: false,
        message: "Thumbnail can not be empty",
      });
    }
    const result = await cloudinary.uploader.upload(req.file.path, {
      resource_type: "image",
      folder: "live_thumbnail",
    });

    const live = new Live({
      userId: req.jwt.sub.id,
      url: req.body.url,
      status: live_status,
      description: req.body.description,
      thumbnail_url: result.secure_url,
      cloudinary_id: result.public_id,
    });
    await live.save();
    return res.status(200).json({
      code: 200,
      success: true,
      message: "Live is created successfully",
      data: live,
    });
  } catch (err) {
    res.status(500).send({
      code: 500,
      success: false,
      message: "Internal Server Error",
    });
  }
};

exports.getAllLives = function (req, res) {
  try {
    Live.aggregate([
      {
        $lookup: {
          from: "users",
          localField: "userId",
          foreignField: "_id",
          as: "userDetails",
        },
      },{
        $match: {"status": live_status}
      },{
        $addFields: {
          likeCount: { $size: "$likes" },
          viewsCount: { $size: "$views" },
          shareCount: { $size: "$sharing" }
        }
      }
    ]).exec(function (err, lives) {
      if (err) {
        return res.json({ status: false, data: "Invalid Request!" });
      }

      return res.json({ status: true, data: lives });
    });
  } catch (err) {
    res
      .status(500)
      .json({ code: 500, success: false, message: "Internal Server Error" });
  }
}


exports.getAllRecords = function (req, res) {
  try {
    Live.aggregate([
      {
        $lookup: {
          from: "users",
          localField: "userId",
          foreignField: "_id",
          as: "userDetails",
        },
      },{
        $match: {"status": recorded_status}
      },{
        $addFields: {
          likeCount: { $size: "$likes" },
          viewsCount: { $size: "$views" },
          shareCount: { $size: "$sharing" }
        }
      }
    ]).exec(function (err, records) {
      if (err) {
        return res.json({ status: false, data: "Invalid Request!" });
      }

      return res.json({ status: true, data: records });
    });
  } catch (err) {
    res
      .status(500)
      .json({ code: 500, success: false, message: "Internal Server Error" });
  }
};



exports.getAllLivesRecords = function (req, res) {
  try {
    Live.aggregate([
      {
        $lookup: {
          from: "users",
          localField: "userId",
          foreignField: "_id",
          as: "userDetails",
        },
      },{
        $addFields: {
          likeCount: { $size: "$likes" },
          viewsCount: { $size: "$views" },
          shareCount: { $size: "$sharing" }
        }
      }
    ]).exec(function (err, data) {
      if (err) {
        return res.json({ status: false, data: "Invalid Request!" });
      }

      return res.json({ status: true, data: data });
    });
  } catch (err) {
    res
      .status(500)
      .json({ code: 500, success: false, message: "Internal Server Error" });
  }
};


exports.getLiveById = function (req, res) {
  try {
    if (!mongoose.Types.ObjectId.isValid(req.params.id))
      return res.status(200).json({
        code: 200,
        success: false,
        message: `No live with id: ${req.params.id}`,
      });
    Live.findById(req.params.id, function (err, live) {
      if (err) {
        return res
          .status(200)
          .json({ code: 200, success: false, message: "Invalid live id" });
      }
      if (live) {
        return res.status(200).json({
          code: 200,
          success: true,
          message: "Live is received",
          data: live,
        });
      } else {
        return res
          .status(200)
          .json({ code: 200, success: false, message: "No live found" });
      }
    });
  } catch (error) {
    res
      .status(500)
      .json({ code: 500, success: false, message: "Internal Server Error" });
  }
};

exports.recordUpload = async function (req, res) {
  try {
    if (!req.body) {
      return res.status(200).json({
        code: 200,
        success: false,
        message: "Content can not be empty",
      });
    }
    const id = req.params.id;
    const userId = req.jwt.sub.id;
    if (!mongoose.Types.ObjectId.isValid(id))
      return res.status(200).json({
        code: 200,
        success: false,
        message: `No live with id: ${id}`,
      });
    let live = await Live.findById(id);
    if (!live) {
      return res
        .status(200)
        .json({ code: 200, success: false, message: `No live with id: ${id}` });
    }
    //code for saving recorded video in storage.
    if (live.userId.toString() === userId) {
      const updatedLive = {
        userId: live.userId,
        url: req.body.url,
        status: recorded_status,
        duration: req.body.duration,
        likes: live.likes,
        sharing: live.sharing,
        views: live.views,
      };
      const recordedLive = await Live.findByIdAndUpdate(id, updatedLive, {
        new: true,
      });
      return res.status(200).json({
        code: 200,
        success: true,
        message: "Live is recorded successfully",
        data: recordedLive,
      });
    } else {
      return res.status(200).json({
        code: 200,
        success: false,
        message: "You cannot upload another one's live record",
      });
    }
  } catch (err) {
    res.status(500).send({
      code: 500,
      success: false,
      message: "Internal Server Error",
    });
  }
};

exports.update = async function (req, res) {
  try {
    if (!req.body) {
      return res.status(200).json({
        code: 200,
        success: false,
        message: "Content can not be empty",
      });
    }
    const id = req.params.id;
    const userId = req.jwt.sub.id;
    if (!mongoose.Types.ObjectId.isValid(id))
      return res.status(200).json({
        code: 200,
        success: false,
        message: `No live with id: ${id}`,
      });
    let live = await Live.findById(id);
    if (!live) {
      return res
        .status(200)
        .json({ code: 200, success: false, message: `No live with id: ${id}` });
    }

    if (live.userId.toString() === userId) {

      let result;
      if (req.file) {
        result = await cloudinary.uploader.upload(req.file.path, {
          resource_type: "image",
          folder: "live_thumbnail",
        });
      }
      const updatedLive = {
        userId: live.userId,
        url: req.body.url,
        status: live.status,
        description: req.body.description,
        thumbnail_url: result?.secure_url || live.thumbnail_url,
        cloudinary_id: result?.public_id || live.cloudinary_id,
        duration: req.body.duration,
        likes: live.likes,
        sharing: live.sharing,
        views: live.views,
      };
      const updatedLiveData = await Live.findByIdAndUpdate(id, updatedLive, {
        new: true,
      });
      return res.status(200).json({
        code: 200,
        success: true,
        message: "Live is updated successfully",
        data: updatedLiveData,
      });
    } else {
      return res.status(200).json({
        code: 200,
        success: false,
        message: "You cannot update another one's live record",
      });
    }
  } catch (err) {
    res.status(500).send({
      code: 500,
      success: false,
      message: "Internal Server Error",
    });
  }
};

exports.delete = async function (req, res) {
  try {
    const id = req.params.id;
    const userId = req.jwt.sub.id;
    if (!mongoose.Types.ObjectId.isValid(id))
      return res
        .status(200)
        .json({ code: 200, success: false, message: `No live with id: ${id}` });
    let live = await Live.findById(id);
    if (!live) {
      return res
        .status(200)
        .json({ code: 200, success: false, message: `No live with id: ${id}` });
    }
    if (live.userId === userId) {
      Live.remove({ _id: req.params.id }, function (err, live) {
        if (err) {
          return res
            .status(200)
            .json({ code: 200, success: false, message: "Unable to delete" });
        }
        return res.status(200).json({
          code: 200,
          success: true,
          message: "Live is removed successfully",
          data: live,
        });
      });
    } else {
      return res.status(200).json({
        code: 200,
        success: false,
        message: "You cannot delete another one's live record",
      });
    }
  } catch (error) {
    res
      .status(500)
      .json({ code: 500, success: false, message: "Internal Server Error" });
  }
};

exports.addLike = async function (req, res) {
  try {
    const id = req.params.id;
    const userId = req.jwt.sub.id;
    if (!mongoose.Types.ObjectId.isValid(id))
      return res
        .status(200)
        .json({ code: 200, success: false, message: `No live with id: ${id}` });
    let live = await Live.findById(id);
    if (!live) {
      return res
        .status(200)
        .json({ code: 200, success: false, message: `No live with id: ${id}` });
    }
    const index = live.likes.findIndex((id) => String(id) === String(userId));
    if (index === -1) {
      live.likes.push(userId);
      live = await live.save();
    } else {
      live.likes = live.likes.filter((id) => String(id) !== String(userId));
      live = await live.save();
    }
    const updatedLive = await Live.findByIdAndUpdate(id, live, {
      new: true,
    });
    res.status(200).json({ code: 200, success: true, data: updatedLive });
  } catch (err) {
    res
      .status(500)
      .json({ code: 500, success: false, message: "Internal Server Error" });
  }
};

exports.addSharing = async function (req, res) {
  try {
    const id = req.params.id;
    const userId = req.jwt.sub.id;
    if (!mongoose.Types.ObjectId.isValid(id))
      return res
        .status(200)
        .json({ code: 200, success: false, message: `No live with id: ${id}` });
    let live = await Live.findById(id);
    if (!live) {
      return res
        .status(200)
        .json({ code: 200, success: false, message: `No live with id: ${id}` });
    }
    if (
      live.sharing.filter((sharer) => sharer.toString() === userId).length === 0
    ) {
      live.sharing.push(userId);
      live = await live.save();
      return res.status(200).json({
        code: 200,
        success: true,
        message: `You shared the live`,
        data: live,
      });
    } else {
      return res.status(200).json({
        code: 200,
        success: false,
        message: `You already shared the live`,
        data: live,
      });
    }
  } catch (error) {
    res
      .status(500)
      .json({ code: 500, success: false, message: "Internal Server Error" });
  }
};

exports.removeSharing = async function (req, res) {
  try {
    const id = req.params.id;
    const userId = req.jwt.sub.id;
    if (!mongoose.Types.ObjectId.isValid(id))
      return res
        .status(200)
        .json({ code: 200, success: false, message: `No live with id: ${id}` });
    let live = await Live.findById(id);
    if (!live) {
      return res
        .status(200)
        .json({ code: 200, success: false, message: `No live with id: ${id}` });
    }
    if (
      live.sharing.filter((sharer) => sharer.toString() === userId).length > 0
    ) {
      live.sharing.remove(userId);
      live = await live.save();
      return res.status(200).json({
        code: 200,
        success: true,
        message: `You removed the sharing the live`,
        data: live,
      });
    } else {
      return res.status(200).json({
        code: 200,
        success: false,
        message: `You already removed the sharing the live`,
        data: live,
      });
    }
  } catch (error) {
    res
      .status(500)
      .json({ code: 500, success: false, message: "Internal Server Error" });
  }
};

exports.watch = async function (req, res) {
  try {
    const id = req.params.id;
    const userId = req.jwt.sub.id;
    if (!mongoose.Types.ObjectId.isValid(id))
      return res
        .status(200)
        .json({ code: 200, success: false, message: `No live with id: ${id}` });
    let live = await Live.findById(id);
    if (!live) {
      return res
        .status(200)
        .json({ code: 200, success: false, message: `No live with id: ${id}` });
    }
    if (
      live.views.filter((viewer) => viewer.toString() === userId).length ===
        0 &&
      live.userId !== userId
    ) {
      live.views.push(userId);
      live = await live.save();
      return res.status(200).json({
        code: 200,
        success: true,
        message: `You are watching first time this live`,
        data: live,
      });
    } else {
      return res.status(200).json({
        code: 200,
        success: true,
        message: `You already watched this live`,
        data: live,
      });
    }
  } catch (error) {
    res
      .status(500)
      .json({ code: 500, success: false, message: "Internal Server Error" });
  }
};

exports.getLiveCountByUser = function (req, res) {
  try {
    if (!mongoose.Types.ObjectId.isValid(req.params.id))
      return res.status(200).json({
        code: 200,
        success: false,
        message: `No user with id: ${req.params.id}`,
      });
    Live.count(
      { userId: req.params.id, status: live_status },
      function (err, count) {
        if (err) {
          return res
            .status(200)
            .json({ code: 200, success: false, message: "Invalid Request" });
        }
        if (count > 0) {
          return res.json({
            code: 200,
            success: true,
            message: "count received",
            data: count,
          });
        } else {
          return res.json({
            code: 200,
            success: false,
            message: "Live list is empty for this user",
            data: count,
          });
        }
      }
    );
  } catch (error) {
    res
      .status(500)
      .json({ code: 500, success: false, message: "Internal Server Error" });
  }
};

exports.getRecordedCountByUser = function (req, res) {
  try {
    if (!mongoose.Types.ObjectId.isValid(req.params.id))
      return res.status(200).json({
        code: 200,
        success: false,
        message: `No user with id: ${req.params.id}`,
      });
    Live.count(
      { userId: req.params.id, status: recorded_status },
      function (err, count) {
        if (err) {
          return res
            .status(200)
            .json({ code: 200, success: false, message: "Invalid Request" });
        }
        if (count > 0) {
          return res.json({
            code: 200,
            success: true,
            message: "count received",
            data: count,
          });
        } else {
          return res.json({
            code: 200,
            success: false,
            message: "Recorded list is empty for this user",
            data: count,
          });
        }
      }
    );
  } catch (error) {
    res
      .status(500)
      .json({ code: 500, success: false, message: "Internal Server Error" });
  }
};
