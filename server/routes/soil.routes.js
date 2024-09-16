import express from "express";

const router = express.Router();

import {
  getSoils,
  createSoils,
  updateSoil,
  deleteSoil,
  specifiedSoils,
} from "../Controllers/soil.controller.js";

import {
  authenticated,
  authorrizedAsAdmin,
} from "../Middlewares/auth.middleware.js";

import upload from "../middlewares/multer.middleware.js";

router.get("/", authenticated, authorrizedAsAdmin, getSoils);

router.post(
  "/",
  authenticated,
  authorrizedAsAdmin,
  upload.single("image"),
  createSoils
);

router.put("/:id", authenticated, authorrizedAsAdmin, updateSoil);

router.delete("/:id", authenticated, authorrizedAsAdmin, deleteSoil);

router.get("/:id", authenticated, specifiedSoils);

export default router;
