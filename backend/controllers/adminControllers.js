const { User, Store, Rating } = require("../models");

const handleGetAdminDashboard = async (req, res) => {
    try {
        const [userCount, storeCount, ratingCount] = await Promise.all([
            User.count(),
            Store.count(),
            Rating.count()
        ]);

        res.json({
            totalUsers: userCount,
            totalStores: storeCount,
            totalRatings: ratingCount,
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: "Server Error"
        });
    }
}