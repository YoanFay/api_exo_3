const express = require("express");
const app = express();
const productController = require("./product.controller.js")

// 1. READ (Tous les produits)
app.get("/", async (req, res) => {

    products = await productController.getAllProducts()
    res.status(200).json(products);

});

// 2. READ (Un seul produit via Paramètre d'URL)
app.get("/:id", async (req, res, next) => {

    try {
        const product = await productController.getOneProduct(req);
        res.status(200).json(product);
    } catch (error) {
        next(error)
    }
    
});

// 3. CREATE
app.post("/", async (req, res, next) => {

    try {
        newProduct = await productController.addOneProduct(req)
        res.status(201).json(newProduct);
    } catch (error) {
        next(error);
    }

});

// 4. UPDATE
app.put("/", async (req, res) => {

    try {
        const product = await productController.updateProduct(req)
        res.status(201).json(product);
    } catch (error) {
        next(error);
    }

})

// 5. DELETE
app.delete("/", async (req, res) => {

    try {
        const product = await productController.deleteProduct(req)
        res.status(201).json({ result: "Produit supprimé" });
    } catch (error) {
        next(error);
    }

})

module.exports = app;