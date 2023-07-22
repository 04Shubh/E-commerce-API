const User = require('../models/User');
const Product = require('../models/Product');
const bcrypt = require('bcrypt');
const auth = require("../auth");


// Controllers for registrating user

module.exports.registerUser = (reqBody) => {

	let newUser = new User ({

		firstName: reqBody.firstName,
		lastName: reqBody.lastName,
		email: reqBody.email,
		password: bcrypt.hashSync(reqBody.password, 10)
		// doing 10 times hasing for password
	})

	return newUser.save().then((user, err) => {

		if(err){

			return false
		} else {

			return "Welcome, you are registered as an user!"
		};

	});
}

// Controller for user login

module.exports.loginUser = (reqBody) => {

	return User.findOne({ email: reqBody.email }).then(result => {

		console.log(result);

		if(result == null){

			return "You are not registered yet"
		} else{

			const isPasswordCorrect = bcrypt.compareSync(reqBody.password, result.password);

			if(isPasswordCorrect){

				return{ access: auth.createAccessToken(result)}
			} else{

				return "Incorrect password!"
			};
		};
	});
};










































