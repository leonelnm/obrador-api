const jwt = require('jsonwebtoken')
const { request, response } = require('express')

module.exports = (req = request, res = response, next) => {
  const auth = req.get('Authorization')

  console.log({ auth })

  let token = ''
  if (auth && auth.toLocaleLowerCase().startsWith('bearer')) {
    token = auth.substring(7)
  }

  let decodeToken = {}
  try {
    decodeToken = jwt.verify(token, process.env.JWTSECRET)
  } catch (error) {}

  if (!token || !decodeToken.id) {
    return res.status(401).json({
      error: 'token missing or invalid'
    })
  }

  next()
}
