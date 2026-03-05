const AppError = require('../../core/errors/app-error.js');
const productRepository = require('./product.repository.js');
const productSchema = require('./product.schema.js');
const { v4: uuidv4 } = require("uuid");

function getAllProducts(req) {

    const query = req._parsedUrl.query

    const product = productRepository.findAll(query);
    return product;
}

async function getOneProduct(req) {

    const product = await productRepository.find(req.params.id);

    if (product.length == 0) {
        throw new AppError("Produit introuvable", 404)
    }

    return product;

}

function addOneProduct(req) {
    const newProduct = {
        id: uuidv4(),
        name: req.body.name,
        price: req.body.price,
        category: req.body.category,
    };

    productSchema.productValidator(newProduct);

    const product = productRepository.createProduct(newProduct);

    return product
}

async function updateProduct(req) {

    const product = await productRepository.find(req.body.id);

    if (product.length == 0) {
        throw new AppError("Produit introuvable", 404)
    }

    // Pour l'instant, on fait une confiance aveugle au body (TRÈS MAUVAIS !)
    const updatedProduct = {
        id: req.body.id,
        name: req.body.name,
        price: req.body.price,
        category: req.body.category,
    }

    productSchema.productValidator(updatedProduct);

    return productRepository.updateProduct(updatedProduct);

}

async function deleteProduct(req) {

    const product = await productRepository.find(req.body.id);

    return productRepository.deleteProduct(req.body.id);

}

module.exports = { getAllProducts, getOneProduct, addOneProduct, updateProduct, deleteProduct }