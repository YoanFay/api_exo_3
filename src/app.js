const express = require("express");
const app = express();
const apiRoutes = require('./modules/api/api.routes.js');
const productRoutes = require('./modules/products/product.routes.js');
const server = require('./server.js');
const errorHandler = require('./core/middlewares/error-handler.js');
const apiKeyMiddelware = require('./core/middlewares/api-key.js');
const swaggerUi = require('swagger-ui-express');
const swaggerSpec = require('./config/swagger');

// Middleware global natif pour dire à Express de parser le JSON entrant
app.use(express.json());

const startApp = server.appListen(app);

const options = {
    swaggerOptions: {
        url: './utils/swagger.json'
    }
}

startApp.use('/docs-json', swaggerUi.serve, swaggerUi.setup(null, options))
startApp.use('/docs-jsdoc', swaggerUi.serve, swaggerUi.setup(swaggerSpec))

startApp.use('/api', apiRoutes);

startApp.use(apiKeyMiddelware);

startApp.use('/api/products', productRoutes);
startApp.use(errorHandler);