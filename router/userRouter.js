const userCtrl = require("../controllers/userCtrl");

const multer = require("multer");
const { verifyToken } = require("../middleware/verityToken");
const upload = multer({ dest: "/uploads" });

const router = require("express").Router();

router.get("/admin", userCtrl.getUsers);
router.get("/verify-user", verifyToken, userCtrl.verifyUser);
router.get("/:userId", userCtrl.getUser);
router.delete("/", userCtrl.deleteAll);
router.delete("/:userId", userCtrl.deleteUser);
router.put("/:userId", upload.single("profileImage"), userCtrl.updateUser);

module.exports = router;
