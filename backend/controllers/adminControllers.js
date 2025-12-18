const { User, Store, Rating } = require("../models");
const sequelize = require("sequelize");
const { Op } = require("sequelize");
const bcrypt = require("bcryptjs");

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
};

const handleAddStore = async (req, res) => {
    try {
        const { name, email, address, ownerId } = req.body;
        
        const owner = await User.findOne({
            where: {
                id: ownerId,
                role: "OWNER"
            },
        });

        if(!owner) return res.status(400).json({
            message: "Invalid store owner"
        });

        const store = await Store.create({
            name,
            address,
            email,
            ownerId
        })

        return res.status(201).json({
            message: "Store created successfully"
        })

    } catch (err) {
        console.error(err);

        if (err.name === "SequelizeUniqueConstraintError") {
            return res.status(409).json({ message: "Store email already exists" });
        }

        res.status(500).json({ message: "Server error" });
    }
};

const handleGetListOfStores = async (req, res) => {
    try {
        
        const stores = await Store.findAll({
            attributes: [
                "id",
                "name",
                "email",
                "address",
                "ownerId",
                [
                    sequelize.fn("AVG", sequelize.col("Ratings.rating")),
                    "averageRating",
                ],
            ],
            include: [
                {
                model: Rating,
                attributes: [],
                },
            ],
            group: ["Store.id"],
        });

        return res.json(stores);

    } catch (error) {
        console.log(error);
        return res.status()
    }
}

const handleAddUser = async (req, res) => {
    try {
        
        const { name, email, password, address, role } = req.body;

        const passwordHash = await bcrypt.hash(password, 10);
        
        const user = await User.create({
            name, 
            email, 
            passwordHash,
            address,
            role
        });

        return res.status(201).json({
            message: "User Created successfully"
        });

    } catch (error) {
        console.log(error);

        if (error.name === "SequelizeUniqueConstraintError") {
            return res.status(409).json({ message: "Email already exists" });
        }

        res.status(500).json({ message: "Server error" });
    }
};

const handleGetUserList = async (req, res) => {
    try {
        
        const { name, email, address, role } = req.query;

        const whereClause = {};

        if (name) {     
            whereClause.name = { [Op.like]: `%${name}%` };
        }

        if (email) {
            whereClause.email = { [Op.like]: `%${email}%` };
        }

        if (address) {
            whereClause.address = { [Op.like]: `%${address}%` };
        }

        if (role) {
            whereClause.role = role;
        }

        const users = await User.findAll({
            where: whereClause,
            attributes: ["id", "name", "email", "address", "role"],
            order: [["createdAt", "DESC"]],
        });

        return res.json(users);

    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Server error" });
    }
}

const handleGetUserDetail = async (req, res) => {
    try {
        
        const userId = req.params.id;
        
        const user = await User.findOne({
            where: {
                id: userId
            },
            attributes: ["id", "name", "email", "address", "role"]
        });

        if(!user) {
            return res.status(404).json({
                message: "User not found"
            });
        }

        if(user.role !== "OWNER") {
            return res.json({user});
        }

        const store = await Store.findOne({
            where: {
                ownerId: user.id
            }
        });

        if(!store) {
            return res.json({
                user,
                averageRating: null
            });
        }

        const avgRating = await Rating.findOne({
            where: { storeId: store.id },
            attributes: [
                [sequelize.fn("AVG", sequelize.col("rating")), "averageRating"],
            ],
            raw: true,
        });

        return res.json({
            user,
            averageRating: avgRating.averageRating
        })

    } catch (error) {
        console.log(error);
        return res.json({
            message: "Server error"
        });
    }
}

module.exports = {
    handleGetAdminDashboard,
    handleAddStore,
    handleGetListOfStores,
    handleAddUser,
    handleGetUserList,
    handleGetUserDetail
}