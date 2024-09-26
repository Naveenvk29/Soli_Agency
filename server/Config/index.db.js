import mongoose from "mongoose";

const DB_NAME = "Soil_Farming_Agency";

const connectDB = async () => {
  try {
    const connectinfo = await mongoose.connect(
      `${process.env.MONGODB_URL}/${DB_NAME}`
    );
    console.log(
      `MongoDB connected successfully! DD_Host:- ${connectinfo.connection.host}`
    );
  } catch (error) {
    console.error(`Error connecting to MongoDB: ${error.message}`);
    process.exit(1);
  }
};

export default connectDB;
