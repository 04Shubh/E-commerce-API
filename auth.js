const jwt = require('jsonwebtoken');

const secret = "EcommerceAPI";

module.exports.createAccessToken = (user) => 
	{
		// payload of the token
		const data = {
			id: user._id,
			email: user.email,
			isAdmin: user.isAdmin
		};

		return jwt.sign(data, secret, {});
	}

// Token Verification:

module.exports.verify = (req, res, next) => 
	{

		let token = req.headers.authorization;

		if(typeof token !== "undefined"){

			token = token.slice(7, token.length);

			return jwt.verify(token, secret, (err, data) => {

				if(err){

					return res.send({ auth : "failed"});
				} else {

					next();
				}
			})

		} else {

			return res.send({ auth: "failed"});
		};
	};

// Token Decryption 

module.exports.decode = (token) => {

	if(typeof token !== "undefined"){

		token = token.slice(7, token.length);

		return jwt.verify(token, secret, (err, data) => {

			if(err){

				return null;
			} else {

				// returns the payload info
				return jwt.decode(token, {
					complete : true
				}).payload;
			};
		})

	} else{

		return null;
	};
};



























