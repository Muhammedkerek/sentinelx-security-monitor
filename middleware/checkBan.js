const redis = require("../config/redis");

const checkBan = async (req, res, next) => {
  const ip = req.ip;

  const isBanned = await redis.get(`ban:${ip}`);

  if (isBanned) {
    return res.status(403).json({
      message: "Your IP is temporarily banned due to suspicious activity.",
    });
  }

  next();
};

module.exports = checkBan;