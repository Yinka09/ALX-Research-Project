import express from "express";
import {
  createListing,
  deleteListing,
  updateListing,
  getListing,
  getListings,
} from "../controllers/listing.controller.js";
import { verifyToken } from "../utils/verifyUser.js";

// Create Express router for listing
const router = express.Router();

// Route to create a new listing
router.post("/create", verifyToken, createListing);

// Route to delete a listing by ID
router.delete("/delete/:id", verifyToken, deleteListing);

// Route to update a listing by ID
router.post("/update/:id", verifyToken, updateListing);

// Route to get a listing by ID
router.get("/get/:id", getListing);

// Route to get all listings
router.get("/get", getListings);

export default router;
