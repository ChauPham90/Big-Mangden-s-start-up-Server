const express = require("express");
const router = express.Router();
const { userById } = require("../controllers/user");
const {
  productById,
  readProduct,
  create,
  remove,
  update,
  listRelated,
  list,
  listCategory,
  listBySearch,
  photo,
} = require("../controllers/product");

const { requireSignin, isAuth, isAdmin } = require("../controllers/auth");
const { removeListener } = require("../models/user");

//product 's route
router.get("/product/:productId", readProduct);
router.post("/product/create/:userId", requireSignin, isAdmin, isAuth, create);
router.delete(
  "/product/:productId/:userId",
  requireSignin,
  isAdmin,
  isAuth,
  remove
);
router.put(
  "/product/:productId/:userId",
  requireSignin,
  isAdmin,
  isAuth,
  update
);
router.get("/products", list);
router.get("/products/related/:productId", listRelated);
router.get("/products/categories", listCategory);
router.post("/products/by/search", listBySearch);
router.get("/product/photo/:productId", photo);

router.param("userId", userById);
router.param("productId", productById);

module.exports = router;
