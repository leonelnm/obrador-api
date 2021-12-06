const { request, response } = require('express')
const Category = require('../models/Category')
const Product = require('../models/Product')
const { categoryViews, productViews } = require('../utils/viewUtils')
const STATUS_RESPONSE = require('../utils/statusUtils')

const isUUID = (uuid) => {
  const pattern = /^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$/
  return pattern.test(uuid)
}

const getAll = async (req = request, res = response, next) => {
  let products = []
  try {
    products = await Product.findAll({
      order: [['name', 'ASC']]
    })
  } catch (error) {
    next(error)
  }

  res.status(200).json(products)
}

const getAllWithCategories = async (req = request, res = response, next) => {
  const { active } = req.query
  let whereStatment = {}
  if (active !== undefined) {
    whereStatment = { active: active === 'true' }
  }

  let products = []
  try {
    products = await Product.findAll({
      where: whereStatment,
      attributes: productViews,
      include: [{
        model: Category,
        as: 'categories',
        attributes: categoryViews,
        through: {
          attributes: []
        }
      }]
    })
  } catch (error) {
    next(error)
  }

  res.status(200).json(products)
}

const getProduct = async (req = request, res = response, next) => {
  const { id } = req.params

  if (!isUUID(id)) {
    return res.status(400).json({
      error: 'Paramater must be valid UUID'
    })
  }

  try {
    const product = await Product.findByPk(id, {
      include: [
        {
          model: Category,
          as: 'categories'
        }
      ]
    })

    if (product) {
      return res.status(200).json(product)
    } else {
      return res.status(404).json(STATUS_RESPONSE[404])
    }
  } catch (error) {
    next(error)
  }
}

const create = async (req, res = response, next) => {
  const { body } = req

  try {
    const product = await Product.create(
      { ...body }
    )
    product.setCategories(body.categories)

    return res.json(product)
  } catch (error) {
    next(error)
  }
}

module.exports = {
  getAll,
  getAllWithCategories,
  create,
  getProduct
}
