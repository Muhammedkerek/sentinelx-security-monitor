const jwt = require("jsonwebtoken");
const User = require("../model/userSchema");
const redis = require("../config/redis");

const protect = async (req, res, next) => {
  let token;

  // Check Authorization header
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      // Extract token
      token = req.headers.authorization.split(" ")[1];

      // Verify token
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // Check if token is blacklisted
      const isBlacklisted = await redis.get(`blacklist:${token}`);
      if (isBlacklisted) {
        return res.status(401).json({ message: "Token has been revoked" });
      }

      // Attach user to request
      req.user = await User.findById(decoded.id).select("-password");

      next();
    } catch (error) {
      console.log(error)
      return res.status(401).json({ message: "Not authorized" });
      
    }
  }

  if (!token) {
    return res.status(401).json({ message: "No token provided" });
  }
};

const adminOnly = (req, res, next) => {
  if (req.user && req.user.role === "admin") {
    next();
  } else {
    return res.status(403).json({
      message: "Admin access only",
    });
  }
};

module.exports = { protect, adminOnly };
