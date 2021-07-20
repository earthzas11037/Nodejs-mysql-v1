const auth = require("../controllers/auth.controller");

var router = require("express").Router();

// signup
router.post("/signup", auth.signup);

// signin
router.post("/signin", auth.signin);

module.exports = router;