const express = require("express");
const app = express();
const productController = require("./product.controller.js")

// 1. READ (Tous les produits)
app.get("/", async (req, res) => {
    products = await productController.getAllProducts()
    res.status(200).json(products);
});

// 2. READ (Un seul produit via Paramètre d'URL)
app.get("/:id", async (req, res) => {
    const product = await productController.getOneProduct(req);
    if (product.length == 0) {
        return res.status(404).json({ error: "Produit introuvable" });
    }
    res.status(200).json(product);
});

// 3. CREATE
app.post("/", async (req, res) => {
    const newProduct = await productController.addOneProduct(req, res)
    // Bonne pratique : 201 Created + on renvoie l'objet créé
    if (newProduct.length > 0) {
        res.status(201).json(newProduct);
    }else{
        res.status(400);
    }
});

// 4. UPDATE
app.put("/", async (req, res) => {
    const product = await productController.updateProduct(req)
    // Bonne pratique : 201 Created + on renvoie l'objet modifiée
    if (product.length && product.length > 0) {
        res.status(201).json(product);
    }else{
        res.status(400).send(product);
    }
}) 

// 5. DELETE
app.delete("/", async (req, res) => {
    const product = await productController.deleteProduct(req)
    
    if (product) {
        res.status(201).json({result : "Produit supprimé"});
    }else{
        res.status(404).json({error : "Produit non trouvé"});
    }
}) 

module.exports = app;