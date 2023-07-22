const express = require("express");
const mongoose = require("mongoose");
const userRoutes = require("./routes/userRoute.js");
const productRoutes = require("./routes/productRoute.js");

const cors = require("cors");
const api = express();

// connecting to our MongoDB database
mongoose.connect("mongodb+srv://admin:admin@zuitt-bootcamp.wj3hhzy.mongodb.net/capstone-API", {

		useNewUrlParser: true,
		useUnifiedTopology: true
	}
);

mongoose.connection.once("open", () => {

	console.log("Now connected in the cloud database")
})

// Addin Middlewares
api.use(express.json());
api.use(express.urlencoded({ extended: true}));

// Will used the defined port number for the application whenever the variable is available or will used port 2000 if none is defined
// Doing this syntax, it will allow flexibility when using the application 
api.listen(process.env.PORT || 2000,() => {

	console.log(`API is now online on port ${process.env.PORT || 2000}`);
})

api.use("/users", userRoutes);
api.use("/products", productRoutes);

































