import { useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "../context/AuthContext";
import { AlertCircle, CheckCircle, Clock } from "lucide-react";

export default function Alerts() {
  const { token, user } = useAuth();
  const [alerts, setAlerts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("all"); // all, unread, resolved

  useEffect(() => {
    if (!user) return;
    
    async function loadAlerts() {
      setLoading(true);
      try {
        const headers = token ? { Authorization: `Bearer ${token}` } : {};
        const res = await axios.get(`http://localhost:5000/api/alerts/user/${user._id}`, { headers });
        setAlerts(res.data || []);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }

    loadAlerts();
  }, [token, user]);

  const filteredAlerts = alerts.filter(alert => {
    if (filter === "unread") return !alert.isRead;
    if (filter === "resolved") return alert.resolvedAt;
    return true;
  });

  const handleMarkAsRead = async (alertId) => {
    try {
      const headers = { Authorization: `Bearer ${token}` };
      await axios.put(`http://localhost:5000/api/alerts/${alertId}/read`, {}, { headers });
      setAlerts(alerts.map(a => a._id === alertId ? { ...a, isRead: true } : a));
    } catch (err) {
      console.error(err);
    }
  };

  const getSeverityColor = (severity) => {
    const colors = {
      low: "bg-blue-100 text-blue-800 border-blue-300",
      medium: "bg-yellow-100 text-yellow-800 border-yellow-300",
      high: "bg-red-100 text-red-800 border-red-300"
    };
    return colors[severity] || colors.low;
  };

  const getIcon = (type) => {
    if (type.includes("pest")) return <AlertCircle className="w-5 h-5" />;
    if (type.includes("harvest")) return <CheckCircle className="w-5 h-5" />;
    return <Clock className="w-5 h-5" />;
  };

  return (
    <div className="max-w-4xl mx-auto mt-8 px-4 pb-8">
      <div className="mb-6">
        <h2 className="text-2xl font-semibold mb-4">Alerts & Notifications</h2>
        
        <div className="flex gap-2 mb-4">
          {["all", "unread", "resolved"].map(f => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-4 py-2 rounded-lg font-medium transition ${
                filter === f
                  ? "bg-green-600 text-white"
                  : "bg-gray-200 text-gray-700 hover:bg-gray-300"
              }`}
            >
              {f.charAt(0).toUpperCase() + f.slice(1)}
            </button>
          ))}
        </div>
      </div>

      {loading ? (
        <div className="p-8 bg-white rounded shadow text-center">Loading alerts...</div>
      ) : filteredAlerts.length === 0 ? (
        <div className="p-8 bg-white rounded shadow text-center text-gray-500">
          No alerts to display
        </div>
      ) : (
        <div className="space-y-4">
          {filteredAlerts.map(alert => (
            <div
              key={alert._id}
              className={`p-4 rounded-lg border-l-4 ${getSeverityColor(alert.severity)} ${
                !alert.isRead ? "border-2" : ""
              }`}
            >
              <div className="flex items-start justify-between">
                <div className="flex items-start gap-3 flex-1">
                  {getIcon(alert.type)}
                  <div>
                    <h3 className="font-semibold">{alert.title}</h3>
                    <p className="text-sm mt-1">{alert.message}</p>
                    {alert.actionTaken && (
                      <p className="text-xs mt-2 italic">Action: {alert.actionTaken}</p>
                    )}
                    <p className="text-xs mt-2">
                      {new Date(alert.createdAt).toLocaleString()}
                    </p>
                  </div>
                </div>
                {!alert.isRead && (
                  <button
                    onClick={() => handleMarkAsRead(alert._id)}
                    className="px-3 py-1 text-sm bg-gray-600 text-white rounded hover:bg-gray-700"
                  >
                    Mark Read
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
