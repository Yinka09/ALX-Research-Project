import { parse } from "dotenv";
import Listing from "../models/listing.model.js";
import { errorHandler } from "../utils/error.js";

// Create a new listing handler
export const createListing = async (req, res, next) => {
  try {
    // Create a new listing document in the database
    const listing = await Listing.create(req.body);
    // Send the newly created listing in the response
    return res.status(201).json(listing);
  } catch (error) {
    next(error);
  }
};

// Delete a listing handler
export const deleteListing = async (req, res, next) => {
  // Find the listing by ID
  const listing = await Listing.findById(req.params.id);

  // If listing is not found, return a 404 error
  if (!listing) {
    return next(errorHandler(404, "Listing not found!"));
  }

  // Else check if the authenticated user owns the listing
  if (req.user.id !== listing.userRef) {
    return next(errorHandler(401, "You can only delete your own listings!"));
  }

  try {
    // Delete the listing document from the database
    await Listing.findByIdAndDelete(req.params.id);

    // Send a success message in the response
    res.status(200).json("Listing has been deleted");
  } catch (error) {
    next(error);
  }
};

// Update a listing handler
export const updateListing = async (req, res, next) => {
  // Find the listing by ID
  const listing = await Listing.findById(req.params.id);

  // If listing is not found, return a 404 error
  if (!listing) {
    return next(errorHandler(404, "Listing not found!"));
  }

  // Check if the authenticated user owns the listing
  if (req.user.id !== listing.userRef) {
    return next(errorHandler(401, "You can only update your own listings!"));
  }
  try {
    // Update the listing document in the database
    const updatedListing = await Listing.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    // Send the updated listing in the response
    res.status(200).json(updatedListing);
  } catch (error) {
    next(error);
  }
};

// Get a listing by ID handler
export const getListing = async (req, res, next) => {
  try {
    // Find the listing by ID
    const listing = await Listing.findById(req.params.id);

    // If listing is not found, return a 404 error
    if (!listing) {
      return next(errorHandler(404, "Listing not found"));
    }
    // Send the listing in the response
    res.status(200).json(listing);
  } catch (error) {
    next(error);
  }
};

// Handler to get listings with optional filters, search, pagination, and sorting
export const getListings = async (req, res, next) => {
  try {
    // Parse query parameters for filtering, search, pagination, and sorting
    const limit = parseInt(req.query.limit) || 9;
    const startIndex = parseInt(req.query.startIndex) || 0;
    let offer = req.query.offer;

    if (offer === undefined || offer === "false") {
      offer = { $in: [false, true] };
    }

    let furnished = req.query.furnished;

    if (furnished === undefined || furnished === "false") {
      furnished = { $in: [false, true] };
    }

    let parking = req.query.parking;
    if (parking === undefined || parking === "false") {
      parking = { $in: [false, true] };
    }

    let type = req.query.type;
    if (type === undefined || type === "all") {
      type = { $in: ["sale", "rent"] };
    }

    const searchTerm = req.query.searchTerm || "";

    const sort = req.query.sort || "createdAt";

    const order = req.query.order || "desc";

    // Find listings based on filters, search term, pagination, and sorting
    const listings = await Listing.find({
      name: { $regex: searchTerm, $options: "i" },
      offer,
      furnished,
      parking,
      type,
    })
      .sort({ [sort]: order })
      .limit(limit)
      .skip(startIndex);

    // Send the listings in the response
    return res.status(200).json(listings);
  } catch (error) {
    next(error);
  }
};
