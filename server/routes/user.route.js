import express from "express";
import {
  registerUser,
  loginUser,
  logOutUser,
  getAllUsers,
  getcurrentUserProfile,
  updateUserProfile,
} from "../controllers/user.controller.js";

const router = express.Router();

router.route("/").post(registerUser).get(getAllUsers);

router.post("/login", loginUser);

router.post("/logout", logOutUser);
router.route("/profile").get(getcurrentUserProfile).post(updateUserProfile);

export default router;
