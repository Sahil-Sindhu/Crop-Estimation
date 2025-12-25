import { useState, useEffect } from "react";
import axios from "axios";
import { useAuth } from "../context/AuthContext";
import { Lightbulb, Droplets, Bug, Sprout, TrendingUp, AlertCircle, Cloud, CloudRain, Sun, Wind, Eye } from "lucide-react";

export default function Recommendations() {
  const { token } = useAuth();
  const [cropType, setCropType] = useState("");
  const [soilType, setSoilType] = useState("loamy");
  const [recommendations, setRecommendations] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [weatherData, setWeatherData] = useState(null);
  const [selectedRegion, setSelectedRegion] = useState("Punjab");

  const handleGetRecommendations = async (e) => {
    e.preventDefault();
    if (!cropType) {
      setError("Please select a crop type");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const headers = token ? { Authorization: `Bearer ${token}` } : {};
      const res = await axios.get(
        `http://localhost:5000/api/recommendations/${cropType}/${soilType}`,
        { headers }
      );
      console.log("Recommendations response:", res.data);
      console.log("Recommendations details:", res.data.recommendations);
      setRecommendations(res.data);
      
      // Fetch weather data for selected region
      fetchWeatherData(selectedRegion);
    } catch (err) {
      console.error("Recommendations error:", err.response?.data || err.message);
      setError(err.response?.data?.message || "Failed to fetch recommendations");
    } finally {
      setLoading(false);
    }
  };

  const fetchWeatherData = async (region) => {
    try {
      const res = await axios.get(`http://localhost:5000/api/weather/${region}`);
      setWeatherData(res.data);
    } catch (err) {
      console.error("Weather data error:", err);
    }
  };

  useEffect(() => {
    // Fetch initial weather data
    fetchWeatherData(selectedRegion);
  }, [selectedRegion]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-emerald-50">
      <div className="max-w-7xl mx-auto mt-8 px-4 pb-8">
        {/* Header Section */}
        <div className="mb-12 text-center">
          <div className="flex items-center justify-center gap-3 mb-4">
            <Lightbulb className="text-yellow-500 w-12 h-12" />
            <h1 className="text-5xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
              Smart Crop Recommendations
            </h1>
          </div>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Get AI-powered farming recommendations tailored to your crop type and soil conditions. Increase yield, reduce costs, and farm smarter.
          </p>
        </div>

        {/* Search Form */}
        <div className="bg-white/80 backdrop-blur-xl rounded-2xl shadow-xl p-8 mb-12 border border-white/20">
        <form onSubmit={handleGetRecommendations} className="space-y-6">
          {/* Form Grid */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 items-end">
            <div>
              <label className="block text-sm font-bold mb-2 text-gray-700">🌾 Select Crop Type</label>
              <select
                value={cropType}
                onChange={(e) => setCropType(e.target.value)}
                className="w-full border-2 border-gray-200 rounded-lg px-4 py-3 focus:outline-none focus:border-green-500 focus:ring-2 focus:ring-green-200 transition bg-white font-medium"
              >
                <option value="">Choose a crop...</option>
                <option value="Wheat">🌾 Wheat</option>
                <option value="Rice">🍚 Rice</option>
                <option value="Corn">🌽 Corn</option>
                <option value="Tomato">🍅 Tomato</option>
                <option value="Potato">🥔 Potato</option>
                <option value="Soybean">🫘 Soybean</option>
                <option value="Cotton">🏵️ Cotton</option>
                <option value="Sugarcane">🌾 Sugarcane</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-bold mb-2 text-gray-700">🌍 Soil Type</label>
              <select
                value={soilType}
                onChange={(e) => setSoilType(e.target.value)}
                className="w-full border-2 border-gray-200 rounded-lg px-4 py-3 focus:outline-none focus:border-green-500 focus:ring-2 focus:ring-green-200 transition bg-white font-medium"
              >
                <option value="loamy">🌱 Loamy (Ideal)</option>
                <option value="sandy">🏜️ Sandy</option>
                <option value="clayey">🪨 Clayey</option>
                <option value="silty">💧 Silty</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-bold mb-2 text-gray-700">🌦️ Select Region</label>
              <select
                value={selectedRegion}
                onChange={(e) => setSelectedRegion(e.target.value)}
                className="w-full border-2 border-gray-200 rounded-lg px-4 py-3 focus:outline-none focus:border-green-500 focus:ring-2 focus:ring-green-200 transition bg-white font-medium"
              >
                <option value="Punjab">🌾 Punjab</option>
                <option value="Haryana">🌾 Haryana</option>
                <option value="Maharashtra">🏞️ Maharashtra</option>
                <option value="Karnataka">🏞️ Karnataka</option>
                <option value="Bihar">🌾 Bihar</option>
                <option value="Uttar Pradesh">🌾 Uttar Pradesh</option>
                <option value="Rajasthan">🏜️ Rajasthan</option>
                <option value="Tamil Nadu">🏞️ Tamil Nadu</option>
              </select>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="bg-gradient-to-r from-green-500 to-emerald-600 text-white font-bold py-3 px-6 rounded-lg hover:from-green-600 hover:to-emerald-700 disabled:opacity-50 transition transform hover:scale-105 active:scale-95 shadow-lg"
            >
              {loading ? "⏳ Analyzing..." : "📊 Get Recommendations"}
            </button>
          </div>
          {error && (
            <div className="p-4 bg-red-50 border-l-4 border-red-500 text-red-700 rounded-lg flex items-center gap-3 animate-pulse">
              <AlertCircle className="w-6 h-6 flex-shrink-0" />
              <span className="font-medium">{error}</span>
            </div>
          )}
        </form>
        </div>

      {/* Recommendations Display */}
      {recommendations && (
        <div className="space-y-8 animate-fade-in">
          {/* Header */}
          <div className="bg-gradient-to-r from-green-500 via-emerald-500 to-teal-500 rounded-2xl p-10 text-white shadow-xl transform hover:scale-105 transition">
            <h2 className="text-4xl font-bold mb-3">{recommendations.cropType || cropType} 🌾 Farming Excellence Guide</h2>
            <p className="text-green-50 text-lg">
              Customized for <span className="font-bold capitalize">{recommendations.soilType || soilType}</span> soil • Maximum yield strategies • Proven success rates
            </p>
          </div>

          {/* 5-Day Weather Forecast */}
          {weatherData && (
            <div className="bg-white rounded-xl shadow-lg p-8 hover:shadow-xl transition">
              <h3 className="text-2xl font-bold mb-6 flex items-center gap-2">
                <Cloud className="text-blue-500 w-7 h-7" /> 🌦️ 5-Day Weather Forecast ({weatherData.region})
              </h3>
              
              {/* Current Weather */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8 pb-8 border-b-2 border-gray-200">
                <div className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-lg p-6 border-2 border-blue-200">
                  <h4 className="text-xl font-bold text-blue-900 mb-4">📍 Today's Weather</h4>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center p-3 bg-white rounded-lg">
                      <span className="text-gray-700 font-medium">🌡️ Temperature</span>
                      <span className="text-2xl font-bold text-blue-600">{weatherData.current?.temp}°C</span>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-white rounded-lg">
                      <span className="text-gray-700 font-medium">🌫️ Feels Like</span>
                      <span className="text-xl font-bold text-blue-500">{weatherData.current?.feelsLike}°C</span>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-white rounded-lg">
                      <span className="text-gray-700 font-medium">💧 Humidity</span>
                      <span className="text-xl font-bold text-cyan-600">{weatherData.current?.humidity}%</span>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-white rounded-lg">
                      <span className="text-gray-700 font-medium">☁️ Condition</span>
                      <span className="text-lg font-bold text-gray-800">{weatherData.current?.condition}</span>
                    </div>
                  </div>
                </div>

                <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-lg p-6 border-2 border-purple-200">
                  <h4 className="text-xl font-bold text-purple-900 mb-4">📊 More Details</h4>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center p-3 bg-white rounded-lg">
                      <span className="text-gray-700 font-medium">💨 Wind Speed</span>
                      <span className="text-xl font-bold text-orange-600">{weatherData.current?.windSpeed} km/h</span>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-white rounded-lg">
                      <span className="text-gray-700 font-medium">🔍 Visibility</span>
                      <span className="text-xl font-bold text-green-600">{weatherData.current?.visibility} km</span>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-white rounded-lg">
                      <span className="text-gray-700 font-medium">🌧️ Rain Chance</span>
                      <span className="text-xl font-bold text-blue-600">{weatherData.current?.rainChance}%</span>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-white rounded-lg">
                      <span className="text-gray-700 font-medium">🌊 Pressure</span>
                      <span className="text-lg font-bold text-gray-800">{weatherData.current?.pressure} mb</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* 5-Day Forecast Cards */}
              <h4 className="text-lg font-bold text-gray-800 mb-4">📅 Next 5 Days</h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
                {weatherData.forecast?.map((day, index) => (
                  <div key={index} className="bg-gradient-to-br from-sky-50 to-blue-50 rounded-lg p-4 border-2 border-sky-200 hover:shadow-lg transition transform hover:scale-105">
                    <div className="text-center">
                      <p className="text-lg font-bold text-gray-800 mb-2">{day.day}</p>
                      <p className="text-3xl mb-2">{day.icon}</p>
                      <div className="space-y-2 text-sm">
                        <div className="bg-white rounded p-2">
                          <p className="text-gray-600">High</p>
                          <p className="text-xl font-bold text-red-600">{day.high}°C</p>
                        </div>
                        <div className="bg-white rounded p-2">
                          <p className="text-gray-600">Low</p>
                          <p className="text-xl font-bold text-blue-600">{day.low}°C</p>
                        </div>
                        <div className="bg-white rounded p-2">
                          <p className="text-gray-600 text-xs">{day.condition}</p>
                          <p className="font-bold text-gray-800">{day.rain}% rain</p>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Quick Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white rounded-xl shadow-lg p-6 border-t-4 border-green-500 hover:shadow-xl transition">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-600 text-sm font-medium">⏱️ Days to Harvest</p>
                  <p className="text-3xl font-bold text-green-600 mt-2">
                    {recommendations.recommendations?.daysToMaturity || recommendations.daysToMaturity || "N/A"}
                  </p>
                </div>
                <TrendingUp className="w-12 h-12 text-green-400 opacity-20" />
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-lg p-6 border-t-4 border-emerald-500 hover:shadow-xl transition">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-600 text-sm font-medium">📈 Expected Yield/Acre</p>
                  <p className="text-3xl font-bold text-emerald-600 mt-2">
                    {recommendations.recommendations?.expectedYieldPerAcre || recommendations.expectedYieldPerAcre || "N/A"}
                  </p>
                </div>
                <TrendingUp className="w-12 h-12 text-emerald-400 opacity-20" />
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-lg p-6 border-t-4 border-blue-500 hover:shadow-xl transition">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-600 text-sm font-medium">🎯 Optimal Seasons</p>
                  <p className="text-lg font-bold text-blue-600 mt-2">
                    {recommendations.recommendations?.bestSeason?.[0] || recommendations.bestSeason?.[0] || 'Check below'}
                  </p>
                </div>
                <Sprout className="w-12 h-12 text-blue-400 opacity-20" />
              </div>
            </div>
          </div>

          {/* Best Planting Seasons */}
          <div className="bg-white rounded-xl shadow-lg p-8 hover:shadow-xl transition">
            <h3 className="text-2xl font-bold mb-6 flex items-center gap-2">
              <Sprout className="text-green-500 w-7 h-7" /> 🗓️ Best Planting Seasons
            </h3>
            <div className="flex flex-wrap gap-3">
              {(recommendations.recommendations?.bestSeason || recommendations.bestSeason)?.map((season, i) => (
                <span key={i} className="px-6 py-3 bg-gradient-to-r from-green-100 to-emerald-100 text-green-800 rounded-full font-bold text-center hover:shadow-md transition">
                  {season}
                </span>
              ))}
            </div>
          </div>

          {/* Watering Schedule */}
          <div className="bg-white rounded-xl shadow-lg p-8 hover:shadow-xl transition">
            <h3 className="text-2xl font-bold mb-6 flex items-center gap-2">
              <Droplets className="text-blue-500 w-7 h-7" /> 💧 Smart Watering Schedule
            </h3>
            <div className="p-6 bg-gradient-to-r from-blue-50 to-cyan-50 rounded-lg border-2 border-blue-200">
              <p className="text-lg text-gray-800 leading-relaxed">
                {recommendations.recommendations?.wateringSchedule || recommendations.wateringSchedule}
              </p>
            </div>
          </div>

          {/* Fertilizers */}
          <div className="bg-white rounded-xl shadow-lg p-8 hover:shadow-xl transition">
            <h3 className="text-2xl font-bold mb-6 flex items-center gap-2">
              🌱 Recommended Fertilizers & Nutrients
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {(recommendations.recommendations?.fertilizers || recommendations.fertilizers)?.map((fert, i) => (
                <div key={i} className="p-5 bg-gradient-to-r from-amber-50 to-yellow-50 rounded-lg border-2 border-amber-200 hover:border-amber-400 transition">
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">🌾</span>
                    <p className="font-bold text-amber-900">{fert}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Pest Prevention */}
          <div className="bg-white rounded-xl shadow-lg p-8 hover:shadow-xl transition">
            <h3 className="text-2xl font-bold mb-6 flex items-center gap-2">
              <Bug className="text-red-500 w-7 h-7" /> 🐛 Pest Prevention Measures
            </h3>
            <div className="space-y-3">
              {(recommendations.recommendations?.pestPrevention || recommendations.pestPrevention)?.map((measure, i) => (
                <div key={i} className="flex items-start gap-4 p-4 bg-red-50 rounded-lg border-l-4 border-red-400 hover:bg-red-100 transition">
                  <span className="text-red-500 font-bold text-xl flex-shrink-0">✓</span>
                  <span className="text-gray-800 font-medium pt-1">{measure}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Common Diseases */}
          <div className="bg-white rounded-xl shadow-lg p-8 hover:shadow-xl transition">
            <h3 className="text-2xl font-bold mb-6 flex items-center gap-2">
              <AlertCircle className="text-orange-500 w-7 h-7" /> ⚠️ Common Diseases & Solutions
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {(recommendations.recommendations?.commonDiseases || recommendations.commonDiseases)?.map((disease, i) => (
                <div key={i} className="p-5 bg-gradient-to-r from-orange-50 to-red-50 rounded-lg border-2 border-orange-200 hover:shadow-md transition">
                  <p className="font-bold text-orange-900 flex items-center gap-2">
                    <span className="text-lg">🔍</span> {disease}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Soil Preparation */}
          {(recommendations.recommendations?.soilPreparation || recommendations.soilPreparation) && (
            <div className="bg-white rounded-xl shadow-lg p-8 hover:shadow-xl transition">
              <h3 className="text-2xl font-bold mb-6 flex items-center gap-2">
                🌍 Soil Preparation
              </h3>
              <div className="p-6 bg-gradient-to-r from-amber-50 to-yellow-50 rounded-lg border-2 border-amber-200">
                <p className="text-lg text-gray-800 leading-relaxed">
                  {recommendations.recommendations?.soilPreparation || recommendations.soilPreparation}
                </p>
              </div>
            </div>
          )}

          {/* Spacing & Planting */}
          {(recommendations.recommendations?.spacing || recommendations.spacing) && (
            <div className="bg-white rounded-xl shadow-lg p-8 hover:shadow-xl transition">
              <h3 className="text-2xl font-bold mb-6 flex items-center gap-2">
                📏 Spacing & Planting Details
              </h3>
              <div className="p-6 bg-gradient-to-r from-blue-50 to-cyan-50 rounded-lg border-2 border-blue-200">
                <p className="text-lg text-gray-800 leading-relaxed">
                  {recommendations.recommendations?.spacing || recommendations.spacing}
                </p>
              </div>
            </div>
          )}

          {/* Pro Tips */}
          <div className="bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl p-10 text-white shadow-xl">
            <h3 className="text-3xl font-bold mb-6 flex items-center gap-2">💡 Pro Tips for Maximum Success</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex gap-3 items-start bg-white/20 p-4 rounded-lg backdrop-blur">
                <span className="text-2xl flex-shrink-0">📊</span>
                <div>
                  <p className="font-bold mb-1">Monitor Weather</p>
                  <p className="text-sm opacity-90">Track forecasts during critical growth stages</p>
                </div>
              </div>
              <div className="flex gap-3 items-start bg-white/20 p-4 rounded-lg backdrop-blur">
                <span className="text-2xl flex-shrink-0">📝</span>
                <div>
                  <p className="font-bold mb-1">Keep Records</p>
                  <p className="text-sm opacity-90">Document all fertilizer & pesticide applications</p>
                </div>
              </div>
              <div className="flex gap-3 items-start bg-white/20 p-4 rounded-lg backdrop-blur">
                <span className="text-2xl flex-shrink-0">🧪</span>
                <div>
                  <p className="font-bold mb-1">Test Soil</p>
                  <p className="text-sm opacity-90">Maintain optimal nutrient levels regularly</p>
                </div>
              </div>
              <div className="flex gap-3 items-start bg-white/20 p-4 rounded-lg backdrop-blur">
                <span className="text-2xl flex-shrink-0">🔔</span>
                <div>
                  <p className="font-bold mb-1">Use Alerts</p>
                  <p className="text-sm opacity-90">Enable CropVision notifications for timely updates</p>
                </div>
              </div>
              <div className="flex gap-3 items-start bg-white/20 p-4 rounded-lg backdrop-blur md:col-span-2">
                <span className="text-2xl flex-shrink-0">♻️</span>
                <div>
                  <p className="font-bold mb-1">Rotate Crops</p>
                  <p className="text-sm opacity-90">Maintain soil health and prevent disease buildup annually</p>
                </div>
              </div>
            </div>
          </div>

          {/* Call to Action */}
          <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl p-8 border-2 border-green-200 text-center">
            <p className="text-gray-700 mb-4">
              👍 Implement these recommendations to maximize your yield and farm sustainability!
            </p>
            <button className="bg-gradient-to-r from-green-500 to-emerald-600 text-white font-bold py-2 px-8 rounded-lg hover:shadow-lg transition transform hover:scale-105">
              📊 View My Crops
            </button>
          </div>
        </div>
      )}

      {/* Empty State */}
      {!recommendations && !loading && (
        <div className="bg-gradient-to-r from-green-50 via-blue-50 to-emerald-50 rounded-2xl p-20 text-center border-2 border-dashed border-green-200">
          <div className="mb-6">
            <Lightbulb size={80} className="mx-auto text-green-400 mb-4 animate-bounce" />
          </div>
          <h3 className="text-3xl font-bold text-gray-800 mb-3">
            🚀 Get Personalized Farming Recommendations
          </h3>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto mb-8 leading-relaxed">
            Select your crop type and soil conditions above to receive AI-powered recommendations tailored to your farm. Increase yields, optimize resources, and farm smarter!
          </p>
          <div className="flex justify-center gap-2">
            <span className="text-3xl animate-pulse">🌾</span>
            <span className="text-3xl animate-pulse" style={{animationDelay: '0.2s'}}>📈</span>
            <span className="text-3xl animate-pulse" style={{animationDelay: '0.4s'}}>✨</span>
          </div>
        </div>
      )}
    </div>
    </div>
  );
}
