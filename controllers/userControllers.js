import "express-async-errors";
//model import
import { UserModel } from "../models/UserSchema.js";

//error handler
import { ExpressError } from "../ExpressError/ExpressError.js";

export const registerUser = async (req, res) => {
  if (!req.body) {
    throw new ExpressError("No data recieved from input", 400);
  }
  //setting roles
  const isAdmin = (await UserModel.countDocuments()) === 0; //use await

  req.body.role = isAdmin ? "admin" : "user";
  const registeredUser = await UserModel.create(req.body);
  if (!registeredUser) {
    throw new ExpressError("Cannot create user", 400);
  }
  res.status(200).json({ message: "User Created", registeredUser });
};
