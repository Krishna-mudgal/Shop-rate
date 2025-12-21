const { Rating, Store } = require("../models");

const handleSubmitRating = async (req, res) => {
    try {
        
        const userId = req.user.id;
        const { storeId, rating } = req.body;

        const store = await Store.findByPk(storeId);

        if(!store) {
            return res.status(404).json({
                message: "Store not found"
            });
        };

        if(store.ownerId === userId) {
            return res.status(403).json({
                message: "Cannot rate your own store"
            });
        };

        const existingRating = await Rating.findOne({
            where: {
                userId: userId,
                storeId: storeId
            }
        });

        if(existingRating) {
            existingRating.rating = rating;
            await existingRating.save();

            return res.json({
                message: "Rating updated successfully"
            });
        };

        const newRating = await Rating.create({
            rating,
            userId,
            storeId
        });

        return res.json({
            message: "Rating submitted successfully"
        });

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: "Server Error"
        });
    }
};

module.exports = {
    handleSubmitRating
}