const express = require("express");
const Crop = require("../models/Crop");
const Alert = require("../models/Alert");
const Harvest = require("../models/Harvest");
const CropRecommendation = require("../models/CropRecommendation");
const router = express.Router();

function calculateGrowthStage(plantingDate) {
  const days = Math.floor((Date.now() - new Date(plantingDate)) / (1000 * 3600 * 24));
  if (days < 30) return "Early Stage";
  if (days < 60) return "Mid Stage";
  if (days < 90) return "Late Stage";
  return "Ready for Harvest";
}

function calculateHealthScore(growthStage, pestIssues) {
  let baseScore = { "Early Stage": 70, "Mid Stage": 85, "Late Stage": 80, "Ready for Harvest": 60 }[growthStage] || 50;
  
  // Deduct points for pest issues
  const activePests = pestIssues.filter(p => p.status === "active").length;
  baseScore = Math.max(0, baseScore - (activePests * 15));
  
  return baseScore;
}

function calculateYield(area, growthStage, healthScore) {
  const multiplier = { "Early Stage": 0.5, "Mid Stage": 1.2, "Late Stage": 1.8, "Ready for Harvest": 2.0 }[growthStage] || 1;
  return Math.round(area * multiplier * (healthScore / 100) * 100) / 100;
}

// Create new crop
router.post("/", async (req, res) => {
  try {
    let { field, cropType, plantingDate, area, soilType, wateringFrequency, userId } = req.body;

    console.log("Received crop data:", req.body);

    // Normalize / coerce types
    field = field && String(field).trim();
    cropType = cropType && String(cropType).trim();
    plantingDate = plantingDate ? new Date(plantingDate) : null;
    area = area !== undefined ? Number(area) : NaN;
    wateringFrequency = Number(wateringFrequency) || 3;
    soilType = soilType || "loamy";

    // Validate required fields with explicit messages
    const missing = [];
    if (!field) missing.push("field");
    if (!cropType) missing.push("cropType");
    if (!plantingDate || isNaN(plantingDate.getTime())) missing.push("plantingDate");
    if (!isFinite(area) || area <= 0) missing.push("area");
    if (!userId) missing.push("userId");

    if (missing.length) {
      console.log("Validation failed - missing fields:", missing);
      return res.status(400).json({
        message: "Missing or invalid required fields",
        missing,
        received: { 
          field: req.body.field, 
          cropType: req.body.cropType, 
          plantingDate: req.body.plantingDate, 
          area: req.body.area, 
          userId: req.body.userId 
        }
      });
    }

    const growthStage = calculateGrowthStage(plantingDate);
    const healthScore = calculateHealthScore(growthStage, []);
    const estimatedYield = calculateYield(area, growthStage, healthScore);

    const crop = await Crop.create({
      field,
      cropType,
      plantingDate,
      area,
      soilType,
      wateringFrequency,
      growthStage,
      healthScore,
      estimatedYield,
      userId,
      activities: [{ type: "planted", date: new Date(), notes: `Field ${field} planted with ${cropType}` }]
    });

    console.log("Crop created successfully:", crop._id);

    // Create alert for new crop (non-blocking)
    try {
      await Alert.create({
        cropId: crop._id,
        userId,
        type: "info",
        title: "Crop Planted",
        message: `${cropType} has been planted in ${field}`,
        severity: "low"
      });
    } catch (alertErr) {
      console.error("Alert creation error (non-blocking):", alertErr);
    }

    return res.status(201).json(crop);
  } catch (err) {
    console.error("=== CROP CREATION ERROR ===");
    console.error("Error name:", err.name);
    console.error("Error message:", err.message);
    console.error("Full error:", err);
    
    if (err.name === "ValidationError") {
      console.error("MongoDB Validation errors:", err.errors);
      const errorDetails = Object.keys(err.errors).map(field => ({
        field,
        message: err.errors[field].message,
        value: err.errors[field].value,
        kind: err.errors[field].kind
      }));
      console.error("Detailed errors:", errorDetails);
      return res.status(400).json({ 
        message: "Validation error in database schema", 
        errors: errorDetails
      });
    }
    
    if (err.name === "MongoError" || err.name === "MongoServerError") {
      console.error("MongoDB error:", err);
      return res.status(400).json({ 
        message: "Database error", 
        error: err.message 
      });
    }
    
    return res.status(500).json({ 
      message: "Error creating crop", 
      error: err.message 
    });
  }
});

