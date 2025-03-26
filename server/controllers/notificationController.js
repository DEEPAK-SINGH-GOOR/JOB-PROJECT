const Notification = require("../models/notificationModel"); // Assuming you have a Notification model

const createNotification = async (req, res) => {
  const { userId, companyId, jobId, message } = req.body;

  try {
    const notification = await Notification.create({
      userId,
      companyId,
      jobId,
      message,
      read: false,
    });

    res.status(201).json({ message: "Notification created", notification });
  } catch (error) {
    console.error("Error creating notification:", error);
    res.status(500).json({ message: "Error creating notification" });
  }
};

const getNotifications = async (req, res) => {
  const { userId } = req.params;

  try {
    const notifications = await Notification.find({ userId }).sort({ createdAt: -1 });
    res.status(200).json(notifications);
  } catch (error) {
    console.error("Error fetching notifications:", error);
    res.status(500).json({ message: "Error fetching notifications" });
  }
};

module.exports = {
  createNotification,
  getNotifications,
};
