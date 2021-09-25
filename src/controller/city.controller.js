// const STATUS_RESPONSE = require('../utils/statusUtils')

// const { request, response } = require('express')
// const City = require('../models/City')

// const getAllCities = async (req = request, res = response) => {
//   let cities = []
//   try {
//     cities = await City.findAll({ limit: 20 })
//   } catch (error) {
//     res.status(400).json({
//       error
//     })
//   }

//   res.status(200).json(cities)
// }

// const getCity = async (req = request, res = response) => {
//   const { id } = req.params

//   if (isNaN(id)) {
//     return res.status(400).json({
//       error: 'Paramater must be number as string'
//     })
//   }

//   try {
//     const city = await City.findByPk(Number(id))

//     if (city) {
//       return res.status(200).json(city)
//     } else {
//       return res.status(404).json(STATUS_RESPONSE[404])
//     }
//   } catch (error) {
//     res.status(500).json(STATUS_RESPONSE[500])
//   }
// }

// const createCity = async (req, res = response) => {
//   const { body } = req

//   try {
//     const city = new City(body)
//     await city.save()
//     return res.json(city)
//   } catch (error) {
//     res.status(500).json(STATUS_RESPONSE[500])
//   }
// }

// const updateCity = async (req = request, res = response) => {
//   const { id } = req.params
//   const { body } = req

//   if (isNaN(id)) {
//     return res.status(400).json({
//       error: 'Paramater must be number as string'
//     })
//   }

//   try {
//     const city = await City.findByPk(Number(id))

//     if (!city) {
//       return res.status(404).json(STATUS_RESPONSE[404])
//     }

//     await city.update(body)

//     return res.status(200).json(city)
//   } catch (error) {
//     console.log({ error })
//     res.status(500).json(STATUS_RESPONSE[500])
//   }
// }

// const deleteCity = async (req = request, res = response) => {
//   const { id } = req.params

//   if (isNaN(id)) {
//     return res.status(400).json({
//       error: 'Paramater must be number as string'
//     })
//   }

//   try {
//     const city = await City.findByPk(Number(id))

//     if (!city) {
//       return res.status(404).json(STATUS_RESPONSE[404])
//     }

//     await city.destroy()

//     return res.status(200).json(city)
//   } catch (error) {
//     console.log({ error })
//     res.status(500).json(STATUS_RESPONSE[500])
//   }
// }

// module.exports = {
//   getAllCities,
//   getCity,
//   createCity,
//   updateCity,
//   deleteCity
// }
