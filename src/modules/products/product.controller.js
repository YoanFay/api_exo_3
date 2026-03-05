const AppError = require('../../core/errors/app-error.js');
const productRepository = require('./product.repository.js');
const productSchema = require('./product.schema.js');

function getAllProducts() {
    const product = productRepository.findAll();
    return product;
}

async function getOneProduct(req) {

    // 🚨 Attention : req.params.id est toujours une String !
    const productId = parseInt(req.params.id, 10);
    const product = await productRepository.find(productId);

    if (product.length == 0) {
        throw new AppError("Produit introuvable", 404)
    }

    return product;

}

function addOneProduct(req) {
    const newProduct = {
        name: req.body.name,
        price: req.body.price,
    };

    productSchema.productValidator(newProduct);

    const product = productRepository.createProduct(newProduct);

    return product
}

async function updateProduct(req) {

    const product = await productRepository.find(parseInt(req.body.id, 10));

    if (product.length == 0) {
        throw new AppError("Produit introuvable", 404)
    }

    // Pour l'instant, on fait une confiance aveugle au body (TRÈS MAUVAIS !)
    const updatedProduct = {
        id: parseInt(req.body.id),
        name: req.body.name,
        price: req.body.price,
    }

    productSchema.productValidator(updatedProduct);

    return productRepository.updateProduct(updatedProduct);

}

async function deleteProduct(req) {

    const productId = parseInt(req.body.id, 10);
    const product = await productRepository.find(productId);

    if (product.length > 0) {

        return productRepository.deleteProduct(productId);

    } else {
        return false
    }

}

module.exports = { getAllProducts, getOneProduct, addOneProduct, updateProduct, deleteProduct }