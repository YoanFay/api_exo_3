const AppError = require("../errors/app-error.js");
const apiKeyUtils = require("../utils/api-key.js")

module.exports = (req, res, next) => {
  const providedAPIKey = req.headers["x-api-key"];

  if (!providedAPIKey) {
    throw new AppError("Forbidden, No x-api-key header found", 401)
  }

  const clientRecord = apiKeyUtils.checkClientApiKey(providedAPIKey);

  if (!clientRecord) {
    throw new AppError("Forbidden, Invalid API KEY", 401)
  }

  req.client = clientRecord;
  next();
};