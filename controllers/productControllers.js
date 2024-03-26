import { ProductModel } from "../models/ProductSchema.js";
import { ExpressError } from "../ExpressError/ExpressError.js";

//create new products (for admin only)
export const createProduct = async (req, res) => {
  if (!req.body) {
    throw new ExpressError("No data recieved");
  }
  const newProduct = await ProductModel.create(req.body);
  res.status(200).json({ message: "New product created", newProduct });
};

//obtain all products
export const allProduct = async (req, res) => {
  const foundProducts = await ProductModel.find({});
  if (foundProducts.length === 0) {
    //find() returns an array
    throw new ExpressError("No products found", 404);
  }
  res
    .status(200)
    .json({ message: "Here are all the products available", foundProducts });
};

//obtain single product
export const singleProduct = async (req, res) => {
  const { id } = req.params;
  if (!req.params) {
    throw new ExpressError("No product id recieved", 400);
  }
  const foundSingleProduct = await ProductModel.findById(id);
  if (!foundSingleProduct) {
    throw new ExpressError("No product found", 404);
  }
  //   console.log(foundSingleProduct);
  res.status(200).json({ message: "single product", foundSingleProduct });
};

//modify a single product (for admin only)
export const updateProduct = async (req, res) => {
  const { id } = req.params;
  console.log(id);
  if (!req.body) {
    throw new ExpressError("No data recieved", 400);
  }
  const foundProduct = await ProductModel.findByIdAndUpdate(id, req.body, {
    new: true,
  });
  if (!foundProduct) {
    throw new ExpressError("Product cannot be updated", 400);
  }
  res.status(200).json({ message: "product updated", foundProduct });
};

// delete a product
export const deleteProduct = async (req, res) => {
  const { id } = req.params;
  const deletedProduct = await ProductModel.findByIdAndDelete(id);
  if (!deletedProduct) {
    throw new ExpressError("Cannot delete product", 400);
  }
  res.status(200).json({ message: "Product deleted" });
};
