const productRepository = require('./product.repository.js');
const productSchema = require('./product.schema.js');

function getAllProducts() {
    const product = productRepository.findAll();
    return product;
}

function getOneProduct(req) {

    // 🚨 Attention : req.params.id est toujours une String !
    const productId = parseInt(req.params.id, 10);
    const product = productRepository.find(productId);
    return product;

}

function addOneProduct(req, res) {
    // Pour l'instant, on fait une confiance aveugle au body (TRÈS MAUVAIS !)
    const newProduct = {
        name: req.body.name,
        price: req.body.price,
    };

    productSchema.productChecker(newProduct, res);

    const product = productRepository.createProduct(newProduct);

    return product
}

async function updateProduct(req) {

    const productId = parseInt(req.body.id, 10);
    const product = await productRepository.find(productId);

    if (product.length > 0) {

        // Pour l'instant, on fait une confiance aveugle au body (TRÈS MAUVAIS !)
        const updatedProduct = {
            id: productId,
            name: req.body.name,
            price: req.body.price,
        }

        return productRepository.updateProduct(updatedProduct);

    } else {
        return false
    }

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

module.exports = { getAllProducts, getOneProduct, addOneProduct, updateProduct, deleteProduct}