import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cookieParser());

app.get("/test", (req, res) => {
  res.json({ message: "Hello, World!" });
  console.log("Hello, World!");
});

import userRoute from "./routes/user.routes.js";
import soilRoute from "./routes/soil.routes.js";
import distributorsRoutes from "./routes/distributors.routes.js";

app.use("/api/users", userRoute);
app.use("/api/soils", soilRoute);
app.use("/api/distributors", distributorsRoutes);

export { app };
