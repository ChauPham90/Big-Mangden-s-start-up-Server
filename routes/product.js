const express = require("express");
const router = express.Router();
const { userById } = require("../controllers/user");
const { productById, readProduct } = require("../controllers/product");

const { requireSignin, isAuth, isAdmin } = require("../controllers/auth");
const { create, remove } = require("../controllers/product");
router.get("/product/:productId", readProduct);
router.post("/product/create/:userId", requireSignin, isAdmin, isAuth, create);
router.delete(
  "/product/:productId/:userId",
  requireSignin,
  isAdmin,
  isAuth,
  remove
);
router.param("userId", userById);
router.param("productId", productById);

module.exports = router;
