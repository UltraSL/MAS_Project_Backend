const productController = require("../../../controllers/product.controller");
const upload = require("../../../lib/multerConfig");
const utils = require("../../../lib/utils");

const router = require("express").Router();

router.post(
  "/createProduct",
  utils.authMiddleware,
  upload.single("file"),
  productController.createProduct
);

router.get("/getProductList", productController.getProductList);

router.get("/getProductDetails/:id", productController.getProductDetailsById);

router.get(
  "/getOwnProductDetails",
  utils.authMiddleware,
  productController.getOwnProductDetails
);
router.get("/getProductsByUserId/:id", productController.getProductsByUserId);

router.put(
  "/updateProduct/:id",
  utils.authMiddleware,
  upload.single("file"),
  productController.updateProduct
);

router.delete("/deleteProduct/:id", productController.deleteProduct);

module.exports = router;
