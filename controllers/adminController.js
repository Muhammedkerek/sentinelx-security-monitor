const SecurityLog = require("../model/securityLogSchema");

exports.getSecurityLogs = async (req, res) => {
  try {
    const logs = await SecurityLog.find()
      .sort({ createdAt: -1 }) // newest first
      .limit(100); // limit to 100 records

    res.json(logs);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
