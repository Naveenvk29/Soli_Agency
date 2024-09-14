import User from "../Models/user.model.js";
import asyncHandler from "../Utils/asyncHandler.js";
import createToken from "../utils/createToken.js";

const registerUser = asyncHandler(async (req, res) => {
  const { username, email, password } = req.body;
  if (!username || !email || !password) {
    return res.status(400).json({ message: "All fields are required." });
  }
  const existingUser = await User.findOne({ email });
  if (existingUser) {
    return res.status(400).json({ message: "Email already exists." });
  }
  const user = new User({ username, email, password });
  try {
    await user.save();
    createToken(res, user._id);
    res.status(201).json({
      _id: user._id,
      username: user.username,
      email: user.email,
      role: user.role,
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
});

const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ message: "All fields are required." });
  }
  const user = await User.findOne({ email: email });
  if (user) {
    const isMatch = await user.isPasswordIsValid(password);
    if (isMatch) {
      createToken(res, user._id);
      return res.status(200).json({
        _id: user._id,
        username: user.username,
        email: user.email,
        role: user.role,
      });
    } else {
      return res.status(401).json({ message: "Invalid credentials" });
    }
  } else {
    return res.status(404).json({ message: "User not found" });
  }
});

const logOutUser = asyncHandler(async (req, res) => {
  res.cookie("jws", "", {
    httpOnly: true,
    expires: new Date(0),
  });
  res.status(200).json({ message: "Logged out successfully" });
});

const getAllUser = asyncHandler(async (req, res) => {
  const users = await User.find().select("-password");
  res.status(200).json(users);
});
const getSpecificUser = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const user = await User.findById(id).select("-password");
  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }
  res.status(200).json(user);
});

const getcurrentUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);
  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }
  res.status(200).json({
    _id: user._id,
    username: user.username,
    email: user.email,
    role: user.role,
  });
});

const updateUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);
  if (user) {
    user.username = req.body.username || user.username;
    user.email = req.body.email || user.email;
    user.password = req.body.password || user.password;
    try {
      await user.save();
      res.status(200).json({
        _id: user._id,
        username: user.username,
        email: user.email,
        role: user.role,
      });
    } catch (error) {
      return res.status(400).json({ message: error.message });
    }
  } else {
    return res.status(404).json({ message: "User not found" });
  }
});

export {
  registerUser,
  loginUser,
  logOutUser,
  getAllUser,
  getSpecificUser,
  getcurrentUserProfile,
  updateUserProfile,
};