// Get all crops
router.get("/", async (req, res) => {
  try {
    const crops = await Crop.find();
    res.json(crops);
  } catch (err) {
    res.status(500).json({ message: "Error fetching crops", error: err.message });
  }
});

// Get single crop
router.get("/:id", async (req, res) => {
  try {
    const crop = await Crop.findById(req.params.id);
    if (!crop) return res.status(404).json({ message: "Crop not found" });
    res.json(crop);
  } catch (err) {
    res.status(500).json({ message: "Error fetching crop", error: err.message });
  }
});

// Add pest issue
router.post("/:id/pest", async (req, res) => {
  try {
    const { type, pestType, severity, treatment, userId } = req.body;
    console.log("Pest request:", { type, pestType, severity, treatment, userId });
    
    const crop = await Crop.findById(req.params.id);
    
    if (!crop) return res.status(404).json({ message: "Crop not found" });

    crop.pestIssues.push({
      type: type || pestType,
      dateReported: new Date(),
      severity,
      treatment: treatment || "Pending",
      status: "active"
    });

    crop.healthScore = calculateHealthScore(crop.growthStage, crop.pestIssues);
    await crop.save();

    // Create alert (non-blocking)
    try {
      await Alert.create({
        cropId: crop._id,
        userId,
        type: "pest-detected",
        title: `Pest Detected: ${type || pestType}`,
        message: `${type || pestType} detected in ${crop.field} with ${severity} severity`,
        severity: severity
      });
    } catch (alertErr) {
      console.error("Alert creation error (non-blocking):", alertErr);
    }

    res.json(crop);
  } catch (err) {
    console.error("Pest issue error:", err);
    res.status(500).json({ message: "Error adding pest issue", error: err.message });
  }
});

// Log activity
router.post("/:id/activity", async (req, res) => {
  try {
    const { type, activityType, notes, performer } = req.body;
    console.log("Activity request:", { type, activityType, notes, performer });
    
    const crop = await Crop.findById(req.params.id);
    
    if (!crop) return res.status(404).json({ message: "Crop not found" });

    crop.activities.push({
      type: type || activityType,
      date: new Date(),
      notes,
      performer
    });

    await crop.save();
    res.json(crop);
  } catch (err) {
    console.error("Activity logging error:", err);
    res.status(500).json({ message: "Error logging activity", error: err.message });
  }
});

// Record harvest
router.post("/:id/harvest", async (req, res) => {
  try {
    const { actualYield, quality, notes, soldAmount, income, userId } = req.body;
    const crop = await Crop.findById(req.params.id);
    
    if (!crop) return res.status(404).json({ message: "Crop not found" });

    crop.harvestDate = new Date();
    crop.actualYield = actualYield;
    crop.growthStage = "Harvested";
    await crop.save();

    const harvest = await Harvest.create({
      cropId: crop._id,
      userId,
      harvestDate: new Date(),
      actualYield,
      quality,
      notes,
      soldAmount: soldAmount || 0,
      income: income || 0
    });

    // Create alert
    await Alert.create({
      cropId: crop._id,
      userId,
      type: "harvest-complete",
      title: "Crop Harvested",
      message: `${crop.cropType} in ${crop.field} has been harvested. Yield: ${actualYield}`,
      severity: "low"
    });

    res.json({ crop, harvest });
  } catch (err) {
    res.status(500).json({ message: "Error recording harvest", error: err.message });
  }
});

// Update crop
router.put("/:id", async (req, res) => {
  try {
    const { field, cropType, area, soilType, wateringFrequency } = req.body;
    const crop = await Crop.findByIdAndUpdate(
      req.params.id,
      { field, cropType, area, soilType, wateringFrequency, updatedAt: new Date() },
      { new: true }
    );
    res.json(crop);
  } catch (err) {
    res.status(500).json({ message: "Error updating crop", error: err.message });
  }
});

// Delete crop
router.delete("/:id", async (req, res) => {
  try {
    const crop = await Crop.findByIdAndDelete(req.params.id);
    if (!crop) return res.status(404).json({ message: "Crop not found" });
    res.json({ message: "Crop deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: "Error deleting crop", error: err.message });
  }
});

module.exports = router;
