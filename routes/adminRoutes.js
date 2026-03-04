const express = require("express");
const SecurityLogsController = require("../controllers/adminController");
const { protect, adminOnly } = require("../middleware/authMiddleware");

const router = express.Router();

router.get("/logs", protect, adminOnly, SecurityLogsController.getSecurityLogs);

module.exports = router;
