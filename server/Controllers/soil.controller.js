import Soil from "../Models/soil.model.js";
import { uploadSoilImage, deletedSoilImage } from "../Utils/cloudinary.js";
import asyncHandler from "../Utils/asyncHandler.js";

const createSoil = asyncHandler(async (req, res) => {
  // console.log("Body:", req.body);
  // console.log("File:", req.file);

  try {
    // Parse nutrients and fertilizers from string to JSON
    const parsedNutrients = JSON.parse(req.body.nutrients);
    const parsedFertilizers = JSON.parse(req.body.fertilizers);

    const { name, type, pH, wateringFrequency } = req.body;

    if (
      !name ||
      !type ||
      !pH ||
      !parsedNutrients ||
      !parsedFertilizers ||
      !wateringFrequency
    ) {
      return res.status(400).json({ message: "All fields are required." });
    }

    // Upload the image
    // const soilImage = await uploadSoilImage(req.file);
    // if (!soilImage) {
    //   return res.status(400).json({ message: "Failed to upload soil image." });
    // }

    const soil = new Soil({
      name,
      type,
      pH,
      nutrients: parsedNutrients,
      fertilizers: parsedFertilizers,
      wateringFrequency,
      // soilImage: soilImage,
    });

    await soil.save();

    res.status(201).json({ soil });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Something went wrong", error: error.message });
  }
});

const getAllSoils = asyncHandler(async (req, res) => {
  const soils = await Soil.find({});
  res.json(soils);
});

const getSoilById = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const soil = await Soil.findById({ id });
  if (!soil) {
    return res.status(404).json({ message: "Soil not found" });
  }
  res.json(soil);
});

const updateSoil = asyncHandler(async (req, res) => {
  try {
    const { id } = req.params;
    const soil = await Soil.findById(id);
    if (!soil) {
      return res.status(404).json({ message: "Soil not found" });
    }
    // const parsedFertilizers = JSON.parse(req.body.fertilizers);
    // const parsedNutrients = JSON.parse(req.body.nutrients);
    // const parsedPests = JSON.parse(req.body.pests);
    // const parsedDiseases = JSON.parse(req.body.diseases);

    // soil.name = req.body.name || soil.name;
    // soil.type = req.body.type || soil.type;
    // soil.pH = req.body.pH || soil.pH;
    // soil.nutrients = req. || soil.nutrients;
    // soil.fertilizers = parsedFertilizers || soil.fertilizers;
    // soil.wateringFrequency =
    //   req.body.wateringFrequency || soil.wateringFrequency;
    // soil.pests = parsedPests || "";
    // soil.diseases = parsedDiseases || "";
    // soil.lastWatered = new Date();
    // soil.lastDiseaseControl = new Date();
    // soil.lastFertilizedDate = new Date();
    // soil.lastPestControlledDate = new Date();

    await soil.save();
    res.json(soil);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Something went wrong", error: error.message });
  }
});

const deleteSoil = asyncHandler(async (req, res) => {
  try {
    const { id } = req.params;
    const soil = await Soil.findByIdAndDelete(id);
    if (!soil) {
      return res.status(404).json({ message: "Soil not found" });
    }
    // Delete the soil image
    // await deletedSoilImage(soil.soilImage);
    res.json({ message: "Soil deleted successfully" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Something went wrong", error: error.message });
  }
});

export { createSoil, getAllSoils, getSoilById, updateSoil, deleteSoil };
