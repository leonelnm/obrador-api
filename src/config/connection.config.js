// import dotenv from 'dotenv'
const Sequelize = require('sequelize')

// dotenv.config()

const instanceDb = new Sequelize(
  process.env.DATABASE,
  process.env.USERNAME,
  process.env.PASSWORD,
  {
    host: process.env.HOST,
    dialect: 'mariadb',

    pool: {
      max: Number(process.env.POOL_MAX),
      min: Number(process.env.POOL_MIN),
      acquire: Number(process.env.POOL_ACQUIRE),
      idle: Number(process.env.POOL_IDLE)
    }
  }
)

module.exports = instanceDb
