const Product = require("../models/Product");
const auth = require("../auth");
const User = require("../models/User");


// controllers for addition of a product by Admin

module.exports.addProduct = (data) => {

	console.log(data);

	if(data.isAdmin){

		let newProduct = new Product({

			name: data.product.name,
			description: data.product.description,
			price: data.product.price
		});

		return newProduct.save().then((product, err) => {

			if(err){

				return "Error ocurred!"
			} else {

				return "Product added!"
			}
		});
	};


	let message = Promise.resolve("User must be Admin to access this.");
	return message.then((value) => {
		return value;
	});

};


// controllers to get all active products

module.exports.activeProducts = () => {

	return Product.find({isActive: true}).then( result => {

		return result;
	});
};


// controllers to get all products with certian name

module.exports.getProductWithName = (reqBody) => {

	return Product.find({isActive: true, name: reqBody.name}).then( result => {

		return result;
	});
};


// controllers to get a particular product with given productid

module.exports.getProduct = (reqParams) => {

	return Product.findById(reqParams.productId).then(result => {

		return result;
	});
};


// controllers to update a particular product with given productid (for Admin only)

module.exports.updateProduct = (reqParams, data) => {

	if(data.isAdmin){

		let updatedProduct = {
			name: data.reqbody.name,
			description: data.reqbody.description,
			price: data.reqbody.price
		};

		return Product.findByIdAndUpdate(reqParams.productId, updatedProduct).then((product,error) => {

			if(error){

				return false;
			} else{

				return	"Product Updated!"
			};
		});

	};

	let message = Promise.resolve("User must be an Admin to access this.");
	return message.then((value) => {

				return value;
			});

}


// Controllers to archive a course from given productId (for Admin only)

module.exports.archiveProduct = (reqParams, reqbody) => {

	if(reqbody.isAdmin){

		let updateActiveField = {
			isActive: false
		}

		return Product.findByIdAndUpdate( reqParams.productId, updateActiveField).then((product, err) => {

				if(err){

					return false;
				} else{

					return "Product archived successfully!"
				};
		});
	};

};
































