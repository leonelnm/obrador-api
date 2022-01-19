const { Router } = require('express')
const { getAll, create } = require('../controller/user.controller')

const userExtractor = require('../middleware/userExtractor')

const userRouter = Router()

userRouter.get('/', userExtractor, getAll)
userRouter.post('/', create)

module.exports = userRouter
