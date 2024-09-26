import express from "express";
import {
  registerUser,
  loginUser,
  logOutUser,
  getAllUsers,
  getcurrentUserProfile,
  updateUserProfile,
} from "../Controllers/user.controllers.js";
import {
  authenticatedUser,
  authorizedAsAdmin,
} from "../Middlewares/Auth.middleware.js";

const router = express.Router();

router
  .route("/")
  .post(registerUser)
  .get(authenticatedUser, authorizedAsAdmin, getAllUsers);

router.post("/login", loginUser);

router.post("/logout", logOutUser);
router
  .route("/profile")
  .get(authenticatedUser, getcurrentUserProfile)
  .put(authenticatedUser, updateUserProfile);

export default router;
