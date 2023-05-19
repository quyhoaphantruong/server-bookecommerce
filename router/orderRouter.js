const orderCtrl = require("../controllers/orderCtrl");

const router = require("express").Router();

router.get("/admin", orderCtrl.getOrdersForAdmin);
router.get("/admin/:orderId", orderCtrl.getOrderById);
router.post("/:userId", orderCtrl.createOrder);
router.get("/:userId", orderCtrl.getOrderByUser);
router.put("/admin/:orderId", orderCtrl.updateOrder);
router.delete("/admin/:orderId", orderCtrl.deleteOrder);
router.delete("/", orderCtrl.deleteAll);
module.exports = router;
