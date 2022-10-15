const Order = require("../models/orders");
const User = require("../models/users");
const Counter = require("../models/counter");
const Product = require("../models/products");

const addToCart = async (req, res) => {
  var newOrder = new Order(req.body);
  try {
    console.log("add to cart route hit");
    console.log(req.body);
    const foundCounter = await Counter.findOneAndUpdate({
      "id": "autoValOrder"
    }, {
      "$inc": {"seq": 1}
    }, {
      new: true,
    });
    const foundUser = await User.findById(req.user.id);
    newOrder.phone = foundUser.number;
    newOrder.id = foundCounter.seq;
    newOrder.ownerId = req.user.id;
    await newOrder.save();
    res.status(200).json({ success: "new order has been placed" });
  } catch (e) {
    console.log(e.message);
  }
}

const getHistoryInfo = async (req, res) => {
  try {
    console.log("get shopping history hit");
    const foundShoppingHistroy = await Order.find({ "ownerId": req.user.id  }).populate({
      path: "products",
      select: ["_id", "name", "description", "img", "status"],
    });
    if(!foundShoppingHistroy) {
      console.log("error finding user history");
      return res.status(403).json({error: "no any orders for this user"});
    }
    return res.status(200).json(foundShoppingHistroy);
  } catch (e) {
    console.log(e.message);
  }
}

module.exports = {
  addToCart,
  getHistoryInfo,
}