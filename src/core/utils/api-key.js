const crypto = require("crypto");

const apiKeysDB = new Map();

const createApiKey = (clientName) => {
  const randomBuffer = crypto.randomBytes(32);

  const plainAPIKey = `product_apiexo3_${randomBuffer.toString("hex")}`;

  const hashedApiKey = crypto
    .createHash("sha256")
    .update(plainAPIKey)
    .digest("hex");
    
  apiKeysDB.set(hashedApiKey, {
    client: clientName,
    createdAt: new Date().toISOString(),
  });

  return plainAPIKey;
};

const checkClientApiKey = (APIkey) => {
  const hashedApiKey = crypto.createHash("sha256").update(APIkey).digest("hex");
  const client = apiKeysDB.get(hashedApiKey);
  return client;
};

module.exports = { createApiKey, checkClientApiKey };
