const z = require("zod");

const ProductSchema = z.object({
    name: z.string("name must be a string"),
    price: z.number("price must be a number")
})

function productChecker(product, res) {

    try {
        ProductSchema.parse(product)
    } catch (e) {
        if (e instanceof z.ZodError) {

            let error = [];
            e.issues.map((element) => {
                error.push({"error":element.code, "message":element.message})
            })

            res.status(400).json(error)
        }
    }

}

module.exports = { productChecker }