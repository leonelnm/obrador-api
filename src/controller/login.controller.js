const bcryptjs = require('bcryptjs')
const jwt = require('jsonwebtoken')
const { request, response } = require('express')

const User = require('../models/User')

const login = async (req = request, res = response) => {
  const { body } = req
  const { email, password } = body

  try {
    const userDb = await User.findOne({
      where: { email }
    })

    const passwordCorrect = userDb != null
      ? bcryptjs.compareSync(password, userDb.passwordHash)
      : false

    if (!passwordCorrect) {
      res.status(401).json({
        error: 'Invalid credentials'
      }).end()
    } else {
      const userForToken = {
        id: userDb.id,
        username: userDb.username
      }

      const secret = process.env.JWTSECRET
      console.log({ secret })
      const token = jwt.sign(userForToken, secret, {
        expiresIn: 60 * 60 * 24 * 7
      })

      res.status(200).json({
        name: userDb.name,
        email: userDb.email,
        username: userDb.username,
        token
      })
    }
  } catch (error) {
    res.status(400).json({
      error
    })
  }
}

module.exports = {
  login
}
