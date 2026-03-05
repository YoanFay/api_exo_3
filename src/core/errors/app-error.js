class AppError extends Error {
  constructor(message, code) {
    super(message);

    this.name = "AppError";
    this.statusCode = code;

    Error.captureStackTrace(this, this.constructor);
  }
}

module.exports = AppError;