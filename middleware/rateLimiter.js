const redis = require("../config/redis");

const rateLimiter = async (req, res, next) => {
  const ip = req.ip;

  const requests = await redis.incr(`rate:${ip}`);

  // If first request, start 1-minute window
  if (requests === 1) {
    await redis.expire(`rate:${ip}`, 60);
  }

  // Limit to 100 requests per minute
  if (requests > 100) {
    return res.status(429).json({
      message: "Too many requests. Please slow down.",
    });
  }

  next();
};

module.exports = rateLimiter;