const express = require("express");
const app = express();
const productRoutes = require('./modules/products/product.routes');
const server = require('./server.js');

// Middleware global natif pour dire à Express de parser le JSON entrant
app.use(express.json());

const startApp = server.appListen(app);

startApp.use('/api/products', productRoutes);