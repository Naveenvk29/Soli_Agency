import dotenv from "dotenv";

dotenv.config();

import { v2 as cloudinary } from "cloudinary";
import fs from "fs";

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET,
});

const uploadProfilePic = async (file) => {
  try {
    const res = await cloudinary.uploader.upload(file.path, {
      folder: "Distributers_images",
      public_id: `Distributers/${file.filename}`,
      resource_type: "auto",
    });
    fs.unlinkSync(file.path);
    console.log(res.secure_url, res.public_id);
  } catch (error) {
    console.error("Error uploading profilepic to Cloudinary", error);
    fs.unlinkSync(file.path);
    throw new Error("Failed to upload image to Cloudinary");
  }
};
const deletedProfilePic = async (public_id) => {
  try {
    await cloudinary.uploader.destroy(public_id);
    console.log("Profile image deleted successfully from Cloudinary");
  } catch (error) {
    console.error("Error deleting profileimag from Cloudinary", error);
    throw new Error("Failed to delete profileimag from Cloudinary");
  }
};

const uploadSoilImage = async (file) => {
  try {
    const res = await cloudinary.uploader.upload(file.path, {
      folder: "Soil_images",
      public_id: `Soil_images/${file.filename}`,
      resource_type: "auto",
    });
    fs.unlinkSync(file.path);
    console.log(res.secure_url, res.public_id);
  } catch (error) {
    console.error("Error uploading soil image to Cloudinary", error);
    throw new Error("Failed to upload image to Cloudinary");
  }
};
const deletedSoilImage = async (public_id) => {
  try {
    await cloudinary.uploader.destroy(public_id);
    console.log("Soil image deleted successfully from Cloudinary");
  } catch (error) {
    console.error("Error deleting soil image from Cloudinary", error);
    throw new Error("Failed to delete soil image from Cloudinary");
  }
};

export {
  uploadProfilePic,
  deletedProfilePic,
  uploadSoilImage,
  deletedSoilImage,
};
