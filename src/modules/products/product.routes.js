const express = require("express");
const app = express();
const productController = require("./product.controller.js")

/**
 * @swagger
 * tags: 
 *  name: Products
 *  description: Routes de base des produits
 * 
 */

/**
 * @swagger
 * /api/products:
 *   get:
 *     summary: Récupérer tous les produits
 *     tags: [Products]
 *     responses:
 *       200:
 *         description: Liste des produits récupérée avec succès
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: char
 *                     example: "34c1e448-0edf-4445-82f7-6717e43b2f5a"
 *                   name:
 *                     type: string
 *                     example: "Clavier"
 *                   price:
 *                     type: number
 *                     example: 42
 */
app.get("/", async (req, res) => {

    products = await productController.getAllProducts(req)
    res.status(200).json(products);

});

/**
 * @swagger
 * /api/products/{id}:
 *   get:
 *     summary: Récupérer un seul produit
 *     tags: [Products]
 *     parameters:
 *      -   in: path
 *          name: id
 *          schema :
 *              type: char
 *          required: true
 *          description: UUID du produit
 *     responses:
 *       200:
 *         description: Produit récupérée avec succès
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: char
 *                     example: "34c1e448-0edf-4445-82f7-6717e43b2f5a"
 *                   name:
 *                     type: string
 *                     example: "Clavier"
 *                   price:
 *                     type: number
 *                     example: 42
 */
app.get("/:id", async (req, res, next) => {

    try {
        const product = await productController.getOneProduct(req);
        res.status(200).json(product);
    } catch (error) {
        next(error)
    }

});

/**
 * @swagger
 * /api/products/:
 *   post:
 *     summary: Ajoute un produit
 *     tags: [Products]
 *     requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      type: object
 *                      required:
 *                          - name
 *                          - price
 *                      properties:
 *                          name:
 *                              type: string
 *                              description: Nom du produit
 *                              example: "Clavier"
 *                          price:
 *                              type: int
 *                              description: Prix du produit
 *                              example: 42
 *     responses:
 *       201:
 *         description: Affiche le produit
 *       400:
 *         description: Erreur de validation Zod (Payload invalide)
 *       401:
 *         description: Non autorisé (Token JWT manquant ou invalide)
 */
app.post("/", async (req, res, next) => {

    try {
        newProduct = await productController.addOneProduct(req)
        res.status(201).json(newProduct);
    } catch (error) {
        next(error);
    }

});

/**
 * @swagger
 * /api/products/:
 *   put:
 *     summary: Modifie un produit
 *     tags: [Products]
 *     requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      type: object
 *                      required:
 *                          - id
 *                          - name
 *                          - price
 *                      properties:
 *                          id:
 *                              type: char
 *                              description: UUID du produit
 *                              example: "34c1e448-0edf-4445-82f7-6717e43b2f5a"
 *                          name:
 *                              type: string
 *                              description: Nom du produit
 *                              example: "Clavier"
 *                          price:
 *                              type: int
 *                              description: Prix du produit
 *                              example: 42
 *     responses:
 *       201:
 *         description: Affiche le produit
 *       400:
 *         description: Erreur de validation Zod (Payload invalide)
 *       401:
 *         description: Non autorisé (Token JWT manquant ou invalide)
 *       404:
 *         description: Produit introuvable 
 */
app.put("/", async (req, res, next) => {

    try {
        const product = await productController.updateProduct(req)
        res.status(201).json(product);
    } catch (error) {
        next(error);
    }

})

/**
 * @swagger
 * /api/products/:
 *   delete:
 *     summary: Supprime un produit
 *     tags: [Products]
 *     requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      type: object
 *                      required:
 *                          - id
 *                      properties:
 *                          id:
 *                              type: char
 *                              description: UUID du produit
 *                              example: "34c1e448-0edf-4445-82f7-6717e43b2f5a"
 *     responses:
 *       201:
 *         description: Produit supprimé
 */
app.delete("/", async (req, res, next) => {

    try {
        const product = await productController.deleteProduct(req)
        res.status(201).json({ result: "Produit supprimé" });
    } catch (error) {
        next(error);
    }

})

module.exports = app;