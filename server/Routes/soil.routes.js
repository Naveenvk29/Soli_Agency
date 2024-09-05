import express from "express";
import {
  getAllSoils,
  getSoilById,
  createSoil,
  updateSoil,
  deleteSoil,
} from "../Controllers/soil.controller.js";
import {
  authenticated,
  authorizedAsAdmin,
} from "../Middlewares/auth.middleware.js";
import upload from "../Middlewares/multer.middleware.js";

router
  .route("/")
  .get(getAllSoils)
  .post(authenticated, authorizedAsAdmin, createSoil);

router.route("/:id").get(authenticated, getSoilById);

router
  .route("/soilprofile")
  .put(authenticated, authorizedAsAdmin, updateSoil)
  .delete(authenticated, authorizedAsAdmin, deleteSoil);

const router = express.Router();

export default router;
