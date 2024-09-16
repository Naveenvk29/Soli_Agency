import Soil from "../models/soil.model.js";
import asyncHandler from "../utils/asyncHandler.js";
import { uploadSoilImage, deleteSoilImage } from "../utils/cloudinary.js";

const getSoils = asyncHandler(async (req, res) => {
  const soils = await Soil.find({});
  res.json(soils);
});

const createSoils = asyncHandler(async (req, res) => {});

const updateSoil = asyncHandler(async (req, res) => {});

const deleteSoil = asyncHandler(async (req, res) => {});

const specifiedSoils = asyncHandler(async (req, res) => {});

export { getSoils, createSoils, updateSoil, deleteSoil, specifiedSoils };
