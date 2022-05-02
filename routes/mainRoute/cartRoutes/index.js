const cartController = require('../../../controllers/cart.controller');
const utils = require("../../../lib/utils");

const router = require("express").Router();

router.post('/addToCart',utils.authMiddleware,cartController.add_cart_item);
router.get('/getCart',utils.authMiddleware,cartController.get_cart_items);
router.put('/cartUpdate',utils.authMiddleware,cartController.update_cart_item);
router.delete('/deleteItem/:itemId',utils.authMiddleware,cartController.delete_item);
router.delete('/deleteCart',utils.authMiddleware,cartController.delete_cart);

module.exports = router;