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

const router = express.Router();

router
  .route("/")
  .get(getAllSoils)
  .post(
    upload.single("soilImage"),
    authenticated,
    authorizedAsAdmin,
    createSoil
  );

router
  .route("/:id")
  .get(authenticated, getSoilById)
  .put(authenticated, authorizedAsAdmin, updateSoil)
  .delete(authenticated, authorizedAsAdmin, deleteSoil);

export default router;
