import express from "express";
import {
  deleteUser,
  test,
  updateUser,
  getUserListings,
  getUser,
} from "../controllers/user.controller.js";
import { verifyToken } from "../utils/verifyUser.js";

// Create an express router for user
const router = express.Router();

// Route to test endpoint
router.get("/test", test);

// Route to update user information
router.post("/update/:id", verifyToken, updateUser);

// Route to delete user account
router.delete("/delete/:id", verifyToken, deleteUser);

// Route to get listings associated with a user
router.get("/listings/:id", verifyToken, getUserListings);

// Route to get user information
router.get("/:id", verifyToken, getUser);

export default router;
