import express from "express";
import {
  registerUser,
  loginUser,
  logOutUser,
  getAllUser,
  getcurrentUserProfile,
  updateUserProfile,
  getSpecificUser,
} from "../Controllers/User.controller.js";

import {
  authenticated,
  authorrizedAsAdmin,
} from "../Middlewares/auth.middleware.js";

const router = express.Router();

router
  .route("/")
  .post(registerUser)
  .get(authenticated, authorrizedAsAdmin, getAllUser);
router.route("/:id").get(authenticated, authorrizedAsAdmin, getSpecificUser);
router.post("/login", loginUser);

router.post("/logout", logOutUser);

router
  .route("/profile")
  .get(authenticated, getcurrentUserProfile)
  .put(authenticated, updateUserProfile);

export default router;
