const giftController = require('../../../controllers/gift.controller');

const router = require("express").Router();

router.get("/giftCountByUser/:id", giftController.getGiftCountByUser);

module.exports = router;