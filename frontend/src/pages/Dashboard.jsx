import { useEffect, useState, useMemo } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../context/AuthContext";
import { Chart as ChartJS, BarElement, CategoryScale, LinearScale, Tooltip, Legend } from "chart.js";
import { Bar } from "react-chartjs-2";
import { AlertCircle, TrendingUp, Activity } from "lucide-react";

ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);

function GrowthBadge({ stage }) {
  const map = {
    "Early Stage": "bg-yellow-100 text-yellow-800",
    "Mid Stage": "bg-blue-100 text-blue-800",
    "Late Stage": "bg-green-100 text-green-800",
    "Ready for Harvest": "bg-purple-100 text-purple-800",
    "Harvested": "bg-gray-100 text-gray-800"
  };
  const cls = map[stage] || "bg-gray-100 text-gray-800";
  return <span className={`px-2 py-1 rounded-full text-xs font-medium ${cls}`}>{stage}</span>;
}

export default function Dashboard() {
  const { token, user } = useAuth();
  const [crops, setCrops] = useState([]);
  const [alerts, setAlerts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState("");

  useEffect(() => {
    async function load() {
      setLoading(true);
      try {
        const headers = token ? { Authorization: `Bearer ${token}` } : {};
        const [cropsRes, alertsRes] = await Promise.all([
          axios.get("http://localhost:5000/api/crops", { headers }),
          user ? axios.get(`http://localhost:5000/api/alerts/user/${user._id}`, { headers }) : Promise.resolve({ data: [] })
        ]);
        setCrops(cropsRes.data || []);
        setAlerts(alertsRes.data || []);
      } catch (e) {
        console.error(e);
        setErr("Unable to load data");
      } finally {
        setLoading(false);
      }
    }
    load();
  }, [token, user]);

  const stats = useMemo(() => {
    const activeCrops = crops.filter(c => c.growthStage !== "Harvested").length;
    const healthyCount = crops.filter(c => c.healthScore >= 70).length;
    const unreadAlerts = alerts.filter(a => !a.isRead).length;
    const totalPests = crops.reduce((sum, c) => sum + (c.pestIssues?.filter(p => p.status === "active").length || 0), 0);
    return { activeCrops, healthyCount, unreadAlerts, totalPests };
  }, [crops, alerts]);

  const chartData = useMemo(() => {
    const labels = crops.slice(0, 8).map(c => c.field);
    const data = crops.slice(0, 8).map(c => c.estimatedYield ?? 0);
    return {
      labels,
      datasets: [
        {
          label: "Estimated Yield",
          data,
          backgroundColor: "#10b981",
          borderColor: "#059669",
          borderWidth: 1,
        }
      ]
    };
  }, [crops]);

  return (
    <div className="max-w-7xl mx-auto mt-8 px-4 pb-8">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-3xl font-bold">Dashboard</h2>
        <Link to="/add-crop" className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700">
          + Add Crop
        </Link>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <div className="bg-white rounded-lg p-4 shadow">
          <p className="text-gray-600 text-sm">Total Crops</p>
          <p className="text-3xl font-bold">{crops.length}</p>
          <p className="text-xs text-gray-500">{stats.activeCrops} active</p>
        </div>
        <div className="bg-white rounded-lg p-4 shadow">
          <p className="text-gray-600 text-sm">Healthy Crops</p>
          <p className="text-3xl font-bold text-green-600">{stats.healthyCount}</p>
          <p className="text-xs text-gray-500">{Math.round((stats.healthyCount / crops.length) * 100) || 0}% of total</p>
        </div>
        <div className="bg-white rounded-lg p-4 shadow">
          <p className="text-gray-600 text-sm">Active Issues</p>
          <p className="text-3xl font-bold text-red-600">{stats.totalPests}</p>
          <p className="text-xs text-gray-500">pests detected</p>
        </div>
        <div className="bg-white rounded-lg p-4 shadow">
          <p className="text-gray-600 text-sm">Notifications</p>
          <p className="text-3xl font-bold text-blue-600">{stats.unreadAlerts}</p>
          <Link to="/alerts" className="text-xs text-blue-600 hover:text-blue-800">View all</Link>
        </div>
      </div>

      {/* Alerts */}
      {stats.unreadAlerts > 0 && (
        <div className="mb-6 bg-blue-50 border border-blue-200 rounded-lg p-4">
          <div className="flex items-start gap-3">
            <AlertCircle className="w-5 h-5 text-blue-600 mt-0.5" />
            <div>
              <p className="font-medium text-blue-900">You have {stats.unreadAlerts} unread notification{stats.unreadAlerts !== 1 ? 's' : ''}</p>
              <Link to="/alerts" className="text-sm text-blue-600 hover:text-blue-800">Check alerts →</Link>
            </div>
          </div>
        </div>
      )}

      {loading ? (
        <div className="p-8 bg-white rounded shadow text-center">Loading...</div>
      ) : err ? (
        <div className="p-8 bg-red-50 rounded shadow text-center text-red-600">{err}</div>
      ) : crops.length === 0 ? (
        <div className="p-12 bg-white rounded shadow text-center">
          <p className="text-gray-600 mb-4">No crops yet. Start by adding your first crop!</p>
          <Link to="/add-crop" className="inline-block bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700">
            Add Your First Crop
          </Link>
        </div>
      ) : (
        <>
          {/* Crops Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            {crops.map(crop => (
              <Link key={crop._id} to={`/crop/${crop._id}`}>
                <div className="bg-white rounded-lg p-5 shadow hover:shadow-lg transition cursor-pointer h-full">
                  <div className="flex justify-between items-start mb-3">
                    <div>
                      <h3 className="text-lg font-bold">{crop.field}</h3>
                      <p className="text-sm text-gray-600">{crop.cropType}</p>
                    </div>
                    <GrowthBadge stage={crop.growthStage} />
                  </div>

                  <div className="grid grid-cols-2 gap-2 mb-4">
                    <div className="bg-gradient-to-br from-green-50 to-green-100 p-3 rounded">
                      <div className="text-xs text-gray-600">Health</div>
                      <div className={`text-2xl font-bold ${crop.healthScore >= 70 ? "text-green-600" : crop.healthScore >= 50 ? "text-yellow-600" : "text-red-600"}`}>
                        {crop.healthScore}%
                      </div>
                    </div>
                    <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-3 rounded">
                      <div className="text-xs text-gray-600">Est. Yield</div>
                      <div className="text-2xl font-bold text-blue-600">{crop.estimatedYield}</div>
                    </div>
                  </div>

                  {crop.pestIssues?.filter(p => p.status === "active").length > 0 && (
                    <div className="mb-3 text-xs bg-red-50 text-red-700 p-2 rounded flex items-center gap-1">
                      <AlertCircle className="w-3 h-3" />
                      {crop.pestIssues.filter(p => p.status === "active").length} active issues
                    </div>
                  )}

                  <div className="flex justify-between items-center text-xs text-gray-500">
                    <span>Planted: {new Date(crop.plantingDate).toLocaleDateString()}</span>
                    <Activity className="w-4 h-4" />
                  </div>
                </div>
              </Link>
            ))}
          </div>

          {/* Chart */}
          <div className="bg-white rounded-lg p-6 shadow">
            <div className="flex justify-between items-center mb-4">
              <h4 className="text-lg font-semibold flex items-center gap-2">
                <TrendingUp className="w-5 h-5" /> Estimated Yield Comparison
              </h4>
              <Link to="/analytics" className="text-sm text-blue-600 hover:text-blue-800">View full analytics →</Link>
            </div>
            {crops.length ? (
              <Bar data={chartData} options={{
                responsive: true,
                plugins: { legend: { display: true } },
                scales: { y: { beginAtZero: true } }
              }} />
            ) : (
              <div className="text-gray-500 p-6">No data to display yet</div>
            )}
          </div>
        </>
      )}
    </div>
  );
}
