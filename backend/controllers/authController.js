const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");

const generateToken = (user) => {
  return jwt.sign(
    { id: user.id, role: user.role },
    process.env.JWT_SECRET,
    { expiresIn: "1d" }
  );
};

const handleUserSignup = async (req, res) => {
    try {
        const {name, email, password, address} = req.body;
        
        if (!name || !email || !password) {
           return res.status(400).json({ message: "All required fields missing" });
        }

        const passwordHash = await bcrypt.hash(password, 10);

        const user = await User.create({
        name,
        email,
        passwordHash,
        address,
        });

        const token = generateToken(user);

        res.cookie("token", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "strict",
            maxAge: 24 * 60 * 60 * 1000,
        });

        res.status(201).json({
            message: "User registered successfully",
            user: {
                id: user.id,
                name: user.name,
                email: user.email,
                role: user.role,
            },
        });

    } catch (error) {
        console.error(err);

        if (err.name === "SequelizeUniqueConstraintError") {
            return res.status(409).json({ message: "Email already exists" });
        }

        res.status(500).json({ message: "Server error" });
    }
};

const handleUserLogin = async (req, res) => {
    try {
        const {email, password} = req.body;
        
        const user = await User.findOne({
            where: {email}
        });

        if(!user) return res.status(401).json({
            message: "Invalid Credentials"
        });

        const result = bcrypt.compare(password, user.passwordHash);
        if(!result) {
            return res.status(400).json({message: "Invalid Credentials"});
        }

        const token = generateToken(user);

        res.cookie("token", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "strict",
            maxAge: 24 * 60 * 60 * 1000,
        });

        res.status(200).json({
            message: "Login successful",
            user: {
                id: user.id,
                name: user.name,
                email: user.email,
                role: user.role,
            },
        });

    } catch (error) {
        console.error(err);
        res.status(500).json({ message: "Server error" });
    }
};

const handleUserLogout = (req, res) => {
    res.clearCookie("token", {
        httpOnly: true,
        sameSite: "strict",
    });

    res.status(200).json({ message: "Logged out successfully" });
};

module.exports = {
    handleUserLogin,
    handleUserLogout,
    handleUserSignup
}