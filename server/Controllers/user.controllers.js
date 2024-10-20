import User from "../Model/user.model.js";
import asyncHandler from "../Utils/asyncHandler.js";
import createToken from "../Utils/createToken.js";

// create a new user
const registerUser = asyncHandler(async (req, res) => {
  const { username, email, password } = req.body;
  if (!username || !email || !password) {
    return res.status(400).json({
      message: "All fields are required",
    });
  }
  const existingUser = await User.findOne({ email });
  if (existingUser) {
    return res.status(400).json({
      message: "Email already exists",
    });
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
    throw new Error(error.message);
  }
});

// login an existing user
const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ message: "Email and password are required" });
  }
  const user = await User.findOne({ email });
  if (user) {
    const isMatch = await user.isPasswordIsValid(password);
    if (!isMatch) {
      return res.status(401).json({ message: "Incorrect credentials" });
    }
    createToken(res, user._id);
    res.json({
      _id: user._id,
      username: user.username,
      email: user.email,
      role: user.role,
    });
  } else {
    return res.status(404).json({ message: "User not found" });
  }
});

// logout user from account manager and redirect back to login page
const logOutUser = asyncHandler(async (req, res) => {
  res.cookie("jwt", "", {
    httpOnly: true,
    expires: new Date(0),
  });
  res.status(200).json({ message: "Logged out successfully" });
});

// get all users from the database
const getAllUsers = asyncHandler(async (req, res) => {
  const users = await User.find({}).select("-password");
  if (!users) {
    res.status(404).json({ message: "No users found" });
  }
  res.json(users);
});

// get user profile by id
const getcurrentUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);
  if (user) {
    res.json({
      _id: user._id,
      username: user.username,
      email: user.email,
      role: user.role,
    });
  } else {
    res.status(404).json({ message: "User not found" });
  }
});

// update user profile by id
const updateUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);
  if (user) {
    user.username = req.body.username || user.username;
    user.email = req.body.email || user.email;
    user.password = req.body.password || user.password;
    user.phone = req.body.phone || user.phone;
    user.address = req.body.address || user.address;
    if (user.role === "admin") {
      user.role = req.body.role || user.role;
    }
    const updatedUser = await user.save();
    res.json({
      _id: updatedUser._id,
      username: updatedUser.username,
      email: updatedUser.email,
      role: updatedUser.role,
      address: updatedUser.address,
      phone: updatedUser.phone,
    });
  } else {
    res.status(404).json({ message: "User not found" });
  }
});

export {
  registerUser,
  loginUser,
  logOutUser,
  getAllUsers,
  getcurrentUserProfile,
  updateUserProfile,
};
