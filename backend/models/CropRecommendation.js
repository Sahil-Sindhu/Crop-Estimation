const mongoose = require("mongoose");

const RecommendationSchema = new mongoose.Schema({
  cropType: String,
  soilType: String,
  recommendations: {
    bestSeason: [String],
    wateringSchedule: String,
    fertilizers: [String],
    pestPrevention: [String],
    expectedYieldPerAcre: Number,
    daysToMaturity: Number,
    commonDiseases: [String]
  },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("CropRecommendation", RecommendationSchema);
