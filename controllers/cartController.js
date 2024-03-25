//model import
import { CartModel } from "../models/CartSchema.js";

import { ExpressError } from "../ExpressError/ExpressError.js";

//adding to cart
export const addToCart = async (req, res) => {
  if (!req.body) {
    throw new ExpressError("No data recieved", 400);
  }
  const newCart = await CartModel.create(req.body);
  res.status(200).json({ message: "Added new cart item", newCart });
};

//deleting items from cart
export const deleteCart = async (req, res) => {
  const { id } = req.params;
  const deletedItem = await CartModel.findByIdAndDelete(id);
  res.status(200).json({ message: "Item deleted from the cart" });
};
