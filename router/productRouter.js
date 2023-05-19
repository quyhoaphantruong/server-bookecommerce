const productCtrl = require("../controllers/productCtrl");
const multer = require("multer");

const upload = multer({ dest: "/uploads" });

const router = require("express").Router();

router.post("/", upload.array("productImages"), productCtrl.createProduct);
router.post(
  "/product-images",
  upload.array("productImages"),
  productCtrl.addImage
);
router.get("/", productCtrl.getProducts);
router.get("/recent", productCtrl.getRecentProducts);
router.get("/category/:categorySlug", productCtrl.getProductsByCategory);
router.get("/admin", productCtrl.getProductsForAdmin);
router.get("/:productId", productCtrl.getProductById);
router.put("/:productId", productCtrl.updateProductById);
router.delete("/:productId", productCtrl.deleteProduct);
router.delete("/product-image/:imageId", productCtrl.deleteProductImage);

module.exports = router;
