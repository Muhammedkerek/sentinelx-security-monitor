const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController");
const {protect} = require("../middleware/authMiddleware");

// Register
router.post("/register", authController.register);
// Login
router.post("/login", authController.login);

//refresh token
router.post("/refresh-token", authController.refreshToken);

router.post("/logout", protect, authController.logout);
module.exports = router;
