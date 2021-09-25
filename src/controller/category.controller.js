const { request, response } = require('express')
const Category = require('../models/Category')
const STATUS_RESPONSE = require('../utils/statusUtils')

const getAll = async (req = request, res = response) => {
  let categories = []
  try {
    categories = await Category.findAll()
  } catch (error) {
    res.status(400).json({
      error
    })
  }

  res.status(200).json(categories)
}

const create = async (req, res = response) => {
  const { body } = req

  try {
    const category = new Category(body)
    await category.save()
    return res.json(category)
  } catch (error) {
    res.status(500).json(STATUS_RESPONSE[500])
  }
}

module.exports = {
  getAll,
  create
}
