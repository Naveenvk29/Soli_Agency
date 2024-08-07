import User from "../Models/user.model.js";
import asyncHandler from "../Utils/asyncHandler.js";
import createToken from "../Utils/createToken.js";

const createUser = asyncHandler(async (req, res) => {
  const { username, email, password } = req.body;
  if (!username || !email || !password) {
    return res.status(400).json({ message: "All fields are required." });
  }
  const userExists = await User.findOne({ email });
  if (userExists) {
    return res.status(400).json({ message: "Email already exists." });
  }
  const user = new User({ username, email, password });
  try {
    await user.save();
    createToken(res, user._id);
    res.status(200).json({
      _id: user._id,
      username: user.username,
      email: user.email,
      role: user.role,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});

const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ message: "All fields are required." });
  }
  const user = await User.findOne({ email });
  if (user) {
    const isMatch = await user.isPasswordsCorrect(password);
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
    return res.status(401).json({ message: "Invalid email or user Not found" });
  }
});

const logout = asyncHandler(async (req, res) => {
  res.cookie("token", "", {
    expires: new Date(0),
    httpOnly: true,
  });
  res.status(200).json({ message: "Logged out successfully" });
});

const getCurrentUser = asyncHandler(async (req, res) => {
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

const updateCurrentUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);
  if (!user) {
    return res.status(404).json({ message: "User not found" });
  } else {
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
      console.error(error);
      res.status(500).json({ message: "Server error" });
    }
  }
});
// admim
const getAllusers = asyncHandler(async (req, res) => {
  const users = await User.find({}).select("-password");
  res.status(200).json(users);
});

const getUserById = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id).select("-password");
  if (!user) {
    return res.status(404).json({ message: "User not found" });
  } else {
    res.status(200).json(user);
  }
});

const updateUserById = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);
  if (user) {
    user.username = req.body.username || user.username;
    user.email = req.body.email || user.email;
    user.role = req.body.role || user.role;

    const updatedUser = await user.save();
    res.status(200).json({
      _id: updatedUser._id,
      username: updatedUser.username,
      email: updatedUser.email,
      role: updatedUser.role,
    });
  }
});

const deletedUserById = asyncHandler(async (req, res) => {
  const user = await User.findByIdAndDelete(req.params.id);
  if (user) {
    if (user.role === "ADMIN") {
      return res.status(403).json({ message: "Cannot delete an ADMIN user" });
    }
    res.status(200).json({ message: "User deleted successfully" });
  } else {
    res.status(404).json({ message: "User not found" });
  }
});

export {
  createUser,
  loginUser,
  logout,
  getAllusers,
  getCurrentUser,
  updateCurrentUser,
  getUserById,
  updateUserById,
  deletedUserById,
};
