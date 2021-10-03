const { request, response } = require('express')
const bcryptjs = require('bcryptjs')
const User = require('../models/User')

const getAll = async (req = request, res = response) => {
  let users = []
  try {
    users = await User.findAll()
  } catch (error) {
    res.status(400).json({
      error
    })
  }

  res.status(200).json(users)
}

const create = async (req, res = response) => {
  const { body } = req
  const { username, name, email, password } = body

  try {
    const user = await User.create(
      {
        username,
        name,
        email,
        passwordHash: bcryptjs.hashSync(password, 10)
      }
    )

    return res.json(user)
  } catch (error) {
    console.log(error)
    res.status(500).json({ error: 'error' })
  }
}

module.exports = {
  create,
  getAll
}
