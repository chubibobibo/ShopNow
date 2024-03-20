import express from "express";
const router = express.Router();

//import controllers
import { registerUser, loginUser } from "../controllers/userControllers.js";

//validation input imports
import {
  validateRegister,
  validateLogin,
} from "../middleware/InputValidations.js";
//register user

router.post("/register", validateRegister, registerUser);
router.post("/login", validateLogin, loginUser);

export default router;
