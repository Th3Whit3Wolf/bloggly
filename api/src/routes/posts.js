const { Router } = require("express");
const { PostController } = require("../controller");
const { isAuthenticated } = require("../middleware");

const router = Router();

router
	.route("/posts")
	.get(isAuthenticated, PostController.list)
	.post(isAuthenticated, PostController.create);

router
	.route("/posts/:id")
	.get(isAuthenticated, PostController.get)
	.put(isAuthenticated, PostController.update)
	.delete(isAuthenticated, PostController.delete);

module.exports = router;
