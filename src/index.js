require('dotenv').config()

const instanceDb = require('./config/connection.config')
require('./config/associations')

const Server = require('./server/server')

const dbConnection = async () => {
  try {
    await instanceDb.authenticate()

    await instanceDb.sync({ forde: true })
    console.log('Database online')
  } catch (error) {
    console.log({ error })
    throw new Error(error)
  }
}

dbConnection()

new Server().listen()
