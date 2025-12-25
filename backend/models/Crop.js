const mongoose = require("mongoose");

const CropSchema = new mongoose.Schema({
  field: {
    type: String,
    required: [true, "Field name is required"]
  },
  cropType: {
    type: String,
    required: [true, "Crop type is required"]
  },
  plantingDate: {
    type: Date,
    required: [true, "Planting date is required"]
  },
  area: {
    type: Number,
    required: [true, "Area is required"],
    min: [0.1, "Area must be greater than 0"]
  },
  soilType: {
    type: String,
    default: "loamy"
  },
  wateringFrequency: {
    type: Number,
    default: 3
  },
  growthStage: {
    type: String,
    default: "Early Stage"
  },
  healthScore: {
    type: Number,
    default: 70
  },
  estimatedYield: {
    type: Number,
    default: 0
  },
  pestIssues: [{
    name: String,
    dateReported: Date,
    severity: String,
    treatment: String,
    status: String
  }],
  harvestDate: Date,
  actualYield: Number,
  activities: [{
    type: {
      type: String
    },
    date: Date,
    notes: String,
    performer: String
  }],
  photoUrls: [String],
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: [true, "User ID is required"]
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model("Crop", CropSchema);
