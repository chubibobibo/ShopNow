import express from "express";
const router = express.Router();

//import controllers
import {
  loggedUser,
  updateProfile,
  appData,
} from "../controllers/adminControllers.js";

//import auth
import {
  userAuthentication,
  isAdmin,
} from "../middleware/userAuthentication.js";

//Note: need to authenticate user before using isAdmin, because it relies on the req.user that is only created when authenticating the user
router.get("/loggedUser", userAuthentication, loggedUser);
router.patch("/updateProfile/:id", userAuthentication, updateProfile);
router.get("/appData", userAuthentication, isAdmin("admin"), appData);

export default router;
