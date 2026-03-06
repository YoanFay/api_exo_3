const express = require("express");
const app = express();
const apiController = require("./api.controller.js")

app.get("/getApiKey", (req, res, next) => {
    const clientName = req.query.name;

    try {
        const plainKey = apiController.getApiKey(clientName)
        res.status(200).json({ key: plainKey });
    }
    catch (e) {
        next(e)
    }
});

module.exports = app;