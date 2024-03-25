import express from "express";
const router = express.Router();

//import controllers
import { addToCart, deleteCart } from "../controllers/cartController.js";

//add to cart
router.post("/addToCart", addToCart);
router.delete("/deleteCart/:id", deleteCart);

export default router;
