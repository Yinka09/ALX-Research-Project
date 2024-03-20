import { errorHandler } from "./error.js";
import jwt from "jsonwebtoken";

// Middleware to verify JWT token
export const verifyToken = (req, res, next) => {
  const token = req.cookies.access_token;

  // Check if token does not exist
  if (!token) return next(errorHandler(401, "Unauthorized"));

  // Verify the token
  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    // If there's an error or the token is invalid or expired, return Forbidden error
    if (err) return next(errorHandler(403, "Forbidden"));

    /** If the token is verified with no error,
    Attach the user object to the request for further processing */
    req.user = user;

    // Call the next middleware
    next();
  });
};
