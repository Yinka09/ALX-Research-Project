import User from "../models/user.model.js";
import bcrypt from "bcryptjs";
import { errorHandler } from "../utils/error.js";
import jwt from "jsonwebtoken";

// User signup handler
export const signup = async (req, res, next) => {
  const { username, email, password } = req.body;

  // Hash the user password
  const hashedPassword = bcrypt.hashSync(password, 10);

  // Create a new user document
  const newUser = new User({ username, email, password: hashedPassword });
  try {
    // Save the new user to the database
    await newUser.save();

    // Send a success message in the response
    res.status(201).json("User created successfully");
  } catch (error) {
    next(error);
  }
};

// User signin handler
export const signin = async (req, res, next) => {
  const { email, password } = req.body;
  try {
    // Find the user by email
    const validUser = await User.findOne({ email });

    // If user is not found, return a 404 error
    if (!validUser) return next(errorHandler(404, "User not found"));

    // Compare passwords
    const validPassword = bcrypt.compareSync(password, validUser.password);

    // If password is invalid, return a 401 error
    if (!validPassword) return next(errorHandler(401, "Wrong credentials!"));

    // Generate JWT token
    const token = jwt.sign({ id: validUser._id }, process.env.JWT_SECRET);

    // Omit password field from user data
    const { password: pass, ...rest } = validUser._doc;

    // Set the token as a cookie and send user data in the response
    res
      .cookie("access_token", token, { httpOnly: true })
      .status(200)
      .json(rest);
  } catch (error) {
    next(error);
  }
};

// Handler for User signin with Google OAuth
export const google = async (req, res, next) => {
  try {
    // Check if user with the provided email exists
    const user = await User.findOne({ email: req.body.email });

    // If user exists, generate JWT token and send user data in the response
    if (user) {
      const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
      const { password: pass, ...rest } = user._doc;
      res
        .cookie("access_token", token, { httpOnly: true })
        .status(200)
        .json(rest);
    } else {
      // Generate a random password
      const generatedPassword =
        Math.random().toString(36).slice(-8) +
        Math.random().toString(36).slice(-8);

      // Hash the generated password
      const hashedPassword = bcrypt.hashSync(generatedPassword, 10);

      // Create a new user document with Google OAuth data
      const newUser = new User({
        username:
          req.body.name.split(" ").join("").toLowerCase() +
          Math.random().toString(36).slice(-8),
        email: req.body.email,
        password: hashedPassword,
        avatar: req.body.photo,
      });

      // Save the new user to the database
      await newUser.save();

      // Generate JWT token for the new user
      const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET);

      // Omit password field from user data
      const { password: pass, ...rest } = newUser._doc;

      // Set the token as a cookie and send user data in the response
      res
        .cookie("access_token", token, { httpOnly: true })
        .status(200)
        .json(rest);
    }
  } catch (error) {
    next(error);
  }
};

// User signout handler
export const signOut = async (req, res, next) => {
  try {
    // Clear the access_token cookie
    res.clearCookie("access_token");

    // Send a success message in the response
    res.status(200).json("User has been logged out!");
  } catch (error) {
    next(error);
  }
};
