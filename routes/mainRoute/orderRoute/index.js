const orderController = require("../../../controllers/order.controller");
const utils = require("../../../lib/utils");
const router = require("express").Router();

router.post('/saveOrderHistory',utils.authMiddleware, orderController.save_order_history);
router.get('/getOrderHistory',utils.authMiddleware,orderController.get_orders_history);


module.exports = router;