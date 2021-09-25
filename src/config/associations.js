const Category = require('../models/Category')
const Product = require('../models/Product')

Category.belongsToMany(Product, { through: 'Product_Category', as: 'products' })
Product.belongsToMany(Category, { through: 'Product_Category', as: 'categories' })

// Product.hasMany(Product_Category)
// Product_Category.belongsTo(Product)
// Category.hasMany(Product_Category)
// Product_Category.belongsTo(Profile)
