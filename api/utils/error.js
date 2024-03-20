// Error handler
export const errorHandler = (statusCode, message) => {
  // Create a new Error object
  const error = new Error();

  // Set the status code and message properties of the error object and return the error
  error.statusCode = statusCode;
  error.message = message;
  return error;
};
