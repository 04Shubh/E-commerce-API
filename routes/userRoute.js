const express = require("express");
const router = express.Router();
const auth = require("../auth");
const userController = require("../controllers/userController");


// Creating route for user registration 

router.post("/register", (req,res) => {

	userController.registerUser(req.body).then(resultFromController => res.send(resultFromController));
});

// Creating route for user authentification

router.post("/login", (req,res) => {

	userController.loginUser(req.body).then(resultFromController => res.send(resultFromController));
});

module.exports = router;












































