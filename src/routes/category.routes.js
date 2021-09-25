const { Router } = require('express')
const { getAll, create, getAllWithProducts } = require('../controller/category.controller')

const catgoryRouter = Router()

catgoryRouter.get('/', getAll)
catgoryRouter.get('/full', getAllWithProducts)
catgoryRouter.post('/', create)

module.exports = catgoryRouter
