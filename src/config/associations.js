const Category = require('../models/Category')
const Product = require('../models/Product')

Category.belongsToMany(Product, { through: 'Product_Category', as: 'products' })
Product.belongsToMany(Category, { through: 'Product_Category', as: 'categories' })

// Team.belongsToMany(Game, { through: GameTeam });
// Game.belongsToMany(Team, { through: GameTeam });
// GameTeam.belongsTo(Game);
// GameTeam.belongsTo(Team);
// Game.hasMany(GameTeam);
// Team.hasMany(GameTeam);
