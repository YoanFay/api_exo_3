module.exports = (err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message =
    statusCode === 500 && process.env.NODE_ENV === "production"
      ? "Erreur interne du serveur"
      : err.message;
  res.status(statusCode).json({
    status: "error",
    message: message,
  });
};