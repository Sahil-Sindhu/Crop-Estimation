const express = require("express");
const CropRecommendation = require("../models/CropRecommendation");
const router = express.Router();

// Get recommendations for a crop type and soil type
router.get("/:cropType/:soilType", async (req, res) => {
  try {
    console.log("Recommendation request:", { cropType: req.params.cropType, soilType: req.params.soilType });
    
    let rec = await CropRecommendation.findOne({
      cropType: req.params.cropType,
      soilType: req.params.soilType
    });

    if (!rec) {
      // Return default recommendations if not found
      console.log("No database record found, using defaults");
      const defaultRec = getDefaultRecommendations(req.params.cropType, req.params.soilType);
      console.log("Default recommendations:", defaultRec);
      return res.json({
        cropType: req.params.cropType,
        soilType: req.params.soilType,
        recommendations: defaultRec
      });
    }

    console.log("Database record found:", rec);
    res.json({
      cropType: rec.cropType,
      soilType: rec.soilType,
      recommendations: rec
    });
  } catch (err) {
    console.error("Recommendation error:", err);
    res.status(500).json({ message: "Error fetching recommendations", error: err.message });
  }
});

// Get all recommendations
router.get("/", async (req, res) => {
  try {
    const recs = await CropRecommendation.find();
    res.json(recs);
  } catch (err) {
    res.status(500).json({ message: "Error fetching recommendations", error: err.message });
  }
});

