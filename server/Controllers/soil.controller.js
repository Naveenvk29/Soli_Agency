import Soil from "../Models/soil.model.js";
import { uploadSoilImage, deletedSoilImage } from "../Utils/cloudinary.js";
import asyncHandler from "../Utils/asyncHandler.js";

const createSoil = asyncHandler(async (req, res) => {});

const getAllSoils = asyncHandler(async (req, res) => {
  const soils = await Soil.find({});
  res.json(soils);
});

const getSoilById = asyncHandler(async (req, res) => {});

const updateSoil = asyncHandler(async (req, res) => {});

const deleteSoil = asyncHandler(async (req, res) => {});

export { createSoil, getAllSoils, getSoilById, updateSoil, deleteSoil };
