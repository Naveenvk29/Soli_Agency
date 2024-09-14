import dotenv from "dotenv";
import { app } from "./app.js";
import connectDB from "./Config/index.db.js";

dotenv.config();
// Connect to MongoDB

const port = process.env.PORT || 8000;

connectDB()
  .then(() => {
    app.listen(port, () => {
      console.log(`Server running on port ${port}`);
    });
  })
  .catch((err) => {
    console.error(`Error connecting to the database: ${err.message}`);
  });
