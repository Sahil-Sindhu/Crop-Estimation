const mongoose = require("mongoose");

const AlertSchema = new mongoose.Schema({
  cropId: mongoose.Schema.Types.ObjectId,
  userId: mongoose.Schema.Types.ObjectId,
  type: String, // health-warning, pest-detected, watering-needed, harvest-ready
  title: String,
  message: String,
  severity: String, // low, medium, high
  isRead: { type: Boolean, default: false },
  actionTaken: String,
  createdAt: { type: Date, default: Date.now },
  resolvedAt: Date
});

module.exports = mongoose.model("Alert", AlertSchema);
