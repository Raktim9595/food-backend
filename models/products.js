const mongoose = require("mongoose");

const ProductSchema = new mongoose.Schema({
  name: {
    type: String,
    require: true,
  },
  description: {
    type: String,
    require: true,
  },
  price: {
    type: Number,
    require: true,
  },
  stars: {
    type: Number,
    require: true,
  },
  img: {
    type: String,
    require: true,
  },
  location: {
    type: String,
    require: true,
  },
  category: {
    type: String,
    require: true,
  },
  id: Number
}, {
  timestamps: true
});

module.exports = mongoose.model("Product", ProductSchema);