import express from "express";
import cookiesParser from "cookie-parser";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookiesParser());

app.get("/", (req, res) => {
  res.json({ message: "Hello, World!" });
  console.log("Hello, World!");
});

export { app };
