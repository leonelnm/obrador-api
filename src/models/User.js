const Sequelize = require('sequelize')
const { instanceDb } = require('../config/connection.config')
const DataTypes = Sequelize.DataTypes

const User = instanceDb.define('User', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    allowNull: false,
    primaryKey: true
  },
  username: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },
  name: { type: DataTypes.STRING },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },
  passwordHash: {
    type: DataTypes.STRING,
    allowNull: false
  }
}, {
  freezeTableName: true
})

module.exports = User
