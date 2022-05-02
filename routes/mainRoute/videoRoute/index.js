const videoController = require("../../../controllers/video.controller");
const upload = require("../../../lib/multerConfig");
const utils = require("../../../lib/utils");

const router = require("express").Router();

router.post(
  "/uploadVideo",utils.authMiddleware,
  upload.single("video"),
  videoController.uploadVideo
);

router.get("/getAllVideos",utils.authMiddleware, videoController.getAllVideo);

router.get("/getVideoById/:id", videoController.getVideoById);

router.get("/getVideoByLoggedUser",utils.authMiddleware, videoController.getVideoByLoggedUser);

router.put(
  "/updateVideo/:id",
  upload.single("video"),
  videoController.updateVideo
);

router.delete("/deleteVideo/:id", videoController.deleteVideo);

router.get("/likeVideo/:id", utils.authMiddleware, videoController.likeVideo);

router.get("/getLikeCount/:id", utils.authMiddleware, videoController.getLikeCount);

module.exports = router;
