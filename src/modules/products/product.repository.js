const server = require('../../server.js');

async function findAll(query) {

    let request = "SELECT * FROM product"

    if(query){

        const queryList= query.split("&")

        request = `${request} ORDER BY `

        queryList.map(element => {
            const querySplit = element.split("=")
            request = `${request} ${querySplit[1]} ${querySplit[0]},`
        })

        request = request.substring(0, request.length - 1)
    }

    const connection = await server.connectionPool.getConnection();
    const rows = await connection.query(request)
    return rows;
}

async function find(id) {
    const connection = await server.connectionPool.getConnection();
    const rows = await connection.query(`SELECT * FROM product WHERE id = '${id}'`)
    return rows;
}

async function createProduct(product) {
    const connection = await server.connectionPool.getConnection();
    const rows = await connection.query(`INSERT INTO product(id, name, price, category) VALUES('${product.id}', '${product.name}', ${product.price}, '${product.category}')`)
    return find(product.id)
}

async function updateProduct(product) {
    const connection = await server.connectionPool.getConnection();
    const rows = await connection.query(`UPDATE product SET name='${product.name}', price = ${product.price}, category='${product.category}' WHERE id='${product.id}'`)
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