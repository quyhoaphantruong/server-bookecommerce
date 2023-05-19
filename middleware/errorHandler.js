function errorHandler(err, req, res, next) {
  // Log the error for debugging purposes
  console.error(err);

  // Set an appropriate status code for the error
  const statusCode = err.statusCode || 500;

  // Send the error response to the client
  res.status(statusCode).json({
    error: {
      message: err.message || "Internal Server Error",
    },
  });
}

module.exports = errorHandler;
