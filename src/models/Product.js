const Sequlize = require('sequelize')
const { instanceDb } = require('../config/connection.config')

const DataTypes = Sequlize.DataTypes

const Product = instanceDb.define('Product', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    allowNull: false,
    primaryKey: true
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },
  price: { type: DataTypes.DOUBLE },
  imgId: { type: DataTypes.STRING },
  imgUrl: { type: DataTypes.STRING },
  imgPlaceholder: { type: DataTypes.STRING },
  content: { type: DataTypes.STRING },
  active: {
    type: DataTypes.BOOLEAN,
    defaultValue: true,
    allowNull: false
  }
}, {
  freezeTableName: true
})

module.exports = Product
