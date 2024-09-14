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

const router = express.Router();

router.route("/").post(registerUser).get(getAllUser);
router.route("/:id").get(getSpecificUser);
router.post("/login", loginUser);

router.post("/logout", logOutUser);

router.get("/profile", getcurrentUserProfile);

router.put("/profile", updateUserProfile);

export default router;
