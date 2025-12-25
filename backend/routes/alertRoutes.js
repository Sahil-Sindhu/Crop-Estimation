const express = require("express");
const Alert = require("../models/Alert");
const router = express.Router();

// Get all alerts for a user
router.get("/user/:userId", async (req, res) => {
  try {
    const alerts = await Alert.find({ userId: req.params.userId }).sort({ createdAt: -1 });
    res.json(alerts);
  } catch (err) {
    res.status(500).json({ message: "Error fetching alerts", error: err.message });
  }
});

// Get unread alerts count
router.get("/user/:userId/unread", async (req, res) => {
  try {
    const count = await Alert.countDocuments({ userId: req.params.userId, isRead: false });
    res.json({ unreadCount: count });
  } catch (err) {
    res.status(500).json({ message: "Error fetching unread count", error: err.message });
  }
});

// Mark alert as read
router.put("/:id/read", async (req, res) => {
  try {
    const alert = await Alert.findByIdAndUpdate(
      req.params.id,
      { isRead: true },
      { new: true }
    );
    res.json(alert);
  } catch (err) {
    res.status(500).json({ message: "Error updating alert", error: err.message });
  }
});

// Resolve alert
router.put("/:id/resolve", async (req, res) => {
  try {
    const { actionTaken } = req.body;
    const alert = await Alert.findByIdAndUpdate(
      req.params.id,
      { 
        isRead: true,
        actionTaken,
        resolvedAt: new Date()
      },
      { new: true }
    );
    res.json(alert);
  } catch (err) {
    res.status(500).json({ message: "Error resolving alert", error: err.message });
  }
});

module.exports = router;
