import { useEffect, useState, useMemo } from "react";
import axios from "axios";
import { useAuth } from "../context/AuthContext";
import { Chart as ChartJS, PieController, ArcElement, Tooltip, Legend, BarElement, CategoryScale, LinearScale } from "chart.js";
import { Pie, Bar } from "react-chartjs-2";
import { TrendingUp, DollarSign, Leaf, AlertTriangle, BarChart3, PieChart, Activity, Sprout, Zap, Shield } from "lucide-react";

ChartJS.register(PieController, ArcElement, Tooltip, Legend, BarElement, CategoryScale, LinearScale);

export default function Analytics() {
  const { token } = useAuth();
  const [crops, setCrops] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadData() {
      setLoading(true);
      try {
        const headers = token ? { Authorization: `Bearer ${token}` } : {};
        const res = await axios.get("http://localhost:5000/api/crops", { headers });
        setCrops(res.data || []);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, [token]);

  const stats = useMemo(() => {
    const activeCrops = crops.filter(c => c.growthStage !== "Harvested");
    const harvestedCrops = crops.filter(c => c.growthStage === "Harvested");
    const totalArea = crops.reduce((sum, c) => sum + c.area, 0);
    const avgHealth = crops.length > 0 ? Math.round(crops.reduce((sum, c) => sum + c.healthScore, 0) / crops.length) : 0;
    const totalPests = crops.reduce((sum, c) => sum + (c.pestIssues?.filter(p => p.status === "active").length || 0), 0);
    const totalEstimatedYield = crops.reduce((sum, c) => sum + (c.estimatedYield || 0), 0);

    return { activeCrops, harvestedCrops, totalArea, avgHealth, totalPests, totalEstimatedYield };
  }, [crops]);

  const growthStageData = useMemo(() => {
    const stages = {};
    crops.forEach(crop => {
      stages[crop.growthStage] = (stages[crop.growthStage] || 0) + 1;
    });
    return {
      labels: Object.keys(stages),
      datasets: [{
        data: Object.values(stages),
        backgroundColor: [
          '#fbbf24',
          '#60a5fa',
          '#34d399',
          '#f87171'
        ],
        borderColor: '#fff',
        borderWidth: 2
      }]
    };
  }, [crops]);

  const healthScoreData = useMemo(() => {
    return {
      labels: crops.slice(0, 10).map(c => c.field),
      datasets: [{
        label: "Health Score",
        data: crops.slice(0, 10).map(c => c.healthScore),
        backgroundColor: crops.slice(0, 10).map(c => 
          c.healthScore >= 70 ? '#34d399' : c.healthScore >= 50 ? '#fbbf24' : '#f87171'
        ),
        borderColor: '#374151',
        borderWidth: 1
      }]
    };
  }, [crops]);

  const cropTypeDistribution = useMemo(() => {
    const types = {};
    crops.forEach(crop => {
      types[crop.cropType] = (types[crop.cropType] || 0) + 1;
    });
    return {
      labels: Object.keys(types),
      datasets: [{
        data: Object.values(types),
        backgroundColor: ['#3b82f6', '#ef4444', '#10b981', '#f59e0b', '#8b5cf6'],
        borderColor: '#fff',
        borderWidth: 2
      }]
    };
  }, [crops]);

  if (loading) return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-emerald-50 flex items-center justify-center">
      <div className="text-center">
        <div className="animate-spin mb-4">
          <Sprout className="w-16 h-16 text-green-500" />
        </div>
        <p className="text-2xl font-bold text-gray-700">Loading your farm analytics...</p>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-emerald-50 py-12 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="mb-12">
          <div className="flex items-center gap-3 mb-4">
            <BarChart3 className="w-12 h-12 text-green-600" />
            <h1 className="text-5xl font-bold bg-gradient-to-r from-green-600 via-emerald-600 to-teal-600 bg-clip-text text-transparent">
              Farm Analytics & Insights
            </h1>
          </div>
          <p className="text-gray-600 text-lg max-w-2xl">
            Track your farm's performance with real-time analytics, growth patterns, and health metrics
          </p>
        </div>

        {/* Key Stats - Premium Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 mb-8">
          {/* Total Crops */}
          <div className="group relative bg-white rounded-2xl p-6 shadow-lg hover:shadow-2xl transition duration-300 border border-transparent hover:border-green-200 overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-green-50 to-transparent opacity-0 group-hover:opacity-100 transition duration-300"></div>
            <div className="relative z-10">
              <div className="flex items-center justify-between mb-4">
                <Leaf className="w-10 h-10 text-green-500" />
                <span className="text-xs font-bold text-green-600 bg-green-100 px-3 py-1 rounded-full">+12%</span>
              </div>
              <p className="text-gray-600 text-sm font-medium mb-2">Total Crops</p>
              <p className="text-4xl font-bold text-gray-800">{crops.length}</p>
              <p className="text-xs text-gray-500 mt-2">On your farm</p>
            </div>
          </div>

          {/* Active Crops */}
          <div className="group relative bg-white rounded-2xl p-6 shadow-lg hover:shadow-2xl transition duration-300 border border-transparent hover:border-blue-200 overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-transparent opacity-0 group-hover:opacity-100 transition duration-300"></div>
            <div className="relative z-10">
              <div className="flex items-center justify-between mb-4">
                <TrendingUp className="w-10 h-10 text-blue-500" />
                <span className="text-xs font-bold text-blue-600 bg-blue-100 px-3 py-1 rounded-full">Active</span>
              </div>
              <p className="text-gray-600 text-sm font-medium mb-2">Growing Crops</p>
              <p className="text-4xl font-bold text-gray-800">{stats.activeCrops.length}</p>
              <p className="text-xs text-gray-500 mt-2">Currently in growth</p>
            </div>
          </div>

          {/* Total Area */}
          <div className="group relative bg-white rounded-2xl p-6 shadow-lg hover:shadow-2xl transition duration-300 border border-transparent hover:border-amber-200 overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-amber-50 to-transparent opacity-0 group-hover:opacity-100 transition duration-300"></div>
            <div className="relative z-10">
              <div className="flex items-center justify-between mb-4">
                <Sprout className="w-10 h-10 text-amber-500" />
                <span className="text-xs font-bold text-amber-600 bg-amber-100 px-3 py-1 rounded-full">{stats.totalArea}ac</span>
              </div>
              <p className="text-gray-600 text-sm font-medium mb-2">Total Farm Area</p>
              <p className="text-4xl font-bold text-gray-800">{stats.totalArea}</p>
              <p className="text-xs text-gray-500 mt-2">Acres cultivated</p>
            </div>
          </div>

          {/* Avg Health */}
          <div className="group relative bg-white rounded-2xl p-6 shadow-lg hover:shadow-2xl transition duration-300 border border-transparent hover:border-emerald-200 overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-emerald-50 to-transparent opacity-0 group-hover:opacity-100 transition duration-300"></div>
            <div className="relative z-10">
              <div className="flex items-center justify-between mb-4">
                <Activity className="w-10 h-10 text-emerald-500" />
                <span className={`text-xs font-bold px-3 py-1 rounded-full ${stats.avgHealth >= 70 ? "text-green-600 bg-green-100" : stats.avgHealth >= 50 ? "text-yellow-600 bg-yellow-100" : "text-red-600 bg-red-100"}`}>
                  {stats.avgHealth >= 70 ? "Excellent" : stats.avgHealth >= 50 ? "Good" : "Warning"}
                </span>
              </div>
              <p className="text-gray-600 text-sm font-medium mb-2">Average Health</p>
              <p className={`text-4xl font-bold ${stats.avgHealth >= 70 ? "text-green-600" : stats.avgHealth >= 50 ? "text-yellow-600" : "text-red-600"}`}>
                {stats.avgHealth}%
              </p>
              <p className="text-xs text-gray-500 mt-2">Overall farm health</p>
            </div>
          </div>

          {/* Active Pests */}
          <div className="group relative bg-white rounded-2xl p-6 shadow-lg hover:shadow-2xl transition duration-300 border border-transparent hover:border-red-200 overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-red-50 to-transparent opacity-0 group-hover:opacity-100 transition duration-300"></div>
            <div className="relative z-10">
              <div className="flex items-center justify-between mb-4">
                <AlertTriangle className="w-10 h-10 text-red-500" />
                <span className="text-xs font-bold text-red-600 bg-red-100 px-3 py-1 rounded-full">Alert</span>
              </div>
              <p className="text-gray-600 text-sm font-medium mb-2">Active Pest Issues</p>
              <p className="text-4xl font-bold text-red-600">{stats.totalPests}</p>
              <p className="text-xs text-gray-500 mt-2">Requiring attention</p>
            </div>
          </div>
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Growth Stages Distribution */}
          <div className="bg-white/80 backdrop-blur-xl rounded-3xl p-8 shadow-lg border border-white/20 hover:shadow-2xl transition">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-3 bg-gradient-to-br from-yellow-100 to-orange-100 rounded-lg">
                <PieChart className="w-6 h-6 text-yellow-600" />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-gray-800">Growth Stages</h3>
                <p className="text-sm text-gray-500">Distribution across stages</p>
              </div>
            </div>
            <div className="h-80">
              {growthStageData.labels.length > 0 ? (
                <Pie data={growthStageData} options={{ responsive: true, maintainAspectRatio: false, plugins: { legend: { position: "bottom", labels: { font: { size: 12, weight: 600 }, padding: 20 } } } }} />
              ) : (
                <div className="flex items-center justify-center h-full text-gray-500">No data available</div>
              )}
            </div>
          </div>

          {/* Crop Type Distribution */}
          <div className="bg-white/80 backdrop-blur-xl rounded-3xl p-8 shadow-lg border border-white/20 hover:shadow-2xl transition">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-3 bg-gradient-to-br from-purple-100 to-pink-100 rounded-lg">
                <PieChart className="w-6 h-6 text-purple-600" />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-gray-800">Crop Types</h3>
                <p className="text-sm text-gray-500">Variety in your farm</p>
              </div>
            </div>
            <div className="h-80">
              {cropTypeDistribution.labels.length > 0 ? (
                <Pie data={cropTypeDistribution} options={{ responsive: true, maintainAspectRatio: false, plugins: { legend: { position: "bottom", labels: { font: { size: 12, weight: 600 }, padding: 20 } } } }} />
              ) : (
                <div className="flex items-center justify-center h-full text-gray-500">No data available</div>
              )}
            </div>
          </div>
        </div>

        {/* Health Scores Chart */}
        <div className="bg-white/80 backdrop-blur-xl rounded-3xl p-8 shadow-lg border border-white/20 hover:shadow-2xl transition mb-8">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-3 bg-gradient-to-br from-green-100 to-emerald-100 rounded-lg">
              <BarChart3 className="w-6 h-6 text-green-600" />
            </div>
            <div>
              <h3 className="text-2xl font-bold text-gray-800">Field Health Scores</h3>
              <p className="text-sm text-gray-500">Individual field performance metrics</p>
            </div>
          </div>
          <div className="h-96">
            {healthScoreData.labels.length > 0 ? (
              <Bar data={healthScoreData} options={{
                responsive: true,
                maintainAspectRatio: false,
                plugins: { legend: { display: true, labels: { font: { size: 12, weight: 600 }, padding: 20 } } },
                scales: { 
                  y: { beginAtZero: true, max: 100, ticks: { font: { size: 11 }, stepSize: 20 } },
                  x: { ticks: { font: { size: 11 } } }
                }
              }} />
            ) : (
              <div className="flex items-center justify-center h-full text-gray-500">No data available</div>
            )}
          </div>
        </div>

        {/* Crop Summary Table */}
        <div className="bg-white/80 backdrop-blur-xl rounded-3xl p-8 shadow-lg border border-white/20 hover:shadow-2xl transition">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-3 bg-gradient-to-br from-blue-100 to-cyan-100 rounded-lg">
              <Shield className="w-6 h-6 text-blue-600" />
            </div>
            <div>
              <h3 className="text-2xl font-bold text-gray-800">Crop Summary</h3>
              <p className="text-sm text-gray-500">Detailed view of all crops</p>
            </div>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b-2 border-gray-200">
                  <th className="text-left py-4 px-4 font-bold text-gray-800">Field</th>
                  <th className="text-left py-4 px-4 font-bold text-gray-800">Crop Type</th>
                  <th className="text-left py-4 px-4 font-bold text-gray-800">Stage</th>
                  <th className="text-left py-4 px-4 font-bold text-gray-800">Health</th>
                  <th className="text-left py-4 px-4 font-bold text-gray-800">Area</th>
                  <th className="text-left py-4 px-4 font-bold text-gray-800">Est. Yield</th>
                  <th className="text-left py-4 px-4 font-bold text-gray-800">Issues</th>
                </tr>
              </thead>
              <tbody>
                {crops.slice(0, 10).map((crop, index) => (
                  <tr key={crop._id} className={`border-b border-gray-100 hover:bg-gradient-to-r hover:from-green-50 hover:to-emerald-50 transition ${index % 2 === 0 ? "bg-gray-50/30" : ""}`}>
                    <td className="py-4 px-4 font-semibold text-gray-800">{crop.field}</td>
                    <td className="py-4 px-4 text-gray-700">{crop.cropType}</td>
                    <td className="py-4 px-4">
                      <span className="inline-block px-4 py-2 bg-gradient-to-r from-blue-100 to-blue-200 text-blue-800 rounded-full text-xs font-bold">
                        {crop.growthStage}
                      </span>
                    </td>
                    <td className="py-4 px-4">
                      <div className="flex items-center gap-2">
                        <div className="w-full bg-gray-200 rounded-full h-2 max-w-xs">
                          <div
                            className={`h-2 rounded-full transition-all ${
                              crop.healthScore >= 70
                                ? "bg-gradient-to-r from-green-400 to-emerald-500"
                                : crop.healthScore >= 50
                                ? "bg-gradient-to-r from-yellow-400 to-amber-500"
                                : "bg-gradient-to-r from-red-400 to-red-500"
                            }`}
                            style={{ width: `${crop.healthScore}%` }}
                          ></div>
                        </div>
                        <span className={`text-xs font-bold ${crop.healthScore >= 70 ? "text-green-600" : crop.healthScore >= 50 ? "text-yellow-600" : "text-red-600"}`}>
                          {crop.healthScore}%
                        </span>
                      </div>
                    </td>
                    <td className="py-4 px-4 text-gray-700">{crop.area} ac</td>
                    <td className="py-4 px-4 font-semibold text-gray-800">{crop.estimatedYield}</td>
                    <td className="py-4 px-4">
                      <span className={`inline-block px-3 py-1 rounded-full text-xs font-bold ${
                        (crop.pestIssues?.filter(p => p.status === "active").length || 0) > 0
                          ? "bg-red-100 text-red-700"
                          : "bg-green-100 text-green-700"
                      }`}>
                        {(crop.pestIssues?.filter(p => p.status === "active").length || 0)} active
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Footer CTA */}
        <div className="mt-12 text-center">
          <div className="bg-gradient-to-r from-green-600 via-emerald-600 to-teal-600 rounded-3xl p-8 text-white shadow-xl">
            <Zap className="w-12 h-12 mx-auto mb-4" />
            <h3 className="text-2xl font-bold mb-2">Optimize Your Farm Today</h3>
            <p className="text-green-50 mb-6">Use these insights to make data-driven decisions and increase your crop yield</p>
            <button className="bg-white text-green-600 font-bold py-3 px-8 rounded-xl hover:bg-green-50 transition transform hover:scale-105">
              📊 View Detailed Reports
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
