import express from "express";
const router = express.Router();
import pizzas from "../controller/pizzaController.js";
import singleupload from "../utils/Multer.js";
import userController from "../controller/userController.js";

//User Routes

router.post("/", userController.registerUser);
router.post("/login", userController.loginUser);

// Pizza routes
router.get("/welcome", pizzas.welcome);
router.get("/getpizza", pizzas.getpizza); //get all data

//upload pizza data
router.post("/uploadpizza", singleupload.single("file"), pizzas.uploadpizza);
// this is for single element...
router.get("/getpizza/:id", pizzas.getsinglepizza);
router.post("/getpizza/cart-items", pizzas.getPizzas);

export default router;
