const { Router } = require('express')
const { getAll, create } = require('../controller/product.controller')

const productRouter = Router()

productRouter.get('/', getAll)
productRouter.post('/', create)

module.exports = productRouter
