import dotenv from "dotenv";
dotenv.config();

import { v2 as cloudinary } from "cloudinary";
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET,
});

import { promises as fs } from "fs"; // Import promises API from fs

const uploadImage = async (file, folder, publicIdPrefix) => {
  if (!file || !file.path) {
    throw new Error("Invalid file object or missing path");
  }
  try {
    const res = await cloudinary.uploader.upload(file.path, {
      folder,
      public_id: `${publicIdPrefix}/${file.filename}`,
      resource_type: "auto",
    });
    // Use fs.promises.unlink to delete the file after upload
    await fs.unlink(file.path);
    return res;
  } catch (error) {
    if (file.path) await fs.unlink(file.path); // Ensure the file is deleted in case of error
    console.error(error.message);
    throw new Error(`Failed to upload image to Cloudinary`);
  }
};

const uploadSoilImage = (file) => uploadImage(file, "soil_images", "soils");

const deleteSoilImage = async (public_id) => {
  try {
    await cloudinary.uploader.destroy(public_id);
  } catch (error) {
    console.error(error);
    throw new Error("Failed to delete image from Cloudinary");
  }
};

export { uploadSoilImage, deleteSoilImage };
