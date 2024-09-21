import express from "express";
import {
  registerUser,
  loginUser,
  logOutUser,
  getAllUsers,
  getcurrentUserProfile,
  updateUserProfile,
} from "../controllers/user.controller.js";
import {
  authenticatedUser,
  authorizedAsAdmin,
} from "../middlewares/auth.middleware.js";

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
