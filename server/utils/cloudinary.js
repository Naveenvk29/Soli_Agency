import dotenv from "dotenv";
dotenv.config();

import { v2 as cloudinary } from "cloudinary";
import fs from "fs";

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET,
});

const uploadSoilImage = async (file) => {
  try {
    const res = await cloudinary.uploader.upload(file.path, {
      folder: "Soil_images",
      public_id: `soils/${file.filename}`,
      resource_type: "auto",
    });
    fs.unlinkSync(file.path);
    console.log(res.secure_url, res.public_id);
  } catch (error) {
    console.log(error.message);
    fs.unlinkSync(file.path);
    throw new Error("Failed to upload image in cloudinary");
  }
};

const deleteSoilImage = async (publicId) => {
  try {
    await cloudinary.uploader.destroy(publicId);
    console.log(`
        Image with public_id: ${publicId} deleted successfully!
    `);
  } catch (error) {
    console.log(error.message);
    throw new Error("Failed to delete image from cloudinary");
  }
};

const uploadDistirbutersImages = async (file) => {
  try {
    const responce = await cloudinary.uploader.upload(file.path, {
      folder: "distributors_img",
      public_id: `distributors/${file.filename}`,
      resource_type: "auto",
    });
    fs.unlinkSync(file.path);
    console.log(responce.secure_url, responce.public_id);
  } catch (error) {
    console.log(error.message);
    throw new Error("Failed to upload distributors");
  }
};

const deleteDistributersimage = async (public_id) => {
  try {
    await cloudinary.uploader.destroy(public_id);
    console.log("All images from distributors folder deleted successfully!");
  } catch (error) {
    console.log(error.message);
    throw new Error("Failed to delete images from distributors folder");
  }
};

export {
  uploadSoilImage,
  deleteSoilImage,
  uploadDistirbutersImages,
  deleteDistributersimage,
};
