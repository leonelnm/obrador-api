const { Router } = require('express')
const { getAll, create } = require('../controller/category.controller')

const catgoryRouter = Router()

catgoryRouter.get('/', getAll)
catgoryRouter.post('/', create)

module.exports = catgoryRouter
