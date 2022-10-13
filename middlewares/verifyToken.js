const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => {
	const authHeader = req.headers.authorization;
	if(authHeader) {
		const authToken = authHeader.split(" ")[1];
		jwt.verify(authToken, process.env.PASSWORD_SECRET, (err, user) => {
			if(err) {
				res.status(403).json({
					error: "Inavlid token"
				})
			}
			req.user = user;
			next();
		})
	} else {
		return res.status(401).json({
			error: "You are not authenticated"
		})
	}
}

module.exports = {
	verifyToken
};