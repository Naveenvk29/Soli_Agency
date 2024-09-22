import express from "express";
import {
  getAllSoils,
  createSoil,
  updateSoil,
  deleteSoil,
  getsoilById,
} from "../controllers/soil.controller.js";
import {
  authenticatedUser,
  authorizedAsAdmin,
} from "../middlewares/auth.middleware.js";
import upload from "../middlewares/multer.middleware.js";

const router = express.Router();

router
  .route("/")
  .get(getAllSoils)
  .post(
    authenticatedUser,
    authorizedAsAdmin,
    upload.single("SoilImage"),
    createSoil
  );

router
  .route("/:id")
  .get(authenticatedUser, getsoilById)
  .put(
    authenticatedUser,
    authorizedAsAdmin,
    upload.single("SoilImage"),
    updateSoil
  )
  .delete(authenticatedUser, authorizedAsAdmin, deleteSoil);

export default router;
