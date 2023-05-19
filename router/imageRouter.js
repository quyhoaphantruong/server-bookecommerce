const router = require("express").Router();
const imageCtrl = require("../controllers/imageCtrl");

router.route("/").get(imageCtrl.getImages).delete(imageCtrl.deleteImages);

module.exports = router;
