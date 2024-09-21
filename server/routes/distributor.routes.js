import express from "express";
import {
  getDistributors,
  getDistributorById,
  createDistributor,
  updateDistributor,
  deleteDistributor,
} from "../controllers/distributor.controller.js";

import {
  authenticatedUser,
  authorizedAsAdmin,
} from "../middlewares/auth.middleware.js";
import upload from "../middlewares/multer.middleware.js";

const router = express.Router();

router
  .route("/")
  .get(getDistributors)
  .post(
    authenticatedUser,
    authorizedAsAdmin,
    upload("profilePic"),
    createDistributor
  );

router
  .route("/:id")
  .get(authenticatedUser, getDistributorById)
  .put(
    authenticatedUser,
    authorizedAsAdmin,
    upload("profilePic"),
    updateDistributor
  )
  .delete(authenticatedUser, authorizedAsAdmin, deleteDistributor);

export default router;
