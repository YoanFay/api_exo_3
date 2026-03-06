const express = require("express");
const app = express();
const apiController = require("./api.controller.js")


/**
 * @swagger
 * tags: 
 *  name: API
 *  description: Route juste pour la clé API
 * 
 */

/**
 * @swagger
 * /api/getApiKey:
 *   get:
 *     summary: Retourne la clé API
 *     tags: [API]
 *     requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      type: object
 *                      required:
 *                          - name
 *                      properties:
 *                          name:
 *                              type: string
 *                              description: Nom du client
 *                              example: "Clavier"
 *     responses:
 *       200:
 *         description: Retourne la clé API
 *       401:
 *         description: Forbidden, No x-api-key header found / Forbidden, Invalid API KEY
 */
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