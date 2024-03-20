import { errorHandler } from "../utils/error.js";
import bcryptjs from "bcryptjs";
import User from "../models/user.model.js";
import Listing from "../models/listing.model.js";

// Using the test endpoint
export const test = (req, res) => {
  res.json({
    message: "Api route is working!",
  });
};

// Update user details handler
export const updateUser = async (req, res, next) => {
  // Check if the authenticated user is updating their own account
  if (req.user.id !== req.params.id)
    return next(errorHandler(401, "You can only update your own account"));
  try {
    // Hash the password if provided in the request body
    if (req.body.password) {
      req.body.password = bcryptjs.hashSync(req.body.password, 10);
    }
    // Update the user document in the database
    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      {
        $set: {
          username: req.body.username,
          email: req.body.email,
          password: req.body.password,
          avatar: req.body.avatar,
        },
      },
      { new: true } // Return the updated document
    );

    // Omit the password field from the response
    const { password, ...rest } = updatedUser._doc;

    // Send the updated user details in the response
    res.status(200).json(rest);
  } catch (error) {
    next(error);
  }
};

// Delete user account handler
export const deleteUser = async (req, res, next) => {
  // Check if the authenticated user is deleting their own account
  if (req.user.id !== req.params.id)
    return next(errorHandler(401, "You can only delete your own account"));
  try {
    // Delete the user document from the database
    await User.findByIdAndDelete(req.params.id);
    // Clear the access token cookie
    res.clearCookie("access_token");
    // Send a success message in the response
    res.status(200).json("User has been deleted");
  } catch (error) {
    next(error);
  }
};

// Get user's listings handler
export const getUserListings = async (req, res, next) => {
  // Check if the authenticated user is requesting their own listings
  if (req.user.id === req.params.id) {
    try {
      // Find listings associated with the user
      const listings = await Listing.find({ userRef: req.params.id });
      // Send the listings in the response
      res.status(200).json(listings);
    } catch (error) {
      next(error);
    }
  } else {
    // Else show unauthorized access to other user's listings
    return next(errorHandler(401, "You can only view your own listings!"));
  }
};

// Get user details handler
export const getUser = async (req, res, next) => {
  try {
    // Find the user by ID
    const user = await User.findById(req.params.id);

    // If user is not found, return an error
    if (!user) return next(errorHandler(404, "User not found!"));

    // Else Omit the password field from the response
    const { password: pass, ...rest } = user._doc;

    // Send the user details in the response
    res.status(200).json(rest);
  } catch (error) {
    next(error);
  }
};
