const Video = require("../models/video.model");
const cloudinary = require("../lib/cloudinary");
const mongoose = require("mongoose");

exports.uploadVideo = async function (req, res) {
  try {
    const result = await cloudinary.uploader.upload(req.file.path, {
      resource_type: "video",
      folder: "video",
    });

    const image = cloudinary.url(result.public_id + ".jpg", {
      start_offset: "2",
      resource_type: "video",
      duration: "2",
    });

    let video = new Video({
      userId: req.jwt.sub.id,
      name: req.body.name,
      cloudinary_id: result.public_id,
      url: result.secure_url,
      image: image,
      duration: result.duration,
      description: req.body.description,
    });
    await video.save();
    res.status(200).json({ code: 200, success: true, data: video });
  } catch (err) {
    res.status(500).send({
      message: err.message || "Some error occurred while uploading videos.",
    });
  }
};

exports.getAllVideo = async function (req, res) {
  Video.find()
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving videos.",
      });
    });
};

exports.getVideoById = function (req, res) {
  try {
    Video.findById(req.params.id, function (err, videos) {
      if (err) {
        return res
          .status(200)
          .json({ code: 200, success: false, data: "Invalid ID!" });
      }
      // if(videos.length){
        return res.status(200).json({ code: 200, success: true, data: videos });
      // } else {
      //   return res.status(200).json({ code: 200, success: false, data: "No video found!" });
      // }
    });
  } catch (error) {
    res
      .status(500)
      .json({ code: 500, success: false, message: "Internal Server Error" });
  }
};


exports.getVideoByLoggedUser = function (req, res) {
  try {
    Video.find({ userId: req.jwt.sub.id }, function (err, videos) {
      if (err) {
        return res
          .status(200)
          .json({ code: 200, success: false, data: "Invalid ID!" });
      }
      if(videos.length){
        return res.status(200).json({ code: 200, success: true, data: videos });
      } else {
        return res.status(200).json({ code: 200, success: false, data: "No videos found!" });
      }
      
    });
  } catch (error) {
    res
      .status(500)
      .json({ code: 500, success: false, message: "Internal Server Error" });
  }
};

exports.updateVideo = async function (req, res) {
  try {
    let video = await Video.findById(req.params.id);
    
    await cloudinary.uploader.destroy(video.cloudinary_id, {
      invalidate: true,
      resource_type: "video",
    });
    
    let result, image;
    if (req.file) {
      result = await cloudinary.uploader.upload(
        req.file.path,
        { resource_type: "video", folder: "video" },
        function (error, result) {
          console.log(result, error);
        }
      );
      image = cloudinary.url(result.public_id + ".jpg", {
        start_offset: "2",
        resource_type: "video",
        duration: "2",
      });
    }
    const data = {
      userId : req.body.userId||video.userId,
      name: req.body.name || video.name,
      cloudinary_id: result?.public_id || video.cloudinary_id,
      url: result?.secure_url || video.url,
      image: image || video.image,
      duration: result?.duration || video.duration,
      description: req.body.description || video.description,
    };
    video = await Video.findByIdAndUpdate(req.params.id, data, { new: true });

    res
      .status(200)
      .json({
        code: 200,
        success: true,
        data: video,
        message: "Update video Successfully",
      });
  } catch (err) {
    res
      .status(500)
      .json({ code: 500, success: false, message: "Internal Server Error" });
  }
};

exports.deleteVideo = async function (req, res) {
  try {
    let video = await Video.findById(req.params.id);

    await cloudinary.uploader.destroy(video.cloudinary_id, {
      invalidate: true,
      resource_type: "video",
    });

    await video.remove();
    res
      .status(200)
      .json({ code: 200, success: true, data: "Video is Deleted!" });
  } catch (err) {
    res
      .status(500)
      .json({ code: 500, success: false, message: "Internal Server Error" });
  }
};

exports.likeVideo = async function (req, res) {
  try {
    const id = req.params.id;
    const userId = req.jwt.sub.id;
    if (!mongoose.Types.ObjectId.isValid(id))
      return res.status(200).send(`No video with id: ${id}`);
    const video = await Video.findById(id);
    if (!video) {
      return res.status(200).json(`No video with id: ${id}`);
    }
    const index = video.likes.findIndex((id) => String(id) === String(userId));
    if (index === -1) {
      video.likes.push(userId);
    } else {
      video.likes = video.likes.filter((id) => String(id) !== String(userId));
    }
    const updatedVideo = await Video.findByIdAndUpdate(id, video, {
      new: true,
    });
    res.status(200).json({ code: 200, success: true, data: updatedVideo });
  } catch (err) {
    res
      .status(500)
      .json({ code: 500, success: false, message: "Internal Server Error" });
  }
};

exports.getLikeCount = async function (req, res) {
  try {
    const id = req.params.id;
    const video = await Video.findById(id);
    if (!video) {
      return res.status(200).json({ code: 200, success: true, data: "Video not found" });
    }
    const count = video.likes.length;
    res.status(200).json({ code: 200, success: true, like_count: count });
  } catch (err) {
    res
      .status(500)
      .json({ code: 500, success: false, message: "Internal Server Error" });
  }
}