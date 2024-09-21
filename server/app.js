import express, { urlencoded } from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

//
import userRoutes from "./routes/user.routes.js";
import soilRoutes from "./routes/soil.routes.js";
const app = express();

app.use(cors());

app.use(express.json());
app.use(urlencoded({ extended: true }));
app.use(cookieParser());

app.get("/test", (req, res) => {
  res.json({ message: "Hello, World!" });
  console.log("Hello, World!");
});

app.use("/api/users", userRoutes);
app.use("/api/soils", soilRoutes);

export { app };
