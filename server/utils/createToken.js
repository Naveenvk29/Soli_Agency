import jwt from "jsonwebtoken";

const genarateToken = (res, userId) => {
  const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRATION,
  });
  res.cookie("jwt", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV !== "production",
    maxAge: process.env.JWT_EXPIRATION * 24 * 60 * 60 * 1000,
  });
  return token;
};

export default genarateToken;
