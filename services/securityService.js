const redis = require("../config/redis");
const SecurityLog = require("../model/SecurityLogSchema");

async function handleFailedLogin(ip, req, io) {
  const attempts = await redis.incr(`fail:${ip}`);

  if (attempts >= 1) {
    await redis.expire(`fail:${ip}`, 600);
  }

  await SecurityLog.create({
    ip,
    endpoint: req.originalUrl,
    method: req.method,
    event: "FAILED_LOGIN",
  });

  io.emit("security-alert", {
    ip,
    event: "FAILED_LOGIN",
    attempts,
  });

  if (attempts >= 5) {
    await redis.set(`ban:${ip}`, "true", "EX", 600);

    await SecurityLog.create({
      ip,
      endpoint: req.originalUrl,
      method: req.method,
      event: "IP_BANNED",
    });

    io.emit("security-alert", {
      ip,
      event: "IP_BANNED",
    });
  }
}

module.exports = {
  handleFailedLogin,
};