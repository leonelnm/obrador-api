const Sequelize = require('sequelize')
const instanceDb = require('../config/connection.config')
const DataTypes = Sequelize.DataTypes

const Category = instanceDb.define('Category', {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },
  description: { type: DataTypes.STRING }
}, {
  freezeTableName: true
})

module.exports = Category
