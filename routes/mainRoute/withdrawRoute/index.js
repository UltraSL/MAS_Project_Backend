const withdrawController = require("../../../controllers/withdraw.controller");

const router = require("express").Router();

router.get("/remainingAmountByUser/:id", withdrawController.getAmountByUser);
router.post("/withdrawSubmit", withdrawController.addWithdraw);

module.exports = router;