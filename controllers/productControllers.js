const Product = require("../models/products");
const Counter = require("../models/counter");

const getAllProducts = async(req, res) => {
  try {
    console.log("inside get all products");
    const foundProduct = await Product.find({});
    const data = {
      total_size: foundProduct.length,
      type_id: 1,
      offset: 0,
      products: foundProduct,
    }
    res.status(200).json(data);
  } catch (e) {
    console.log(e.message);
  }
}

const getPopularProducts = async (req, res) => {
  try {
    const foundProduct = await Product.find({ category: "popular" });
    const data = {
      total_size: foundProduct.length,
      type_id: 2,
      offset: 0,
      products: foundProduct 
    }
    res.status(200).json(data);
  } catch(e) {    
    console.log(e.message);
  }
}

const addProducts = async (req, res) => {
  try {
    const foundCounter = await Counter.findOneAndUpdate({
      id: "autoVal",
    }, {
      "$inc": {"seq": 1},
    }, { new: true });
    if(!foundCounter) {
      const newCounter = new Counter({
        id: "autoVal",
        seq: 1
      });
      await newCounter.save();
    }
    var newProduct = new Product(req.body);
    newProduct.id = foundCounter.seq;
    await newProduct.save();
    res.status(200).json(newProduct);
  } catch (e) {
    console.log(e.message);
  }
}

const getRecommendedProducts = async (req, res) => {
  try {
    const recommendedProduct = await Product.find({ category: "recommended" });
    const data = {
      total_size: recommendedProduct.length,
      type_id: 3,
      offset: 0,
      products: recommendedProduct 
    }
    res.status(200).json(data);
  } catch (e) {
    console.log(e.message);
  }
}

module.exports = {
  getPopularProducts,
  addProducts,
  getRecommendedProducts,
  getAllProducts,
};