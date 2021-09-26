const Sequelize = require('sequelize')

const instanceDb = new Sequelize(
  process.env.DATABASE,
  process.env.USERNAMEDB,
  process.env.PASSWORDDB,
  {
    dialect: process.env.DIALECTDB,
    host: process.env.HOSTDB,
    port: process.env.PORTDB,

    logging: false,

    pool: {
      max: Number(process.env.POOL_MAXDB),
      min: Number(process.env.POOL_MINDB),
      acquire: Number(process.env.POOL_ACQUIREDB),
      idle: Number(process.env.POOL_IDLEDB)
    }
  }
)

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

module.exports = {
  instanceDb,
  dbConnection
}
