const mongoose = require("mongoose");
const User = require("./users");
const Product = require("./products");

const orderSchema = new mongoose.Schema({
	id: Number,
	orderAddress: {
		type: String,
		require: true
	},
	orderTime: {
		type: String,
		require: true,
	},
	totalPrice: {
		type: Number,
		require: true,
	},
	totalItems: {
		type: Number,
		require: true,
	},
	phone: {
		type: Number,
		require: true,
	},
	ownerId: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "User",
	},
	status: {
		type: String,
		default: "pending",
	},
	products: [{
		type: mongoose.Schema.Types.ObjectId,
		ref: "Product",
	}]
});

module.exports = mongoose.model("Orders", orderSchema);