function getDefaultRecommendations(cropType, soilType) {
  const recommendations = {
    wheat: {
      bestSeason: ["October", "November"],
      wateringSchedule: "Water crop after every 20-25 days during initial growth (October-November). Increase frequency to 15-20 days during tillering phase. Reduce to once every 30 days during ripening stage.",
      fertilizers: ["Urea (100 kg/acre)", "DAP - Di-Ammonium Phosphate (60 kg/acre)", "Potassium (30 kg/acre)"],
      pestPrevention: ["Hexaconazole for Armyworm control", "Tebuconazole for Rust management", "Pyrethrin-based spray for leaf beetles", "Neem oil for mites"],
      expectedYieldPerAcre: "40-45 quintals",
      daysToMaturity: 120,
      commonDiseases: ["Rust (brown/yellow spots on leaves)", "Powdery Mildew (white powder coating)", "Loose Smut (seed disease)"],
      soilPreparation: "Loamy soil is ideal. Add 10-15 tons of farmyard manure per acre",
      spacing: "Drill at 22.5 cm row spacing with 50 kg seed per acre"
    },
    rice: {
      bestSeason: ["June", "July"],
      wateringSchedule: "Keep field flooded with 5 cm water during growing season. Drain water 7-10 days before harvest. Maintain standing water of 2-3 cm during grain filling stage.",
      fertilizers: ["Urea (80 kg/acre)", "DAP (50 kg/acre)", "Potassium Chloride (40 kg/acre)"],
      pestPrevention: ["Tricyclazole for Blast control", "Validamycin for Brown Spot disease", "Carbosulfan for Stem Borer", "Methyl Parathion for Leaf Folder"],
      expectedYieldPerAcre: "50-55 quintals",
      daysToMaturity: 150,
      commonDiseases: ["Blast (dark spots on leaves)", "Brown Spot (circular lesions)", "Leaf Scald (whitish streaks)"],
      soilPreparation: "Puddling required. Add 5-7 tons compost per acre",
      spacing: "Transplant seedlings 20x15 cm apart, 1-2 seedlings per hill"
    },
    corn: {
      bestSeason: ["April", "May"],
      wateringSchedule: "Water after 2-3 days initially. After tassel emergence, increase frequency - water every 3-4 days. Critical period: 15 days before and after pollination requires maximum water.",
      fertilizers: ["Urea (150 kg/acre)", "DAP (90 kg/acre)", "Potassium Nitrate (60 kg/acre)"],
      pestPrevention: ["Emamectin Benzoate for Borer control", "Lambda Cyhalothrin for Armyworm", "Chlorpyrifos for Fall Armyworm", "Spinosad for shoot fly"],
      expectedYieldPerAcre: "60-65 quintals",
      daysToMaturity: 90,
      commonDiseases: ["Leaf Blight (long oval lesions)", "Root Rot (brown discoloration)", "Turcicum Blight (narrow cigar-shaped spots)"],
      soilPreparation: "Well-drained loamy soil. Add 15 tons farmyard manure",
      spacing: "Plant at 60 cm row spacing, 20 cm between plants, 12-14 kg seed per acre"
    },
    tomato: {
      bestSeason: ["February", "March", "August", "September"],
      wateringSchedule: "Water daily or alternate days during fruit setting. Reduce frequency after ripening. Avoid wetting foliage to prevent diseases. Use drip irrigation if possible.",
      fertilizers: ["Urea (80 kg/acre)", "DAP (100 kg/acre)", "Calcium Nitrate (60 kg/acre)", "Zinc Sulfate (10 kg/acre)"],
      pestPrevention: ["Spinosad for Fruit Borer", "Chloropyrifos for Whitefly", "Sulphur dust for Powdery Mildew", "Copper Fungicide for Early Blight"],
      expectedYieldPerAcre: "300-350 quintals",
      daysToMaturity: 70,
      commonDiseases: ["Early Blight (concentric rings)", "Late Blight (water-soaked lesions)", "Fusarium Wilt (wilting from base)"],
      soilPreparation: "Rich loamy soil with good drainage. Add 25 tons compost per acre",
      spacing: "Transplant at 60x45 cm or 50x40 cm spacing, 35,000-40,000 plants per acre"
    },
    potato: {
      bestSeason: ["September", "October"],
      wateringSchedule: "Water every 7-10 days until emergence. After emergence, maintain soil moisture at 70-80% capacity. Reduce watering 15 days before harvest.",
      fertilizers: ["Urea (120 kg/acre)", "DAP (100 kg/acre)", "Muriate of Potash (150 kg/acre)"],
      pestPrevention: ["Mancozeb for Late Blight control", "Metalaxyl for Phytophthora", "Imidacloprid for Aphids", "Carbofuran for Stem Borer"],
      expectedYieldPerAcre: "200-250 quintals",
      daysToMaturity: 90,
      commonDiseases: ["Late Blight (water-soaked lesions)", "Early Blight (target spots)", "Viral diseases (mottling)"],
      soilPreparation: "Well-drained loamy soil. Add 20 tons farmyard manure",
      spacing: "Plant seed tubers 20 cm apart in rows 60 cm apart, 25-30 kg seed per acre"
    },
    soybean: {
      bestSeason: ["June", "July"],
      wateringSchedule: "Light irrigation at planting. Water every 8-10 days during growing season. Critical period: 15 days before and after flowering. Reduce watering after pod formation.",
      fertilizers: ["DAP (45 kg/acre)", "Potassium (20 kg/acre)", "Rhizobium culture (ensure inoculation)", "Zinc Sulfate (10 kg/acre)"],
      pestPrevention: ["Fenvalerate for Leaf Folder", "Chloropyrifos for Pod Borer", "Carbaryl for Grasshopper", "Neem oil for Spider Mite"],
      expectedYieldPerAcre: "18-22 quintals",
      daysToMaturity: 100,
      commonDiseases: ["Anthracnose (dark spots)", "Stem Canker (reddish lesions)", "Bacterial pustule (brown spots)"],
      soilPreparation: "Well-drained loamy soil. Nitrogen fixation through rhizobia",
      spacing: "Sow at 45 cm row spacing, 30-35 seeds per meter, 50-60 kg seed per acre"
    },
    cotton: {
      bestSeason: ["April", "May"],
      wateringSchedule: "Water at 7-10 day intervals from June onwards. Increase frequency during boll development (July-August). Reduce watering from September, stop by October.",
      fertilizers: ["Urea (150 kg/acre)", "DAP (100 kg/acre)", "Potassium Sulphate (50 kg/acre)"],
      pestPrevention: ["Emamectin Benzoate for Bollworm", "Lambda Cyhalothrin for Leaf Roller", "Spinosad for Tobacco Caterpillar", "Sulphur for Mite control"],
      expectedYieldPerAcre: "18-22 bales",
      daysToMaturity: 180,
      commonDiseases: ["Bacterial Blight (angular lesions)", "Leaf Spot (circular lesions)", "Fusarium Wilt (yellowing)"],
      soilPreparation: "Well-drained loamy soil. Add 8-10 tons farmyard manure",
      spacing: "Plant at 90 cm row spacing, 60 cm plant spacing, 7.5-8 kg seed per acre"
    },
    sugarcane: {
      bestSeason: ["October", "November"],
      wateringSchedule: "Irrigate at 7-10 day intervals during establishment. During growing season, water every 10-15 days. Critical period: 3-6 months after planting. Reduce in winter.",
      fertilizers: ["Urea (200 kg/acre)", "DAP (100 kg/acre)", "Potassium (60 kg/acre)"],
      pestPrevention: ["Emamectin Benzoate for Shoot Borer", "Chlorpyrifos for Scale Insect", "Carbofuran for Root Grub", "Metaldehyde for Slug"],
      expectedYieldPerAcre: "70-80 tons",
      daysToMaturity: 360,
      commonDiseases: ["Red Rot (reddish discoloration)", "Wilt (yellowing and wilting)", "Smut (black spore masses)"],
      soilPreparation: "Deep, well-drained soil. Add 25-30 tons compost per acre",
      spacing: "Plant at 75-90 cm row spacing, 1-2 buds per 30 cm, 35-40 quintals seed per acre"
    }
  };

  return recommendations[cropType.toLowerCase()] || {
    bestSeason: ["Year-round (varies by region)"],
    wateringSchedule: "Typically 2-3 times per week. Adjust based on rainfall and soil moisture.",
    fertilizers: ["Urea", "DAP (Di-Ammonium Phosphate)", "Potassium Fertilizer"],
    pestPrevention: ["Regular monitoring", "Neem oil spray", "Pesticide application based on pest identification"],
    expectedYieldPerAcre: "40-60 quintals",
    daysToMaturity: "100-120 days",
    commonDiseases: ["Check local agricultural advisory office for specific diseases"],
    soilPreparation: "Prepare soil based on crop requirements",
    spacing: "Consult local agricultural extension office"
  };
}

module.exports = router;
