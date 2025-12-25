const express = require("express");
const router = express.Router();

// Mock weather data for different regions (December 23, 2025)
// Cleaned and validated weather data for 8 Indian agricultural regions
const weatherData = {
  "Punjab": {
    region: "Punjab",
    current: {
      temp: 10,
      feelsLike: 8,
      condition: "Clear",
      description: "Cold and clear skies - Winter conditions",
      humidity: 72,
      windSpeed: 15,
      pressure: 1018,
      visibility: 11,
      cloudCover: 15,
      rainChance: 5
    },
    forecast: [
      { day: "Mon", high: 14, low: 6, condition: "Clear", rain: 0, humidity: 70, windSpeed: 12, icon: "☀️" },
      { day: "Tue", high: 12, low: 5, condition: "Cloudy", rain: 10, humidity: 75, windSpeed: 14, icon: "⛅" },
      { day: "Wed", high: 9, low: 3, condition: "Rainy", rain: 60, humidity: 85, windSpeed: 20, icon: "🌧️" },
      { day: "Thu", high: 8, low: 2, condition: "Rainy", rain: 70, humidity: 88, windSpeed: 22, icon: "🌧️" },
      { day: "Fri", high: 11, low: 4, condition: "Cloudy", rain: 25, humidity: 78, windSpeed: 16, icon: "⛅" }
    ],
    alerts: [
      {
        type: "Frost Risk",
        severity: "high",
        description: "Temperature dropping to 2-3°C on Wed-Thu. Frost risk for sensitive crops. Provide protection."
      },
      {
        type: "Cold Wave",
        severity: "high",
        description: "Winter cold conditions expected. Monitor crop health and provide adequate shelter for livestock."
      }
    ],
    recommendations: [
      "❄️ Frost protection needed for sensitive crops - Use mulch or covers",
      "🌾 Avoid irrigation during night hours to prevent frost damage",
      "🐛 Pest activity reduced due to cold - Good time for pest monitoring",
      "🌾 Harvesting window available on Mon-Tue before rain",
      "🌡️ Cold conditions - Provide wind breaks for crops"
    ]
  },
  "Haryana": {
    region: "Haryana",
    current: {
      temp: 11,
      feelsLike: 9,
      condition: "Clear",
      description: "Cold winter morning with clear skies",
      humidity: 68,
      windSpeed: 13,
      pressure: 1019,
      visibility: 12,
      cloudCover: 10,
      rainChance: 2
    },
    forecast: [
      { day: "Mon", high: 15, low: 7, condition: "Clear", rain: 0, humidity: 65, windSpeed: 11, icon: "☀️" },
      { day: "Tue", high: 13, low: 6, condition: "Sunny", rain: 5, humidity: 70, windSpeed: 12, icon: "☀️" },
      { day: "Wed", high: 10, low: 4, condition: "Cloudy", rain: 25, humidity: 75, windSpeed: 14, icon: "⛅" },
      { day: "Thu", high: 9, low: 3, condition: "Rainy", rain: 55, humidity: 82, windSpeed: 18, icon: "🌧️" },
      { day: "Fri", high: 12, low: 5, condition: "Cloudy", rain: 20, humidity: 72, windSpeed: 13, icon: "⛅" }
    ],
    alerts: [
      {
        type: "Frost Alert",
        severity: "high",
        description: "Frost expected on Wed-Thu nights. Minimum temperature dropping to 3-4°C. Protect crops."
      }
    ],
    recommendations: [
      "❄️ Apply frost protection measures - Use straw mulch or covers",
      "💧 Reduce irrigation - Cold soil needs less water",
      "🌾 Clear harvesting conditions on Mon-Tue",
      "🐛 Continue pest monitoring despite cold conditions",
      "🌡️ Protect sensitive crops with frost cloths at night"
    ]
  },
  "Maharashtra": {
    region: "Maharashtra",
    current: {
      temp: 22,
      feelsLike: 21,
      condition: "Clear",
      description: "Pleasant winter weather with clear skies",
      humidity: 58,
      windSpeed: 10,
      pressure: 1016,
      visibility: 13,
      cloudCover: 8,
      rainChance: 0
    },
    forecast: [
      { day: "Mon", high: 26, low: 14, condition: "Sunny", rain: 0, humidity: 55, windSpeed: 9, icon: "☀️" },
      { day: "Tue", high: 27, low: 15, condition: "Sunny", rain: 2, humidity: 52, windSpeed: 8, icon: "☀️" },
      { day: "Wed", high: 24, low: 13, condition: "Cloudy", rain: 15, humidity: 65, windSpeed: 11, icon: "⛅" },
      { day: "Thu", high: 22, low: 12, condition: "Rainy", rain: 45, humidity: 75, windSpeed: 14, icon: "🌧️" },
      { day: "Fri", high: 25, low: 13, condition: "Cloudy", rain: 10, humidity: 60, windSpeed: 10, icon: "⛅" }
    ],
    alerts: [],
    recommendations: [
      "💧 Moderate humidity - Regular irrigation schedule adequate",
      "🌾 Excellent conditions for harvesting on Mon-Tue",
      "🐛 Good window for pesticide application before rain on Thu",
      "🌾 Plan fertilizer application for early next week",
      "🌡️ Pleasant weather - Ideal for crop maintenance activities"
    ]
  },
  "Karnataka": {
    region: "Karnataka",
    current: {
      temp: 24,
      feelsLike: 23,
      condition: "Partly Cloudy",
      description: "Warm winter day with scattered clouds",
      humidity: 62,
      windSpeed: 11,
      pressure: 1014,
      visibility: 12,
      cloudCover: 35,
      rainChance: 5
    },
    forecast: [
      { day: "Mon", high: 28, low: 16, condition: "Sunny", rain: 0, humidity: 58, windSpeed: 9, icon: "☀️" },
      { day: "Tue", high: 29, low: 17, condition: "Clear", rain: 0, humidity: 55, windSpeed: 8, icon: "☀️" },
      { day: "Wed", high: 27, low: 15, condition: "Cloudy", rain: 20, humidity: 68, windSpeed: 12, icon: "⛅" },
      { day: "Thu", high: 25, low: 14, condition: "Rainy", rain: 40, humidity: 75, windSpeed: 14, icon: "🌧️" },
      { day: "Fri", high: 27, low: 15, condition: "Cloudy", rain: 15, humidity: 65, windSpeed: 10, icon: "⛅" }
    ],
    alerts: [],
    recommendations: [
      "💧 Maintain regular irrigation - Warm conditions need water",
      "🌾 Perfect harvesting weather on Mon-Tue",
      "🐛 Good conditions for pest monitoring and control",
      "🌾 Apply fertilizer on Mon-Tue before rain",
      "🌡️ Warm conditions - Monitor soil moisture levels"
    ]
  },
  "Bihar": {
    region: "Bihar",
    current: {
      temp: 9,
      feelsLike: 7,
      condition: "Cloudy",
      description: "Cold and cloudy - Winter conditions prevail",
      humidity: 75,
      windSpeed: 16,
      pressure: 1017,
      visibility: 10,
      cloudCover: 55,
      rainChance: 20
    },
    forecast: [
      { day: "Mon", high: 13, low: 5, condition: "Cloudy", rain: 10, humidity: 72, windSpeed: 14, icon: "⛅" },
      { day: "Tue", high: 11, low: 4, condition: "Rainy", rain: 65, humidity: 85, windSpeed: 18, icon: "🌧️" },
      { day: "Wed", high: 8, low: 2, condition: "Rainy", rain: 75, humidity: 88, windSpeed: 20, icon: "🌧️" },
      { day: "Thu", high: 7, low: 1, condition: "Cloudy", rain: 40, humidity: 82, windSpeed: 17, icon: "⛅" },
      { day: "Fri", high: 10, low: 3, condition: "Clear", rain: 5, humidity: 70, windSpeed: 13, icon: "☀️" }
    ],
    alerts: [
      {
        type: "Frost Risk",
        severity: "high",
        description: "Severe frost expected on Wed-Thu with temperatures dropping to 1-2°C. Heavy crop protection needed."
      },
      {
        type: "Heavy Rain",
        severity: "high",
        description: "Heavy rainfall expected Tue-Wed with 65-75% probability. Ensure drainage is working."
      }
    ],
    recommendations: [
      "❄️ Critical frost protection - Use multiple layers of mulch",
      "💧 Avoid irrigation - Heavy rain forecasted",
      "🐛 Pesticide application not recommended - Heavy rain incoming",
      "🌾 Harvesting only on Mon morning before rain",
      "🌡️ Severe cold - Provide maximum protection for sensitive crops"
    ]
  },
  "Uttar Pradesh": {
    region: "Uttar Pradesh",
    current: {
      temp: 10,
      feelsLike: 8,
      condition: "Clear",
      description: "Cold and crisp winter morning",
      humidity: 70,
      windSpeed: 14,
      pressure: 1018,
      visibility: 11,
      cloudCover: 12,
      rainChance: 3
    },
    forecast: [
      { day: "Mon", high: 14, low: 5, condition: "Clear", rain: 0, humidity: 68, windSpeed: 12, icon: "☀️" },
      { day: "Tue", high: 12, low: 4, condition: "Sunny", rain: 3, humidity: 72, windSpeed: 13, icon: "☀️" },
      { day: "Wed", high: 9, low: 2, condition: "Cloudy", rain: 20, humidity: 78, windSpeed: 15, icon: "⛅" },
      { day: "Thu", high: 8, low: 1, condition: "Rainy", rain: 50, humidity: 85, windSpeed: 18, icon: "🌧️" },
      { day: "Fri", high: 11, low: 3, condition: "Cloudy", rain: 15, humidity: 75, windSpeed: 13, icon: "⛅" }
    ],
    alerts: [
      {
        type: "Frost Risk",
        severity: "high",
        description: "Frost alert for Wed-Thu. Temperature dropping to 1-2°C. Crop protection essential."
      }
    ],
    recommendations: [
      "❄️ Apply frost protection layers to sensitive crops",
      "💧 Reduce irrigation to minimum - Cold conditions reduce water need",
      "🌾 Clear harvesting window on Mon-Tue",
      "🐛 Avoid pesticide spraying - Heavy rain Thu",
      "🌡️ Extreme cold - Mulch and cover crops heavily"
    ]
  },
  "Rajasthan": {
    region: "Rajasthan",
    current: {
      temp: 16,
      feelsLike: 15,
      condition: "Clear",
      description: "Cool winter day with clear skies",
      humidity: 52,
      windSpeed: 12,
      pressure: 1015,
      visibility: 13,
      cloudCover: 5,
      rainChance: 0
    },
    forecast: [
      { day: "Mon", high: 22, low: 10, condition: "Clear", rain: 0, humidity: 50, windSpeed: 10, icon: "☀️" },
      { day: "Tue", high: 23, low: 11, condition: "Sunny", rain: 0, humidity: 48, windSpeed: 9, icon: "☀️" },
      { day: "Wed", high: 20, low: 9, condition: "Cloudy", rain: 10, humidity: 60, windSpeed: 11, icon: "⛅" },
      { day: "Thu", high: 18, low: 8, condition: "Partly Rainy", rain: 30, humidity: 68, windSpeed: 13, icon: "⛅" },
      { day: "Fri", high: 20, low: 9, condition: "Clear", rain: 0, humidity: 55, windSpeed: 11, icon: "☀️" }
    ],
    alerts: [],
    recommendations: [
      "💧 Irrigation needed - Low humidity and clear skies",
      "🌾 Excellent harvesting conditions on Mon-Tue",
      "🐛 Pest monitoring continues - Favorable conditions",
      "🌾 Apply fertilizer on Mon-Tue for best results",
      "🌡️ Cool weather - Ideal for many crop activities"
    ]
  },
  "Tamil Nadu": {
    region: "Tamil Nadu",
    current: {
      temp: 26,
      feelsLike: 28,
      condition: "Partly Cloudy",
      description: "Warm and humid with scattered clouds",
      humidity: 72,
      windSpeed: 12,
      pressure: 1014,
      visibility: 10,
      cloudCover: 45,
      rainChance: 15
    },
    forecast: [
      { day: "Mon", high: 30, low: 20, condition: "Cloudy", rain: 10, humidity: 70, windSpeed: 11, icon: "⛅" },
      { day: "Tue", high: 31, low: 21, condition: "Rainy", rain: 50, humidity: 78, windSpeed: 13, icon: "🌧️" },
      { day: "Wed", high: 29, low: 20, condition: "Rainy", rain: 60, humidity: 80, windSpeed: 14, icon: "🌧️" },
      { day: "Thu", high: 28, low: 19, condition: "Cloudy", rain: 35, humidity: 76, windSpeed: 12, icon: "⛅" },
      { day: "Fri", high: 30, low: 20, condition: "Cloudy", rain: 20, humidity: 72, windSpeed: 11, icon: "⛅" }
    ],
    alerts: [
      {
        type: "High Humidity",
        severity: "medium",
        description: "High humidity throughout the week. Monitor closely for fungal diseases."
      }
    ],
    recommendations: [
      "💧 High humidity - Reduce irrigation frequency",
      "🐛 Fungal disease risk - Apply preventive fungicide",
      "🌾 Avoid fertilizer application during rain",
      "🌾 Plan harvesting for late Mon or next week",
      "🌡️ Ensure good air circulation around crops"
    ]
  }
};

// Get weather for a specific region
router.get("/:region", async (req, res) => {
  try {
    const region = req.params.region;
    
    if (!weatherData[region]) {
      return res.status(400).json({ 
        message: "Region not found. Available regions: " + Object.keys(weatherData).join(", ") 
      });
    }

    res.json(weatherData[region]);

  } catch (err) {
    console.error("Weather API error:", err);
    res.status(500).json({ 
      message: "Error fetching weather data", 
      error: err.message 
    });
  }
});

// Get all available regions
router.get("/", (req, res) => {
  res.json({
    regions: Object.keys(weatherData),
    count: Object.keys(weatherData).length
  });
});

module.exports = router;
