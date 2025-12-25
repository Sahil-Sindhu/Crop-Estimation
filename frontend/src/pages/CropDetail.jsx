import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../context/AuthContext";
import { ArrowLeft, Activity, Bug, Leaf, TrendingUp } from "lucide-react";

export default function CropDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { token, user } = useAuth();
  const [crop, setCrop] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("overview");
  const [showPestForm, setShowPestForm] = useState(false);
  const [showActivityForm, setShowActivityForm] = useState(false);
  const [showHarvestForm, setShowHarvestForm] = useState(false);

  const [pestData, setPestData] = useState({ type: "", severity: "low", treatment: "" });
  const [activityData, setActivityData] = useState({ type: "inspection", notes: "" });
  const [harvestData, setHarvestData] = useState({ yield: "", quality: "good", notes: "" });

  useEffect(() => {
    async function loadCrop() {
      try {
        const headers = token ? { Authorization: `Bearer ${token}` } : {};
        const res = await axios.get(`http://localhost:5000/api/crops/${id}`, { headers });
        setCrop(res.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
    loadCrop();
  }, [id, token]);

  const handleAddPest = async (e) => {
    e.preventDefault();
    if (!pestData.type) return alert("Please enter pest type");
    
    try {
      const headers = { Authorization: `Bearer ${token}` };
      const res = await axios.post(
        `http://localhost:5000/api/crops/${id}/pest`,
        { ...pestData, userId: user._id },
        { headers }
      );
      setCrop(res.data);
      setPestData({ type: "", severity: "low", treatment: "" });
      setShowPestForm(false);
    } catch (err) {
      console.error("Pest error:", err.response?.data || err.message);
      alert(err.response?.data?.message || "Error adding pest issue");
    }
  };

  const handleAddActivity = async (e) => {
    e.preventDefault();
    try {
      const headers = { Authorization: `Bearer ${token}` };
      const res = await axios.post(
        `http://localhost:5000/api/crops/${id}/activity`,
        { ...activityData, performer: user.name },
        { headers }
      );
      setCrop(res.data);
      setActivityData({ type: "inspection", notes: "" });
      setShowActivityForm(false);
    } catch (err) {
      console.error("Activity error:", err.response?.data || err.message);
      alert(err.response?.data?.message || "Error logging activity");
    }
  };

  const handleHarvest = async (e) => {
    e.preventDefault();
    try {
      const headers = { Authorization: `Bearer ${token}` };
      const res = await axios.post(
        `http://localhost:5000/api/crops/${id}/harvest`,
        { actualYield: harvestData.yield, ...harvestData, userId: user._id },
        { headers }
      );
      setCrop(res.data.crop);
      setHarvestData({ yield: "", quality: "good", notes: "" });
      setShowHarvestForm(false);
      alert("Harvest recorded successfully!");
    } catch (err) {
      console.error("Harvest error:", err.response?.data || err.message);
      alert(err.response?.data?.message || "Error recording harvest");
    }
  };

  const handleDeleteCrop = async () => {
    if (!window.confirm("Are you sure you want to delete this crop? This action cannot be undone.")) {
      return;
    }
    try {
      const headers = { Authorization: `Bearer ${token}` };
      await axios.delete(`http://localhost:5000/api/crops/${id}`, { headers });
      alert("Crop deleted successfully!");
      navigate("/dashboard");
    } catch (err) {
      console.error(err);
      alert("Error deleting crop");
    }
  };

  if (loading) return <div className="p-8 text-center">Loading...</div>;
  if (!crop) return <div className="p-8 text-center text-red-600">Crop not found</div>;

  return (
    <div className="max-w-6xl mx-auto mt-8 px-4 pb-8">
      <button
        onClick={() => navigate("/dashboard")}
        className="flex items-center gap-2 text-blue-600 hover:text-blue-800 mb-4"
      >
        <ArrowLeft className="w-4 h-4" /> Back to Dashboard
      </button>

      {/* Header */}
      <div className="bg-white rounded-lg shadow p-6 mb-6">
        <div className="flex justify-between items-start mb-4">
          <div>
            <h1 className="text-3xl font-bold mb-2">{crop.field} - {crop.cropType}</h1>
          </div>
          <button
            onClick={handleDeleteCrop}
            className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 font-medium"
          >
            Delete Crop
          </button>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div>
            <p className="text-gray-600 text-sm">Growth Stage</p>
            <p className="text-lg font-semibold">{crop.growthStage}</p>
          </div>
          <div>
            <p className="text-gray-600 text-sm">Health Score</p>
            <p className={`text-lg font-semibold ${crop.healthScore >= 70 ? "text-green-600" : crop.healthScore >= 50 ? "text-yellow-600" : "text-red-600"}`}>
              {crop.healthScore}%
            </p>
          </div>
          <div>
            <p className="text-gray-600 text-sm">Area</p>
            <p className="text-lg font-semibold">{crop.area} acres</p>
          </div>
          <div>
            <p className="text-gray-600 text-sm">Est. Yield</p>
            <p className="text-lg font-semibold">{crop.estimatedYield} units</p>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 mb-4 border-b">
        {["overview", "activities", "pests", "harvest"].map(tab => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-4 py-2 font-medium transition ${
              activeTab === tab
                ? "border-b-2 border-green-600 text-green-600"
                : "text-gray-600 hover:text-gray-800"
            }`}
          >
            {tab.charAt(0).toUpperCase() + tab.slice(1)}
          </button>
        ))}
      </div>

      {/* Content */}
      <div className="bg-white rounded-lg shadow p-6">
        {activeTab === "overview" && (
          <div>
            <h3 className="text-lg font-semibold mb-4">Crop Information</h3>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-gray-600 text-sm">Planted</p>
                <p className="font-medium">{new Date(crop.plantingDate).toLocaleDateString()}</p>
              </div>
              <div>
                <p className="text-gray-600 text-sm">Soil Type</p>
                <p className="font-medium">{crop.soilType || "Not specified"}</p>
              </div>
              <div>
                <p className="text-gray-600 text-sm">Watering Frequency</p>
                <p className="font-medium">Every {crop.wateringFrequency || 3} days</p>
              </div>
              {crop.actualYield && (
                <div>
                  <p className="text-gray-600 text-sm">Actual Yield</p>
                  <p className="font-medium">{crop.actualYield} units</p>
                </div>
              )}
            </div>
          </div>
        )}

        {activeTab === "activities" && (
          <div>
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold">Activity Log</h3>
              <button
                onClick={() => setShowActivityForm(!showActivityForm)}
                className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
              >
                {showActivityForm ? "Cancel" : "Log Activity"}
              </button>
            </div>

            {showActivityForm && (
              <form onSubmit={handleAddActivity} className="mb-4 p-4 bg-gray-50 rounded">
                <div className="mb-3">
                  <label className="block text-sm font-medium mb-1">Activity Type</label>
                  <select
                    value={activityData.type}
                    onChange={(e) => setActivityData({ ...activityData, type: e.target.value })}
                    className="w-full border rounded px-3 py-2"
                  >
                    <option value="inspection">Inspection</option>
                    <option value="watering">Watering</option>
                    <option value="fertilizing">Fertilizing</option>
                    <option value="pesticide">Pesticide Application</option>
                  </select>
                </div>
                <div className="mb-3">
                  <label className="block text-sm font-medium mb-1">Notes</label>
                  <textarea
                    value={activityData.notes}
                    onChange={(e) => setActivityData({ ...activityData, notes: e.target.value })}
                    className="w-full border rounded px-3 py-2"
                    rows="3"
                  />
                </div>
                <button type="submit" className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700">
                  Log Activity
                </button>
              </form>
            )}

            <div className="space-y-3">
              {crop.activities && crop.activities.length > 0 ? (
                crop.activities.map((act, i) => (
                  <div key={i} className="border-l-4 border-blue-400 pl-4 py-2">
                    <p className="font-medium flex items-center gap-2">
                      <Activity className="w-4 h-4" />
                      {act.type.charAt(0).toUpperCase() + act.type.slice(1)}
                    </p>
                    <p className="text-sm text-gray-600">{act.notes}</p>
                    <p className="text-xs text-gray-500">{new Date(act.date).toLocaleString()}</p>
                  </div>
                ))
              ) : (
                <p className="text-gray-500">No activities logged yet</p>
              )}
            </div>
          </div>
        )}

        {activeTab === "pests" && (
          <div>
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold">Pest Management</h3>
              <button
                onClick={() => setShowPestForm(!showPestForm)}
                className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
              >
                {showPestForm ? "Cancel" : "Report Pest"}
              </button>
            </div>

            {showPestForm && (
              <form onSubmit={handleAddPest} className="mb-4 p-4 bg-gray-50 rounded">
                <div className="mb-3">
                  <label className="block text-sm font-medium mb-1">Pest Type</label>
                  <input
                    type="text"
                    value={pestData.type}
                    onChange={(e) => setPestData({ ...pestData, type: e.target.value })}
                    className="w-full border rounded px-3 py-2"
                    placeholder="e.g., Armyworm, Aphids"
                  />
                </div>
                <div className="mb-3">
                  <label className="block text-sm font-medium mb-1">Severity</label>
                  <select
                    value={pestData.severity}
                    onChange={(e) => setPestData({ ...pestData, severity: e.target.value })}
                    className="w-full border rounded px-3 py-2"
                  >
                    <option value="low">Low</option>
                    <option value="medium">Medium</option>
                    <option value="high">High</option>
                  </select>
                </div>
                <div className="mb-3">
                  <label className="block text-sm font-medium mb-1">Treatment</label>
                  <input
                    type="text"
                    value={pestData.treatment}
                    onChange={(e) => setPestData({ ...pestData, treatment: e.target.value })}
                    className="w-full border rounded px-3 py-2"
                    placeholder="Treatment plan"
                  />
                </div>
                <button type="submit" className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700">
                  Report Pest
                </button>
              </form>
            )}

            <div className="space-y-3">
              {crop.pestIssues && crop.pestIssues.length > 0 ? (
                crop.pestIssues.map((pest, i) => (
                  <div key={i} className={`p-3 rounded border-l-4 ${
                    pest.status === "active" ? "bg-red-50 border-red-400" : "bg-green-50 border-green-400"
                  }`}>
                    <p className="font-medium flex items-center gap-2">
                      <Bug className="w-4 h-4" />
                      {pest.type}
                    </p>
                    <p className="text-sm text-gray-600">Severity: {pest.severity} | Status: {pest.status}</p>
                    <p className="text-sm">Treatment: {pest.treatment}</p>
                    <p className="text-xs text-gray-500">{new Date(pest.dateReported).toLocaleString()}</p>
                  </div>
                ))
              ) : (
                <p className="text-gray-500">No pest issues reported</p>
              )}
            </div>
          </div>
        )}

        {activeTab === "harvest" && (
          <div>
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold">Harvest Records</h3>
              {crop.growthStage !== "Harvested" && (
                <button
                  onClick={() => setShowHarvestForm(!showHarvestForm)}
                  className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
                >
                  {showHarvestForm ? "Cancel" : "Record Harvest"}
                </button>
              )}
            </div>

            {showHarvestForm && (
              <form onSubmit={handleHarvest} className="mb-4 p-4 bg-gray-50 rounded">
                <div className="mb-3">
                  <label className="block text-sm font-medium mb-1">Yield (units)</label>
                  <input
                    type="number"
                    value={harvestData.yield}
                    onChange={(e) => setHarvestData({ ...harvestData, yield: e.target.value })}
                    className="w-full border rounded px-3 py-2"
                    required
                  />
                </div>
                <div className="mb-3">
                  <label className="block text-sm font-medium mb-1">Quality</label>
                  <select
                    value={harvestData.quality}
                    onChange={(e) => setHarvestData({ ...harvestData, quality: e.target.value })}
                    className="w-full border rounded px-3 py-2"
                  >
                    <option value="excellent">Excellent</option>
                    <option value="good">Good</option>
                    <option value="average">Average</option>
                    <option value="poor">Poor</option>
                  </select>
                </div>
                <div className="mb-3">
                  <label className="block text-sm font-medium mb-1">Notes</label>
                  <textarea
                    value={harvestData.notes}
                    onChange={(e) => setHarvestData({ ...harvestData, notes: e.target.value })}
                    className="w-full border rounded px-3 py-2"
                    rows="3"
                  />
                </div>
                <button type="submit" className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700">
                  Record Harvest
                </button>
              </form>
            )}

            {crop.harvestDate ? (
              <div className="p-4 bg-green-50 rounded border-l-4 border-green-400">
                <p className="font-medium flex items-center gap-2">
                  <TrendingUp className="w-4 h-4" />
                  Harvest Completed
                </p>
                <p className="text-sm text-gray-600">Date: {new Date(crop.harvestDate).toLocaleDateString()}</p>
                <p className="text-sm">Actual Yield: {crop.actualYield} units</p>
              </div>
            ) : (
              <p className="text-gray-500">No harvest recorded yet</p>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
