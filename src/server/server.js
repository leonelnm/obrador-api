const express = require('express')
const morgan = require('morgan')
const cors = require('cors')

// DB
const { dbConnection } = require('../config/connection.config')
require('../config/associations')

// Routes
const productRouter = require('../routes/product.routes')
const categoryRouter = require('../routes/category.routes')
const userRouter = require('../routes/user.routes')
const { loginRouter } = require('../routes/login.routes')

// Middlewares
const notFound = require('../middleware/notFound')
const { handleError } = require('../middleware/handleErrors')

class Server {
  constructor () {
    dbConnection()

    this.port = process.env.PORT
    this.app = express()
    this.configure()
    this.middlewares()
    this.routes()
  }

  configure () {
    this.app.disable('x-powered-by')
    this.app.set('env', 'development')
  }

  middlewares () {
    this.app.use(express.static('public'))
    this.app.use(cors())
    this.app.use(morgan('common'))
    this.app.use(express.json())
    this.app.use(express.urlencoded({ extended: true }))
  }

  routes () {
    this.app.use('/api/product', productRouter)
    this.app.use('/api/category', categoryRouter)
    this.app.use('/api/user', userRouter)
    this.app.use('/api/login', loginRouter)

    // Errors
    this.app.use(notFound)
    this.app.use(handleError)
  }

  listen () {
    this.app.listen(this.port, () => {
      console.log(`Running on PORT ${this.port}`)
    })
  }
}

module.exports = Server
