import express from "express";
const router = express.Router();

//import controllers
import { addToCart, deleteCart } from "../controllers/cartController.js";

//auth
import { userAuthentication } from "../middleware/userAuthentication.js";

//add to cart
router.post("/addToCart", userAuthentication, addToCart);
router.delete("/deleteCart/:id", userAuthentication, deleteCart);

export default router;
