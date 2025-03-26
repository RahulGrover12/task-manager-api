const errorHandler = (error, req, res) => {
  const statusCode = error.status || 500;
  const message = error.message || "Internal Server Error";

  res.status(statusCode).json({
    success: false,
    error: { message },
  });
};

export default errorHandler;
