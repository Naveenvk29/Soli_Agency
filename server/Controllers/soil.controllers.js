import Soil from "../Model/soil.model.js";
import asyncHandler from "../Utils/asyncHandler.js";
import { uploadSoilImage, deleteSoilImage } from "../Utils/Cloudinary.js";

// get all this Soil
const getAllSoils = asyncHandler(async (req, res) => {
  try {
    const soils = await Soil.find({});
    res.json(soils);
  } catch (error) {
    console.error(error);
  }
});

// create a new Soil by admin
const createSoil = asyncHandler(async (req, res) => {
  const {
    name,
    type,
    texture,
    nutrients,
    fertility,
    humidity,
    pH,
    temperature,
    moisture,
  } = req.body;
  const soilpic = req.file;
  //   console.log(req.file);

  const SoilImage = await uploadSoilImage(soilpic);
  const soil = new Soil({
    name,
    type,
    texture,
    nutrients,
    fertility,
    humidity,
    pH,
    temperature,
    moisture,
    SoilImage,
  });
  try {
    const createdSoil = await soil.save();
    res.status(201).json(createdSoil);
  } catch (error) {
    console.error(error);
    res.status(400).json({ message: error.message });
  }
});

// updating Soil details by admin
const updateSoil = asyncHandler(async (req, res) => {
  try {
    const { id } = req.params;
    const soil = await Soil.findById(id);
    if (!soil) {
      return res.status(404).json({ message: "Soil not found" });
    }

    // Handle image update
    if (req.file) {
      const newSoilImage = await uploadSoilImage(req.file);
      // Delete old image only if it exists
      if (soil.SoilImage && soil.SoilImage.public_id) {
        await deleteSoilImage(soil.SoilImage.public_id);
      }
      soil.SoilImage = newSoilImage;
    }
    // Update soil fields only if they are present in the request body
    soil.name = req.body.name || soil.name;
    soil.type = req.body.type || soil.type;
    soil.texture = req.body.texture || soil.texture;
    soil.nutrients = req.body.nutrients || soil.nutrients;
    soil.fertility = req.body.fertility || soil.fertility;
    soil.humidity = req.body.humidity || soil.humidity;
    soil.pH = req.body.pH || soil.pH;
    soil.temperature = req.body.temperature || soil.temperature;
    soil.moisture = req.body.moisture || soil.moisture;
    soil.distirbutor = req.body.distirbutor || soil.distirbutor;

    const updatedSoil = await soil.save();
    res.json(updatedSoil);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
});

// delete a Soil by admin
const deleteSoil = asyncHandler(async (req, res) => {
  try {
    const { id } = req.params;
    const soil = await Soil.findById(id);
    if (!soil) {
      return res.status(404).json({ message: "Soil not found" });
    }
    await deleteSoilImage(soil.SoilImage.public_id);
    await soil.deleteOne();
    res.json({ message: "Soil deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
});

// get a specific soil by id
const getsoilById = asyncHandler(async (req, res) => {
  try {
    const { id } = req.params;
    const soil = await Soil.findById(id);
    if (!soil) {
      return res.status(404).json({ message: "Soil not found" });
    }
    res.json(soil);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
});

export { getAllSoils, createSoil, updateSoil, deleteSoil, getsoilById };
