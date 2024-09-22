import Distributor from "../model/distirbutor.model.js";
import asyncHandler from "../utils/asyncHandler.js";
import { uploadProfilePic, deleteProfilePic } from "../utils/couldinary.js";

// get distributors
const getDistributors = asyncHandler(async (req, res) => {
  try {
    const distributors = await Distributor.find({});
    res.json(distributors);
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
});

// get specific distributor by id
const getDistributorById = asyncHandler(async (req, res) => {
  try {
    const { id } = req.params;
    const distributor = await Distributor.findById(id);
    if (!distributor) {
      return res.status(404).json({ message: "Distributor not found" });
    }
    res.json(distributor);
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
});

// create distributor by admin
const createDistributor = asyncHandler(async (req, res) => {
  try {
    const { name, email, contact, location, soil } = req.body;
    const uploadProfileImage = req.file;

    const exgitingDistributor = await Distributor.findOne({ name, email });

    if (exgitingDistributor) {
      return res.status(400).json({ message: "Distributor already exists" });
    }

    const profilePic = await uploadProfilePic(uploadProfileImage);

    const distributorinfo = new Distributor({
      name,
      email,
      contact,
      location,
      profilePic,
      soil,
    });
    const distirbutor = await distributorinfo.save();

    res.status(201).json(distirbutor);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// update distributor by admin
const updateDistributor = asyncHandler(async (req, res) => {
  try {
    const { id } = req.params;
    const { name, email, contact, location } = req.body;
    const distributor = await Distributor.findById(id);
    if (!distributor) {
      return res.status(404).json({ message: "Distributor not found" });
    }

    if (req.file) {
      const uploadProfileImage = req.file;
      const profilePic = await uploadProfilePic(uploadProfileImage);
      await deleteProfilePic(distributor.profilePic.public_id);
      distributor.profilePic = profilePic;
    }

    distributor.name = req.body.name || distributor.name;
    distributor.email = req.body.email || distributor.email;
    distributor.contact = req.body.contact || distributor.contact;
    distributor.location = req.body.location || distributor.location;
    distributor.soil = req.body.soil || distributor.soil;

    const updateDistributor = await distributor.save();
    res.status(201).json(updateDistributor);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// delete distributor by admin
const deleteDistributor = asyncHandler(async (req, res) => {
  try {
    const { id } = req.params;
    const distributor = await Distributor.findById(id);
    if (!distributor) {
      return res.status(404).json({ message: "Distributor not found" });
    }
    if (distributor.profilePic) {
      await deleteProfilePic(distributor.profilePic.public_id);
    }
    await distributor.deleteOne();
    res.json({ message: "Distributor deleted successfully" });
  } catch (error) {
    console.log(error);

    res.status(500).json({ message: "Server Error" });
  }
});

export {
  getDistributors,
  getDistributorById,
  createDistributor,
  updateDistributor,
  deleteDistributor,
};