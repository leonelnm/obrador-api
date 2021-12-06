const handleError = (err, req, res, next) => {
  console.log(err.name)
  console.log('handleError')

  res.status(500).json({ error: 'There was an error. Please try again later' }).end()
}

module.exports = { handleError }
