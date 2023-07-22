const express = require("express");
const router = express.Router();
const auth = require("../auth");
const productController = require("../controllers/productController");

// Route for Adding a product (Admin only)

router.post("/", auth.verify, (req,res) => {

	const data = {
		product: req.body,
		isAdmin: auth.decode(req.headers.authorization).isAdmin
	}

	productController.addProduct(data).then( resultFromController => res.send(resultFromController));
});


// Route to retrieve the products

router.get("/active", (req,res) => {

	productController.activeProducts().then(resultFromController => res.send(resultFromController));
});


// Route to retrieve products with a particular name

router.get("/product-name", (req,res) => {

	productController.getProductWithName(req.body).then(resultFromController => res.send(resultFromController));
});


// Route to retrieve a particular product using the porductID

router.get("/:productId", (req,res) => {

	productController.getProduct(req.params).then(resultFromController => res.send(resultFromController));
})


// Route to update a product from given productId (for Admin only)

router.put("/:productId", auth.verify, (req,res) => {

	const Data = {
		isAdmin: auth.decode(req.headers.authorization).isAdmin,
		reqbody: req.body
	}

	productController.updateProduct(req.params, Data).then(resultFromController => res.send(resultFromController));
});


// Route to archive a product with given productId (for Admin only)

router.patch("/:productId/archive", auth.verify, (req,res) => {

	let admindata = {
		isAdmin: auth.decode(req.headers.authorization).isAdmin
	}

	productController.archiveProduct(req.params, admindata).then(resultFromController => res.send(resultFromController));
});



module.exports = router;
































