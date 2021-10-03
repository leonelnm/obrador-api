const { Router } = require('express')
const { login } = require('../controller/login.controller')

const loginRouter = Router()

loginRouter.post('/', login)

module.exports = {
  loginRouter
}
