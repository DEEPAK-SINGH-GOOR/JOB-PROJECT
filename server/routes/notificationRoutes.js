const express = require("express");
const router = express.Router();
const { getNotifications, createNotification } = require("../controllers/notificationController");

// Route to fetch notifications
router.get("/:userId", getNotifications);

// Route to create a notification (for example, when an employee applies for a job)
router.post("/create", createNotification);

module.exports = router;
