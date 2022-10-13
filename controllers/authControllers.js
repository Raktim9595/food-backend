const CryptoJs = require("crypto-js");
const jwt = require("jsonwebtoken");
const User = require("../models/users");
const Counter = require("../models/counter");

const registerUser = async (req, res) => {
	const newUser = new User({
		f_name: req.body.f_name,
		number: req.body.phone,
		email: req.body.email,
		password: CryptoJs.AES.encrypt(req.body.password, process.env.PASSWORD_SECRET).toString(),
	})
	try {
		const searchUser = await User.findOne({ email: req.body.email });
		if(searchUser) {
			return searchUser && res.status(401).json({error: "the email is already taken"});
		}
		const foundCounter = await Counter.findOneAndUpdate({
			"id": "autValUser"
		}, {
			"$inc": {"seq": 1}
		}, {
			new: true,
		});
		newUser.id = foundCounter.seq;
		await newUser.save();
		const accessToken = jwt.sign({},
			process.env.PASSWORD_SECRET, {
				expiresIn: "3d"
			});
		return res.status(200).json({ token: accessToken });
	} catch (e) {
		console.log(e.message);
	}
};

const logInUser = async (req, res) => {
	try {
		const user = await User.findOne({ "email": req.body.email });
		if(!user) {
			return !user && res.status(401).json({ error: "wrong credentials" });
		}
		const hashedPassword = CryptoJs.AES.decrypt(user.password, process.env.PASSWORD_SECRET);
		const realPassword = hashedPassword.toString(CryptoJs.enc.Utf8);
		if(realPassword !== req.body.password) {
			return res.status(401).json({error: "wrong password"});
		}		
		const accessToken = jwt.sign({
      id: user._id,
    }, process.env.PASSWORD_SECRET,
    {
      expiresIn: "3d",
    })
		return res.status(200).json({token: accessToken});
	} catch (e) {
		console.log(e.message);
	}
}

const getOneUser = async (req, res) => {	try {
		const oneUser = await User.findById(req.user.id);
		if(!oneUser) {
			return res.status(401).json({ error: "User not found" });
		}
		const { password, ...others } = oneUser._doc;
		res.status(200).json(others);
	} catch (e) {
		console.log(e.message);
	}
}

module.exports = {
	registerUser,
	logInUser,
	getOneUser
};