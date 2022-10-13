var mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
	f_name: {
		type: String,
		require: true,
	},
	number: {
		type: String,
		require: true,
	},
	password: {
		type: String,
		require: true,
	},
	email: {
		type: String,
		require: true,
	},
	id: Number,
	orderCount: {
		type: Number,
		default: 10,
	}
}, {
	timestamp: true
});

module.exports = mongoose.model("User", UserSchema);