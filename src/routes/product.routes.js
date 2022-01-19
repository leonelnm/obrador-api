const { Router } = require('express')
const { getAll, create, getProduct, getAllWithCategories } = require('../controller/product.controller')

const userExtractor = require('../middleware/userExtractor')

const productRouter = Router()

productRouter.get('/', userExtractor, getAll)
productRouter.get('/full', userExtractor, getAllWithCategories)
productRouter.post('/', userExtractor, create)
productRouter.get('/:id', userExtractor, getProduct)

module.exports = productRouter
