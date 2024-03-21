import express from "express";
const router = express.Router();

//import controllers
import {
  createProduct,
  allProduct,
  singleProduct,
} from "../controllers/productControllers.js";

//validation imports
import {
  validateCreateProduct,
  validateParam,
} from "../middleware/InputValidations.js";

router.post("/createProduct", validateCreateProduct, createProduct);
router.get("/allProducts", allProduct);
router.get("/:id", validateParam, singleProduct);

export default router;
