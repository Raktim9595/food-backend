const express = require("express");

const { addToCart, getHistoryInfo } = require("../controllers/orderController");
const { verifyToken } = require("../middlewares/verifyToken");

const router = express.Router();

router.post("/orders", verifyToken, addToCart);

router.get("/orders", verifyToken, getHistoryInfo);

module.exports = router;