const mongoose = require("mongoose");

const securityLogSchema = new mongoose.Schema({
  ip: String,
  endpoint: String,
  method: String,
  event: String,
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    default: null,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports =
  mongoose.models.SecurityLog ||
  mongoose.model("SecurityLog", securityLogSchema);
