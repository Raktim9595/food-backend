const express = require('express');
const { 
  getPopularProducts, 
  addProducts, 
  getRecommendedProducts,
  getAllProducts
} = require("../controllers/productControllers");

const router = express.Router();

router.get("/products/popular", getPopularProducts);

router.post("/products", addProducts);

router.get("/products/recommended", getRecommendedProducts);

router.get("/products", getAllProducts);

module.exports = router;