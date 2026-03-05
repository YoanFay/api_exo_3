const server = require('../../server.js');

async function findAll() {
    const connection = await server.connectionPool.getConnection();
    const rows = await connection.query("SELECT * FROM product")
    return rows;
}

async function find(id) {
    const connection = await server.connectionPool.getConnection();
    const rows = await connection.query(`SELECT * FROM product WHERE id = '${id}'`)
    return rows;
}

async function createProduct(product) {
    const connection = await server.connectionPool.getConnection();
    const rows = await connection.query(`INSERT INTO product(id, name, price) VALUES('${product.id}', '${product.name}', ${product.price})`)
    return find(parseInt(rows.insertId))
}

async function updateProduct(product) {
    const connection = await server.connectionPool.getConnection();
    const rows = await connection.query(`UPDATE product SET name='${product.name}', price = ${product.price} WHERE id='${product.id}'`)
    if (rows.warningStatus == 0) {
        return find(product.id)
    }

    return false
}

async function deleteProduct(productId) {
    const connection = await server.connectionPool.getConnection();
    const rows = await connection.query(`DELETE FROM product WHERE id='${productId}'`)
    if (rows.warningStatus == 0) {
        return true
    }

    return false
}

module.exports = { findAll, find, createProduct, updateProduct, deleteProduct }