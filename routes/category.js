const express = require("express");
const router = express.Router();
const { userById } = require("../controllers/user");

const { requireSignin, isAuth, isAdmin } = require("../controllers/auth");
const { create ,categoryById, read, list, update, remove } = require("../controllers/category");

// create Category
router.post("/category/create/:userId", requireSignin, isAdmin, isAuth, create);

// get CategoryById
router.get("/category/:categoryId", read);

// get Category List
router.get('/categories', list);

// update Category
router.put('/category/:categoryId/:userId', requireSignin, isAuth, isAdmin, update);

// remove Category
router.delete('/category/:categoryId/:userId', requireSignin, isAuth, isAdmin, remove);

router.param("categoryId",categoryById )
router.param("userId", userById);

module.exports = router;
