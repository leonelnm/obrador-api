require('dotenv').config()

const { dbConnection } = require('./config/connection.config')
require('./config/associations')

const Server = require('./server/server')

dbConnection()

new Server().listen()
