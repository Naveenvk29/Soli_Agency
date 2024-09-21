import dotenv from "dotenv";
import connectDB from "./config/index.db.js";
import { app } from "./app.js";
dotenv.config();

// Connect to MongoDB
const port = process.env.PORT || 5000;
connectDB()
  .then(() => {
    app.listen(process.env.port, () => {
      console.log(`Server running on port ${process.env.port}`);
    });
  })
  .catch((err) => console.error(`Error connecting to MongoDB: ${err.message}`));
