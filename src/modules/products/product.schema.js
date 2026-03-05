const z = require("zod");
const AppError = require("../../core/errors/app-error");

const ProductSchema = z.object({
    id: z.uuidv4(),
    name: z.string("name must be a string"),
    price: z.number("price must be a number")
})

function productValidator(product) {

    try {
        ProductSchema.parse(product)
    } catch (e) {
        if (e instanceof z.ZodError) {

            let error = [];
            e.issues.map((element) => {
                throw new AppError(element.message, 400)
            })            
        }
    }

}

module.exports = { productValidator }