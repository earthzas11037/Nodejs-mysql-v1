const { authJwt } = require("../middleware");
const user = require("../controllers/user.controller");

var router = require("express").Router();

// signup
router.put("/:userId", [authJwt.verifyToken], user.update);


module.exports = router;