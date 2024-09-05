import express from "express";
import {
  getAllDistubitors,
  createDistubitor,
  updateDistubitor,
  deleteDistubitor,
  getDistubitorById,
} from "../Controllers/distubitors.controller.js";
import {
  authenticated,
  authorizedAsAdmin,
} from "../Middlewares/auth.middleware.js";
import upload from "../Middlewares/multer.middleware.js";

const router = express.Router();

export default router;
