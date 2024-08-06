import jwt from "jsonwebtoken";

const generateToken = (res, userId) => {
  const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
    expiresIn: "3d",
  });
  res.cookie("token", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV !== "production", // Set secure to true in production
    maxAge: 3 * 60 * 60 * 1000, // 3 days
  });
  return token;
};

export default generateToken;
