const User = require("./User");
const Store = require("./Store");
const Rating = require("./Rating");

// Owner → Store
User.hasOne(Store, { foreignKey: "ownerId" });
Store.belongsTo(User, { foreignKey: "ownerId" });

// Store → Ratings
Store.hasMany(Rating, { foreignKey: "storeId" });
Rating.belongsTo(Store, { foreignKey: "storeId" });

// User → Ratings
User.hasMany(Rating, { foreignKey: "userId" });
Rating.belongsTo(User, { foreignKey: "userId" });

module.exports = { User, Store, Rating };
