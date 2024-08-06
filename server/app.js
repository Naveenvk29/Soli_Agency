import express from "express";
import cookiesParser from "cookie-parser";
import userRoutes from "./Routes/user.route.js";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookiesParser());

app.get("/test", (req, res) => {
  res.json({ message: "Hello, World!" });
  console.log("Hello, World!");
});

app.use("/api/users", userRoutes);

export { app };
