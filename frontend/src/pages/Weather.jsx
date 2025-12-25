import { useState, useEffect } from "react";
import axios from "axios";
import {
  Cloud,
  Droplets,
  Wind,
  Eye,
  AlertTriangle,
  Sun,
  Calendar,
  MapPin,
} from "lucide-react";

const Weather = () => {
  // ============ STATE MANAGEMENT ============
  const [selectedRegion, setSelectedRegion] = useState("Punjab");
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Available Regions
  const regions = [
    "Punjab",
    "Haryana",
    "Maharashtra",
    "Karnataka",
    "Bihar",
    "Uttar Pradesh",
    "Rajasthan",
    "Tamil Nadu",
  ];

  // ============ EFFECTS ============
  useEffect(() => {
    fetchWeatherData(selectedRegion);
  }, [selectedRegion]);

  // ============ FUNCTIONS ============
  const fetchWeatherData = async (region) => {
    setLoading(true);
    setError("");
    try {
      const response = await axios.get(
        `http://localhost:5000/api/weather/${region}`
      );
      setWeatherData(response.data);
      console.log("✅ Weather data loaded:", response.data);
    } catch (err) {
      const errorMessage =
        err.response?.data?.message ||
        "Failed to fetch weather data. Please try again.";
      setError(errorMessage);
      console.error("❌ Weather fetch error:", err);
    } finally {
      setLoading(false);
    }
  };

  // ============ LOADING STATE ============
  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100 py-12 px-4">
        <div className="max-w-7xl mx-auto text-center py-20">
          <div className="inline-block">
            <Cloud className="w-20 h-20 text-blue-500 animate-bounce" />
          </div>
          <h2 className="text-2xl font-bold text-gray-800 mt-6">
            Loading Weather Data...
          </h2>
          <p className="text-gray-600 mt-2">Please wait a moment</p>
        </div>
      </div>
    );
  }

  // ============ ERROR STATE ============
  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-red-50 to-red-100 py-12 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="bg-white rounded-2xl shadow-lg p-8 border-l-4 border-red-500">
            <div className="flex items-center gap-4 mb-4">
              <AlertTriangle className="w-10 h-10 text-red-500" />
              <h2 className="text-2xl font-bold text-red-700">Error Loading Weather</h2>
            </div>
            <p className="text-gray-700 text-lg">{error}</p>
            <button
              onClick={() => setSelectedRegion(selectedRegion)}
              className="mt-6 bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-6 rounded-lg transition"
            >
              Try Again
            </button>
          </div>
        </div>
      </div>
    );
  }

  // ============ MAIN RENDER ============
  if (!weatherData) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100 py-12 px-4">
        <div className="max-w-7xl mx-auto text-center py-20">
          <p className="text-xl text-gray-600">No weather data available</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-50 py-12 px-4">
      <div className="max-w-7xl mx-auto">
        {/* ==================== HEADER SECTION ==================== */}
        <div className="mb-10">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-5xl font-bold text-gray-900 mb-2 flex items-center gap-3">
                <Sun className="w-10 h-10 text-yellow-500" />
                Weather & Farming Guide
              </h1>
              <p className="text-gray-600">
                Real-time weather insights and agricultural recommendations
              </p>
            </div>
          </div>

          {/* Region Selector */}
          <div className="bg-white rounded-xl shadow-md p-6 border-l-4 border-blue-500">
            <div className="flex items-center gap-4">
              <MapPin className="w-6 h-6 text-blue-500" />
              <label className="text-lg font-bold text-gray-800">
                Select Agricultural Region:
              </label>
              <select
                value={selectedRegion}
                onChange={(e) => setSelectedRegion(e.target.value)}
                className="flex-1 border-2 border-gray-300 rounded-lg px-4 py-3 text-lg font-semibold focus:outline-none focus:border-blue-500 transition"
              >
                {regions.map((region) => (
                  <option key={region} value={region}>
                    {region}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* ==================== ALERTS SECTION ==================== */}
        {weatherData?.alerts && weatherData.alerts.length > 0 && (
          <div className="mb-10">
            <h2 className="text-3xl font-bold text-gray-900 mb-6 flex items-center gap-3">
              <AlertTriangle className="w-8 h-8 text-red-500" />
              Active Weather Alerts
            </h2>
            <div className="grid grid-cols-1 gap-4">
              {weatherData.alerts.map((alert, idx) => (
                <div
                  key={idx}
                  className={`rounded-xl p-6 border-l-4 ${
                    alert.severity === "high"
                      ? "bg-red-50 border-red-500 shadow-md"
                      : "bg-yellow-50 border-yellow-500 shadow-md"
                  }`}
                >
                  <h3
                    className={`text-xl font-bold mb-2 ${
                      alert.severity === "high"
                        ? "text-red-700"
                        : "text-yellow-700"
                    }`}
                  >
                    {alert.type}
                  </h3>
                  <p className="text-gray-700 text-base leading-relaxed">
                    {alert.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ==================== CURRENT WEATHER SECTION ==================== */}
        <div className="mb-10">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">
            {weatherData?.region} - Current Conditions
          </h2>

          {/* Main Weather Card */}
          <div className="bg-gradient-to-br from-blue-500 to-blue-700 text-white rounded-2xl shadow-xl p-10 mb-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mb-8">
              {/* Temperature & Condition */}
              <div className="flex flex-col justify-center">
                <p className="text-6xl font-bold mb-3">
                  {weatherData?.current.temp}°C
                </p>
                <p className="text-2xl font-semibold capitalize mb-2">
                  {weatherData?.current.condition}
                </p>
                <p className="text-lg opacity-90 capitalize">
                  {weatherData?.current.description}
                </p>
                <p className="text-sm opacity-75 mt-4">
                  Feels like {weatherData?.current.feelsLike}°C
                </p>
              </div>

              {/* Weather Stats Grid */}
              <div className="grid grid-cols-2 gap-4">
                {/* Humidity */}
                <div className="bg-white/20 backdrop-blur rounded-xl p-5">
                  <div className="flex items-center gap-2 mb-3">
                    <Droplets className="w-6 h-6" />
                    <span className="text-sm font-semibold opacity-90">
                      Humidity
                    </span>
                  </div>
                  <p className="text-3xl font-bold">
                    {weatherData?.current.humidity}%
                  </p>
                  <p className="text-xs opacity-75 mt-2">
                    {weatherData?.current.humidity > 75
                      ? "High - Fungal risk ⚠️"
                      : weatherData?.current.humidity < 40
                      ? "Low - Irrigate more 💧"
                      : "Optimal 🌿"}
                  </p>
                </div>

                {/* Wind Speed */}
                <div className="bg-white/20 backdrop-blur rounded-xl p-5">
                  <div className="flex items-center gap-2 mb-3">
                    <Wind className="w-6 h-6" />
                    <span className="text-sm font-semibold opacity-90">
                      Wind Speed
                    </span>
                  </div>
                  <p className="text-3xl font-bold">
                    {Math.round(weatherData?.current.windSpeed)}
                  </p>
                  <p className="text-xs opacity-75 mt-2">km/h</p>
                </div>

                {/* Pressure */}
                <div className="bg-white/20 backdrop-blur rounded-xl p-5">
                  <p className="text-sm font-semibold opacity-90 mb-2">
                    Pressure
                  </p>
                  <p className="text-2xl font-bold">
                    {weatherData?.current.pressure}
                  </p>
                  <p className="text-xs opacity-75 mt-2">mb</p>
                </div>

                {/* Visibility */}
                <div className="bg-white/20 backdrop-blur rounded-xl p-5">
                  <div className="flex items-center gap-2 mb-2">
                    <Eye className="w-5 h-5" />
                    <p className="text-sm font-semibold opacity-90">
                      Visibility
                    </p>
                  </div>
                  <p className="text-2xl font-bold">
                    {Math.round(weatherData?.current.visibility)}
                  </p>
                  <p className="text-xs opacity-75 mt-2">km</p>
                </div>
              </div>
            </div>

            {/* Cloud Cover */}
            <div className="bg-white/20 backdrop-blur rounded-xl p-5">
              <p className="text-sm font-semibold opacity-90 mb-3">
                Cloud Coverage
              </p>
              <div className="w-full bg-white/30 rounded-full h-3">
                <div
                  className="bg-white rounded-full h-3 transition-all"
                  style={{
                    width: `${weatherData?.current.cloudCover}%`,
                  }}
                ></div>
              </div>
              <p className="text-sm opacity-75 mt-2">
                {weatherData?.current.cloudCover}%
              </p>
            </div>
          </div>
        </div>

        {/* ==================== FORECAST SECTION ==================== */}
        <div className="mb-10">
          <h2 className="text-3xl font-bold text-gray-900 mb-6 flex items-center gap-3">
            <Calendar className="w-8 h-8 text-blue-500" />
            5-Day Forecast
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-5 gap-5">
            {weatherData?.forecast?.map((day, idx) => (
              <div
                key={idx}
                className="bg-white rounded-xl shadow-lg p-6 text-center border-t-4 border-blue-500 hover:shadow-xl transition"
              >
                {/* Day Name */}
                <p className="text-lg font-bold text-gray-800 mb-4">{day.day}</p>

                {/* Weather Icon */}
                <p className="text-6xl mb-4">{day.icon}</p>

                {/* Temperature Range */}
                <div className="mb-4 pb-4 border-b-2 border-gray-200">
                  <p className="text-xs font-semibold text-gray-600 mb-1">
                    Temperature
                  </p>
                  <p className="text-2xl font-bold text-gray-800">
                    {day.high}° / {day.low}°
                  </p>
                </div>

                {/* Condition */}
                <div className="mb-4">
                  <p className="text-xs font-semibold text-gray-600 mb-1">
                    Condition
                  </p>
                  <p className="font-semibold text-gray-800">{day.condition}</p>
                </div>

                {/* Rain Probability */}
                <div className="bg-gradient-to-r from-blue-400 to-blue-500 text-white rounded-xl p-4">
                  <p className="text-xs font-semibold mb-2">Rain Chance</p>
                  <p className="text-3xl font-bold">{Math.round(day.rain)}%</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ==================== RECOMMENDATIONS SECTION ==================== */}
        <div className="mb-10">
          <h2 className="text-3xl font-bold text-gray-900 mb-6 flex items-center gap-3">
            <Sun className="w-8 h-8 text-yellow-500" />
            Smart Farming Recommendations
          </h2>

          {/* Recommendation Cards */}
          <div className="grid grid-cols-1 gap-4 mb-8">
            {weatherData?.recommendations?.map((rec, idx) => (
              <div
                key={idx}
                className="bg-gradient-to-r from-green-50 to-green-100 rounded-xl p-6 border-l-4 border-green-500 shadow-md hover:shadow-lg transition flex items-start gap-4"
              >
                <span className="text-3xl flex-shrink-0">🌾</span>
                <p className="text-gray-800 text-lg font-semibold leading-relaxed">
                  {rec}
                </p>
              </div>
            ))}
          </div>

          {/* Action Items Box */}
          <div className="bg-gradient-to-br from-green-100 to-green-50 rounded-2xl p-8 border-2 border-green-300 shadow-lg">
            <h3 className="text-2xl font-bold text-green-900 mb-6 flex items-center gap-3">
              <AlertTriangle className="w-7 h-7" />
              This Week's Action Plan
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[
                "Monitor weather updates daily",
                "Prepare for weather changes",
                "Plan crop activities accordingly",
                "Check drainage & irrigation systems",
                "Maintain equipment & supplies",
                "Review crop health status",
              ].map((item, idx) => (
                <div
                  key={idx}
                  className="flex items-center gap-4 p-4 bg-white rounded-lg shadow-sm"
                >
                  <span className="text-2xl text-green-600">✓</span>
                  <span className="text-gray-800 font-semibold">{item}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Weather;
