import dotenv from "dotenv";
dotenv.config();

import { v2 as cloudinary } from "cloudinary";
import fs from "fs/promises"; // Use async version of fs

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET,
});

// Generic upload function
const uploadImage = async (file, folder, publicIdPrefix) => {
  try {
    const res = await cloudinary.uploader.upload(file.path, {
      folder,
      public_id: `${publicIdPrefix}/${file.filename}`,
      resource_type: "auto",
    });
    await fs.unlink(file.path); // console.log(res.secure_url, res.public_id);
    return res;
  } catch (error) {
    await fs.unlink(file.path); // Ensure file is removed even if upload fails
    console.error(error.message);
    throw new Error(`Failed to upload image to Cloudinary`);
  }
};

// Soil image upload function
const uploadSoilImage = (file) => uploadImage(file, "soil_images", "soils");

// Profile picture upload function
const uploadProfilePic = (file) =>
  uploadImage(file, "profile_pictures", "profile_pictures");

// Generic delete function
const deleteImage = async (publicId) => {
  try {
    const res = await cloudinary.uploader.destroy(publicId);
    // console.log(`Image with public_id: ${publicId} deleted successfully!`);
    return res;
  } catch (error) {
    console.error(
      `Failed to delete image with public_id: ${publicId}: ${error.message}`
    );
    throw new Error("Failed to delete image from Cloudinary");
  }
};

// Soil image delete function
const deleteSoilImage = (publicId) => deleteImage(publicId);

// Profile picture delete function
const deleteProfilePic = (publicId) => deleteImage(publicId);

export { uploadSoilImage, deleteSoilImage, uploadProfilePic, deleteProfilePic };
