import express from "express";
const router = express.Router();

//import controllers
import { registerUser } from "../controllers/userControllers.js";

//validation input imports
import { validateRegister } from "../middleware/InputValidations.js";
//register user

router.post("/register", validateRegister, registerUser);

export default router;
