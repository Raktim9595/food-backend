const express = require("express");

const { addToCart } = require("../controllers/cartControllers");
const { verifyToken } = require("../middlewares/verifyToken");

const router = express.Router();

router.post("/cart", verifyToken, addToCart);

module.exports = router;