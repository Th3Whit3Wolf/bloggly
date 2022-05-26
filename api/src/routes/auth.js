const { Router } = require("express");
const { AuthController } = require("../controller");

console.log(AuthController.login);

const router = Router();

router.route("/login").post(AuthController.login);
router.route("/logout").get(AuthController.logout);
router.route("/register").post(AuthController.signup);

module.exports = router;
