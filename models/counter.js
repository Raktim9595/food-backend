const mongoose = require("mongoose");

var counterSchema = new mongoose.Schema({
  id: String,
  seq: Number
});

module.exports = mongoose.model("Counter", counterSchema);