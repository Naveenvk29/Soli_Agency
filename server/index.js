import dotenv from "dotenv";
import ConnectDB from "./Config/index.db.js";
import { app } from "./app.js";

dotenv.config();

const port = process.env.PORT || 5000;
ConnectDB()
  .then(() => {
    console.log("Connected to the MongoDB database");
    app.listen(port, () => {
      console.log(`Server running on port ${port}`);
    });
  })
  .catch((err) => {
    console.error(`Error connecting to the database: ${err.message}`);
    process.exit(1);
  });
