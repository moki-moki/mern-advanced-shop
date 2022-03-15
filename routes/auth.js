const { registerUser, loginUser, logoutUser } = require("../controllers/auth");
const router = require("express").Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
// router.route("/logout").delete(logoutUser);

module.exports = router;
