const express = require("express");
const router = express.Router();
const { userById } = require("../controllers/user");
const { productById, readProduct } = require("../controllers/product");

const { requireSignin, isAuth, isAdmin } = require("../controllers/auth");
const { create } = require("../controllers/product");
router.get("/product/:productId", readProduct);
router.post("/product/create/:userId", requireSignin, isAdmin, isAuth, create);

router.param("userId", userById);
router.param("productId", productById);

module.exports = router;
