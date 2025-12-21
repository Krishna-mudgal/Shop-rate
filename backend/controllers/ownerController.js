const { Store, Rating, User } = require("../models");

const handleGetOwnerDashboard = async (req, res) => {
  try {
    const ownerId = req.user.id;

    const store = await Store.findOne({
      where: {
        ownerId,
      },
    });

    if (!store) {
      return res.json({
        averageRating: null,
        ratings: [],
      });
    }

    const ratings = await Rating.findAll({
      where: {
        storeId: store.id,
      },
      include: [
        // this tell sequelize to do something like SELECT user.id, user.name, user.email FROM rating JOIN users ON ratings.userId = users.id
        {
          model: User,
          attributes: ["id", "name", "email"],
        },
      ],
    });

    const avgRating =
      ratings.length === 0
        ? null
        : ratings.reduce((sum, r) => {
            return sum + r.rating;
          }, 0) / ratings.length;

    const formattedRatings = ratings.map((r) => ({
      userId: r.User.id,
      userName: r.User.name,
      userEmail: r.User.email,
      rating: r.rating,
    }));

    res.json({
      averageRating: avgRating,
      ratings: formattedRatings,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = {
    handleGetOwnerDashboard
}