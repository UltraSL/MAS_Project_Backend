const liveController = require("../../../controllers/live.controller");
const uploads = require('../../../lib/multerConfig');
const utils = require("../../../lib/utils");

const router = require("express").Router();

router.post("/create",uploads.single("thumbnail"),utils.authMiddleware, liveController.create);
router.get("/getAllLives",utils.authMiddleware, liveController.getAllLives);
router.get("/getAllRecords",utils.authMiddleware, liveController.getAllRecords);
router.get("/getAllLives&Records",utils.authMiddleware, liveController.getAllLivesRecords);
router.get("/getLive/:id",utils.authMiddleware, liveController.getLiveById);
router.put("/record/:id",utils.authMiddleware, liveController.recordUpload);
router.put("/update/:id", uploads.single("thumbnail"), utils.authMiddleware, liveController.update);
router.delete("/delete/:id",utils.authMiddleware, liveController.delete);
router.get("/addLike/:id",utils.authMiddleware, liveController.addLike);
router.get("/share/:id",utils.authMiddleware, liveController.addSharing);
router.get("/removeSharing/:id",utils.authMiddleware, liveController.removeSharing);
router.get("/watch/:id",utils.authMiddleware, liveController.watch);
router.get("/liveCount/:id",utils.authMiddleware, liveController.getLiveCountByUser); 
router.get("/recordedCount/:id",utils.authMiddleware, liveController.getRecordedCountByUser);  


module.exports = router;
