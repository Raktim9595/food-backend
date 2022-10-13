const express = require("express");

const { 
	registerUser,
	logInUser,
	getOneUser,
} = require("../controllers/authControllers");

const { verifyToken } = require("../middlewares/verifyToken");

const router = express.Router();

router.post("/auth/register", registerUser);

router.post("/auth/login", logInUser);

router.get("/auth/signleUserInfo", verifyToken, getOneUser);

module.exports = router;