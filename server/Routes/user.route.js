import express from "express";
import {
  createUser,
  loginUser,
  logout,
  getAllusers,
  getCurrentUser,
  updateCurrentUser,
  updateUserById,
  deletedUserById,
  getUserById,
} from "../Controllers/user.controllers.js";
import {
  authenticated,
  authorizedAsAdmin,
} from "../Middlewares/auth.middleware.js";
const router = express.Router();

router
  .route("/")
  .get(authenticated, authorizedAsAdmin, getAllusers)
  .post(createUser);

router.post("/login", loginUser);

router.post("/logout", logout);

router
  .route("/profile")
  .get(authenticated, getCurrentUser)
  .put(authenticated, updateCurrentUser);

router
  .route("/:id")
  .get(authenticated, authorizedAsAdmin, getUserById)
  .put(authenticated, authorizedAsAdmin, updateUserById)
  .delete(authenticated, authorizedAsAdmin, deletedUserById);
export default router;
