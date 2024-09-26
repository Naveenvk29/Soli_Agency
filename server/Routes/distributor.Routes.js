import express from "express";
import {
  getDistributors,
  getDistributorById,
  createDistributor,
  updateDistributor,
  deleteDistributor,
} from "../Controllers/distributor.controllers.js";

import {
  authenticatedUser,
  authorizedAsAdmin,
} from "../Middlewares/Auth.middleware.js";
import upload from "../Middlewares/multer.middleware.js";

const router = express.Router();

router
  .route("/")
  .get(getDistributors)
  .post(
    authenticatedUser,
    authorizedAsAdmin,
    upload.single("profilePic"),
    createDistributor
  );

router
  .route("/:id")
  .get(authenticatedUser, getDistributorById)
  .put(
    authenticatedUser,
    authorizedAsAdmin,
    upload.single("profilePic"),
    updateDistributor
  )
  .delete(authenticatedUser, authorizedAsAdmin, deleteDistributor);

export default router;
