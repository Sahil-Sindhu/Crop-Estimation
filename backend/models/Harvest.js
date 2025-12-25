const mongoose = require("mongoose");

const HarvestSchema = new mongoose.Schema({
  cropId: mongoose.Schema.Types.ObjectId,
  userId: mongoose.Schema.Types.ObjectId,
  harvestDate: Date,
  actualYield: Number,
  quality: String, // excellent, good, average, poor
  notes: String,
  storageConditions: String,
  soldAmount: Number,
  income: Number,
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Harvest", HarvestSchema);
