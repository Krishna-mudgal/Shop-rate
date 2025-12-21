const jwt = require("jsonwebtoken");

const protect = (req, res, next) => {
  const token = req.cookies.token;
  if (!token) return res.status(401).json({ message: "Unauthorized" });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch {
    res.status(401).json({ message: "Invalid token" });
  }
};

const ownerOnly = (req, res, next) => {
  if (req.user.role !== "OWNER") {
    return res.status(403).json({ message: "Access denied" });
  }
  next();
};

const adminOnly = (req, res, next) => {
  if (req.user.role !== "ADMIN") {
    return res.status(403).json({ message: "Access denied" });
  }
  next();
};

const userOnly = (req, res, next) => {
  if(req.user.role !== "USER") {
    return res.status(403).json({message: "Access denied"});
  }

  next(); 
}

module.exports = {
    protect,
    ownerOnly,
    adminOnly,
    userOnly
}