import jwt from "jsonwebtoken";

const genarateToken = (res, userId) => {
  const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
    expiresIn: "3d",
  });
  res.cookie("jwt", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV !== "production",
    maxAge: 3 * 24 * 60 * 60 * 1000,
  });
};

export default genarateToken;
