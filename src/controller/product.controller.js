const { request, response } = require('express')
const Category = require('../models/Category')
const Product = require('../models/Product')
const { categoryViews, productViews } = require('../utils/viewUtils')
const STATUS_RESPONSE = require('../utils/statusUtils')
const PRODUCTSINFO = require('./info')

const getAll = async (req = request, res = response) => {
  let products = []
  try {
    products = await Product.findAll()
  } catch (error) {
    res.status(400).json({
      error
    })
  }

  res.status(200).json(products)
}

const getAllWithCategories = async (req = request, res = response) => {
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
    res.status(400).json({
      error
    })
  }

  res.status(200).json(products)
}

const getProduct = async (req = request, res = response) => {
  const { id } = req.params

  const query = req.query

  if (isNaN(id)) {
    return res.status(400).json({
      error: 'Paramater must be number as string'
    })
  }

  try {
    const product = await Product.findByPk(Number(id), {
      include: [
        {
          model: Category,
          as: 'categories'
        }
      ]
    })

    console.log({ query })

    if (product) {
      return res.status(200).json(product)
    } else {
      return res.status(404).json(STATUS_RESPONSE[404])
    }
  } catch (error) {
    res.status(500).json(STATUS_RESPONSE[500])
  }
}

const create = async (req, res = response) => {
  const { body } = req

  try {
    const product = await Product.create(
      { ...body }
    )
    product.setCategories(body.categories)

    return res.json(product)
  } catch (error) {
    console.log(error)
    res.status(500).json(STATUS_RESPONSE[500])
  }
}

const loadDataFromArray = async () => {
  const products = PRODUCTSINFO

  for (const p of products) {
    const
      {
        url,
        content,
        imgId,
        placeholder,
        name,
        price
      } = p

    const contenido = content.join('<>')
    const precio = price === '' ? '0.0' : price

    try {
      const product = await Product.create(
        {
          imgUrl: url,
          content: contenido,
          imgId,
          imgPlaceholder: placeholder,
          name,
          price: precio
        }
      )
      await product.setCategories(p.categories)
    } catch (error) {
      console.log('creando')
      console.log(error)
      console.log({ p })
      break
    }
  }

  console.log('end')
}

module.exports = {
  getAll,
  getAllWithCategories,
  create,
  getProduct
}
