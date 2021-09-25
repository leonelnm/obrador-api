const { Router } = require('express')
const { getAll, create, getProduct, getAllWithCategories } = require('../controller/product.controller')

const productRouter = Router()

productRouter.get('/', getAll)
productRouter.get('/full', getAllWithCategories)
productRouter.post('/', create)
productRouter.get('/:id', getProduct)

module.exports = productRouter
