import express from "express";

const router = express.Router();

import {
  getDistributors,
  getDistributorById,
  createDistributor,
  updateDistributor,
  deleteDistributor,
} from "../Controllers/distributor.controller.js";

import {
  authenticated,
  authorrizedAsAdmin,
} from "../Middlewares/auth.middleware.js";
import upload from "../middlewares/multer.middleware.js";

router
  .route("/")
  .get(getDistributors)
  .post(
    authenticated,
    authorrizedAsAdmin,
    upload.single("logo"),
    createDistributor
  );

router
  .route("/:id")
  .get(getDistributors)
  .put(
    authenticated,
    authorrizedAsAdmin,
    upload.single("logo"),
    updateDistributor
  )
  .delete(authenticated, authorrizedAsAdmin, deleteDistributor);

router.route("/:id/products").get(getDistributorById);

export default router;
