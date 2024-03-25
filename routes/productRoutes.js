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
  validateUpdateProduct,
} from "../middleware/InputValidations.js";

import {
  isAdmin,
  userAuthentication,
} from "../middleware/userAuthentication.js";

//creating a product is limited to admin only
//needs to authenticate user first (creation of req.user) to check if logged user role is admin
router.post("/createProduct", [
  validateCreateProduct,
  userAuthentication,
  isAdmin("admin"),
  createProduct,
]);
router.get("/allProducts", allProduct);
router.get("/:id", validateParam, singleProduct);
router.patch("/:id", [
  validateParam,
  validateUpdateProduct,
  userAuthentication,
  isAdmin("admin"),
  updateProduct,
]);
router.delete("/:id", [validateParam, isAdmin("admin"), deleteProduct]);
export default router;
