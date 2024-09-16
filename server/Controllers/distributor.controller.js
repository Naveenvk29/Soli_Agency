import Distributor from "../models/distirbutors.js";
import asyncHandler from "../utils/asyncHandler.js";
import {
  deleteDistributersimage,
  uploadDistirbutersImages,
} from "../utils/cloudinary.js";

const getDistributors = asyncHandler(async (req, res) => {
  const distributors = await Distributor.find({});
  res.json(distributors);
});

const getDistributorById = asyncHandler(async (req, res) => {});

const createDistributor = asyncHandler(async (req, res) => {});

const updateDistributor = asyncHandler(async (req, res) => {});

const deleteDistributor = asyncHandler(async (req, res) => {});

export {
  getDistributors,
  getDistributorById,
  createDistributor,
  updateDistributor,
  deleteDistributor,
};
