const express = require("express");
const router = express.Router();
<<<<<<< HEAD
const { sayHi, signUp } = require("../controllers/user");
const { userSignupValidator } = require("../validator");

router.get("/", sayHi);

router.post("/signup", userSignupValidator, signUp);
=======
const { signUp, signIn } = require("../controllers/user");
const { userSignupValidator } = require("../validator");

router.post("/signup", userSignupValidator, signUp);
router.post("/signin", signIn);
>>>>>>> 65c70024afa43547c4cb93c23b5a94c68256b066

module.exports = router;
