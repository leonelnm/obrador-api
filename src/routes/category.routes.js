const { Router } = require('express')
const { getAll, create, getAllWithProducts } = require('../controller/category.controller')

const userExtractor = require('../middleware/userExtractor')

const catgoryRouter = Router()

catgoryRouter.get('/', userExtractor, getAll)
catgoryRouter.get('/full', userExtractor, getAllWithProducts)
catgoryRouter.post('/', userExtractor, create)

module.exports = catgoryRouter
