const AppError = require("../../core/errors/app-error.js");
const apiKeyUtils = require("../../core/utils/api-key.js")

function getApiKey(clientName) {

    if (!clientName) {
        throw new AppError("Name not recognized", 400)
    }

    const plainKey = apiKeyUtils.createApiKey(clientName);

    return plainKey;

}

module.exports = { getApiKey }