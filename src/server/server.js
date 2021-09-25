const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
// const cityRouter = require('../routes/city.routes')
const productRouter = require('../routes/product.routes')
const categoryRouter = require('../routes/category.routes')

class Server {
  constructor () {
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
    // this.app.use('/api/city', cityRouter)
    this.app.use('/api/product', productRouter)
    this.app.use('/api/category', categoryRouter)

    // Errors
    this.app.use((req, res) => {
      res.status(404).json({
        error: 'Not found'
      })
    })
  }

  listen () {
    this.app.listen(this.port, () => {
      console.log(`Running on PORT ${this.port}`)
    })
  }
}

module.exports = Server
