import Distributor from "../Models/distributor.model.js";
import { uploadProfilePic, deletedProfilePic } from "../Utils/cloudinary.js";
import asyncHandler from "../Utils/asyncHandler.js";

const getAllDistributors = asyncHandler(async (req, res) => {
  const distributors = await Distributor.find();
  res.status(200).json(distributors);
});

const getDistributorById = asyncHandler(async (req, res) => {});

const createDistributor = asyncHandler(async (req, res) => {});

const updateDistributor = asyncHandler(async (req, res) => {});

const deleteDistributor = asyncHandler(async (req, res) => {});

export {
  getAllDistributors,
  getDistributorById,
  createDistributor,
  updateDistributor,
  deleteDistributor,
};
