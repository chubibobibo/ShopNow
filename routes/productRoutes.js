import express from "express";
const router = express.Router();

//import controllers
import {
  createProduct,
  allProduct,
  singleProduct,
  updateProduct,
  deleteProduct,
} from "../controllers/productControllers.js";

//validation imports
import {
  validateCreateProduct,
  validateParam,
} from "../middleware/InputValidations.js";

import { userAuthentication } from "../middleware/userAuthentication.js";

router.post(
  "/createProduct",
  validateCreateProduct,
  userAuthentication,
  createProduct
);
router.get("/allProducts", allProduct);
router.get("/:id", validateParam, singleProduct);
router.patch("/:id", validateParam, updateProduct);
router.delete("/:id", validateParam, deleteProduct);

export default router;
