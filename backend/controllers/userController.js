const { Store, Rating } = require("../models");
const sequelize = require("sequelize");
const { Op } = sequelize;

const handleGetStoresForUsers = async (req, res) => {
  try {
    const userId = req.user.id;
    const { name, address } = req.query;

    const storeWhere = {};

    if (name) {
      storeWhere.name = { [Op.like]: `%${name}%` };
    }

    if (address) {
      storeWhere.address = { [Op.like]: `%${address}%` };
    }

    const stores = await Store.findAll({
      where: storeWhere,
      attributes: [
        "id",
        "name",
        "address",
        [sequelize.fn("AVG", sequelize.col("Ratings.rating")), "averageRating"],
      ],
      include: [
        {
          model: Rating,
          attributes: [],
        },
      ],
      group: ["Store.id"],
    });

    const userRatings = await Rating.findAll({
      where: { userId },
    });

    const userRatingMap = {};
    userRatings.forEach((r) => {
      userRatingMap[r.storeId] = r.rating;
    });

    const result = stores.map((store) => {
      return {
        id: store.id,
        name: store.name,
        address: store.address,
        averageRating: store.get("averageRating"),
        userRating: userRatingMap[store.id] || null,
      };
    });

    return res.json(result);
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Server error",
    });
  }
};

module.exports = {
    handleGetStoresForUsers
}