import { UserModel } from "../models/UserSchema.js";
import { ProductModel } from "../models/ProductSchema.js";
import { ExpressError } from "../ExpressError/ExpressError.js";

//obtain logged user
export const loggedUser = async (req, res) => {
  if (!req.user) {
    throw new ExpressError("No logged in user", 400);
  }
  const user = await UserModel.findById(req.user.userId); //created token when logging in
  if (!user) {
    throw new ExpressError("No logged in user", 400);
  }
  res.status(200).json({ message: "logged user", user });
};

//updating user profile
export const updateProfile = async (req, res) => {
  if (!req.body) {
    throw new ExpressError("no data recieved", 400);
  }
  //using userId from token because only logged in users can update profile
  const updatedProfile = await UserModel.findByIdAndUpdate(
    req.user.userId,
    req.body,
    { new: true }
  );
  if (!updatedProfile) {
    throw new ExpressError("cannot update user", 400);
  }
  res.status(200).json({ message: "User updated", updatedProfile });
};

//obtaining app data
export const appData = async (req, res) => {
  const totalProducts = await ProductModel.countDocuments();
  const totalUsers = await UserModel.countDocuments();
  res
    .status(200)
    .json({ message: "App and user data", totalProducts, totalUsers });
};
