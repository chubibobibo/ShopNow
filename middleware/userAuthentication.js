import jwt from "jsonwebtoken";
import { ExpressError } from "../ExpressError/ExpressError.js";

export const userAuthentication = async (req, res, next) => {
  //destructure the cookie that we created during a successfiul login
  const { userCookie } = req.cookies;
  if (!userCookie) {
    throw new ExpressError("User is not authenticated");
  }
  try {
    req.user = jwt.verify(userCookie, process.env.SECRET);
  } catch (err) {
    console.log(err);
    throw new ExpressError("User not verified");
  }
  next();
};

export const isAdmin = async (req, res, next) => {
  const admin = (...roles) => {
    return (req, res, next) => {
      const userAdmin = roles.includes(req.user.role);
      if (!userAdmin) {
        throw new ExpressError("user is not an admin");
      }
      next();
    };
  };
};
