const express = require("express");
const router = express.Router();
const { sayHi, signUp } = require("../controllers/user");
const { userSignupValidator } = require("../validator");

router.get("/", sayHi);

router.post("/signup", userSignupValidator, signUp);

module.exports = router;
