import { body, param, validationResult } from "express-validator";
import { UserModel } from "../models/UserSchema.js";
import { ExpressError } from "../ExpressError/ExpressError.js";
import mongoose from "mongoose";
import { ProductModel } from "../models/ProductSchema.js";

//validator
//create a function that will handle the error
//This function will accept an array (validateValues) of valeus to be validated.
//then this function will return the array we passed as an argument and an error response
const withValidationErrors = (validateValues) => {
  return [
    validateValues,
    (req, res, next) => {
      const errors = validationResult(req); //this returns all available errors based on the validation provided when checking the incoming request.
      //check if the errors array is not empty meaning there errors.
      if (!errors.isEmpty()) {
        const errorMessages = errors.array().map((allErrors) => allErrors.msg); //turns the errors from the validationResult into array then mapped it to access the msg key for every item in the original array, then populate the created array with that.
        throw new ExpressError(errorMessages); //use the custom error that we created and pass the errorMessages that we mapped instead of a string.
      }
      next();
    },
  ];
};

//validation function from input
//calls the withValidationErrors to validate
//import in the routes
export const validateRegister = withValidationErrors([
  body("name")
    .notEmpty()
    .withMessage("Name should not be empty")
    .isLength({ max: 25 })
    .withMessage("Name cannot exceed 25 characters"),
  body("lastName")
    .notEmpty()
    .withMessage("Last name cannot be empty")
    .isLength({ max: 25 })
    .withMessage("Last name cannot exceed 25 characters"),
  body("password")
    .notEmpty()
    .withMessage("Password cannot be empty")
    .isLength({ min: 8 })
    .withMessage("Password must be atleast characters"),
  body("email")
    .notEmpty()
    .withMessage("Email cannot be empty")
    .isEmail()
    .withMessage("Should be a valid email address")
    //check if email if unique
    .custom(async (email) => {
      const foundEmail = await UserModel.findOne({ email: email });
      if (foundEmail) {
        throw new ExpressError("Email already exist");
      }
    }),
]);

export const validateLogin = withValidationErrors([
  body("email")
    .notEmpty()
    .withMessage("Please provide an email")
    .isEmail()
    .withMessage("Not a valid email"),
  body("password")
    .notEmpty()
    .withMessage("Please provide a password")
    .isLength({ min: 8 })
    .withMessage("Password must be atleast 8 characters"),
]);

//create product validation
export const validateCreateProduct = withValidationErrors([
  body("productName")
    .notEmpty()
    .withMessage("Product name should not be empty")
    .isLength({ max: 30 })
    .withMessage("Product name should not exceed 30 characters"),
  body("stockQty")
    .notEmpty()
    .withMessage("Qty should not be empty")
    .isNumeric()
    .withMessage("Qty shgould be a whole number"),
]);

//validate params for searching specific products
export const validateParam = withValidationErrors([
  param("id")
    .notEmpty()
    .withMessage("No params recieved")
    .custom(async (id) => {
      const validId = mongoose.Types.ObjectId.isValid(id); //returns a boolean value
      if (!validId) {
        throw new ExpressError("Not a valid id");
      }
      //search for the specific product
      const validatedId = await ProductModel.findById(id);
      if (!validatedId) {
        throw new ExpressError("Product cannot be found");
      }
    }),
]);
