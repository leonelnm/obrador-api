const { Router } = require('express')
const { getAll, create } = require('../controller/user.controller')

const userRouter = Router()

userRouter.get('/', getAll)
userRouter.post('/', create)

module.exports = userRouter
