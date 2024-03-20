import express from "express";
import {
  signup,
  signin,
  google,
  signOut,
} from "../controllers/auth.controller.js";

// Create Express router for authentication
const router = express.Router();

// Route to register a new user
router.post("/signup", signup);

// Route to authenticate and login a user
router.post("/signin", signin);

// Route to authenticate a user using Google OAuth
router.post("/google", google);

// Route to sign out and invalidate the session
router.get("/signout", signOut);

export default router;
