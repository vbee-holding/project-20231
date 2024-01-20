const express = require("express");
const router = express.Router();

const notificationController = require("../controllers/NotificationController");

// Import the updateNotification function
const { updateNotification } = require("../controllers/NotificationController");

router.patch("", notificationController);

module.exports = router;
