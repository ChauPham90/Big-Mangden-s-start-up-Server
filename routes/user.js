const express = require("express");
const router = express.Router();
const { userById } = require("../controllers/user");
const { userSignupValidator } = require("../validator");

const { requireSignin, isAuth, isAmin } = require("../controllers/auth");

router.get("/secret/:userId", requireSignin, isAmin, isAuth, (req, res) => {
  res.json({ user: req.profile });
});

router.param("userId", userById);

module.exports = router;
