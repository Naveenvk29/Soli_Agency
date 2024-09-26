import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

import userRoutes from "./Routes/userRoutes.js";
import soilRoutes from "./Routes/soil.Routes.js";

const app = express();

app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use("/api/users", userRoutes);
app.use("/api/soils", soilRoutes);

app.get("/test", (req, res) => {
  res.json({ message: "Hello, World!" });
  console.log("Hello, World!");
});

export { app };
