import "express-async-errors";
//model import
import { UserModel } from "../models/UserSchema.js";
//error handler
import { ExpressError } from "../ExpressError/ExpressError.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const registerUser = async (req, res) => {
  if (!req.body) {
    throw new ExpressError("No data recieved from input", 400);
  }

  //setting roles
  const isAdmin = (await UserModel.countDocuments()) === 0; //use await
  req.body.role = isAdmin ? "admin" : "user";
  //hashing password
  const salt = bcrypt.genSaltSync(12);
  const hashedPwd = bcrypt.hashSync(req.body.password, salt);
  req.body.password = hashedPwd;

  const registeredUser = await UserModel.create(req.body);
  if (!registeredUser) {
    throw new ExpressError("Cannot create user", 400);
  }
  res.status(200).json({ message: "User Created", registeredUser });
};

//login
export const loginUser = async (req, res) => {
  if (!req.body) {
    throw new ExpressError("No recieved from input", 400);
  }
  //find user using email provided in forms (to compare)
  const user = await UserModel.findOne({ email: req.body.email });
  // console.log(user);
  if (!user) {
    throw new ExpressError("No user found", 400);
  }
  const loggedUser = bcrypt.compareSync(req.body.password, user.password);
  if (!loggedUser) {
    throw new ExpressError("Incorrect email or password");
  }
  //implement jwt tokens and cookies on a successful login
  const token = jwt.sign(
    {
      userId: user._id,
      role: user.role,
      name: user.name,
    },
    process.env.SECRET,
    { expiresIn: "7d" }
  );
  //create cookies based on the token created
  res.cookie("userCookie", token, {
    httpOnly: true,
    expires: new Date(Date.now() + 1000 * 60 * 60 * 24 * 7),
    secure: process.env.NODE_ENV,
  }); // expires in 1 week

  res.status(200).json({ message: `Welcome ${user.name}` });
};

//logout user
export const logoutUser = async (req, res) => {
  //create a new cookie that will expire immediately
  res.cookie("userCookie", "logout", {
    httpOnly: true,
    expires: new Date(Date.now()),
  });
  console.log(userCookie);
  res.status(200).json({ message: "User logged out" });
};
