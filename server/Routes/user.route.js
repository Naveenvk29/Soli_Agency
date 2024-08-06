import express from "express";
import {
  createUser,
  loginUser,
  logout,
} from "../Controllers/user.controllers.js";

const router = express.Router();

router.post("/", createUser);

router.post("/login", loginUser);

router.post("/logout", logout);

export default router;
