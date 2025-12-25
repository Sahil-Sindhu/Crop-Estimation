import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function AddCrop() {
  const navigate = useNavigate();
  const { token, user } = useAuth();

  const [form, setForm] = useState({
    field: "",
    cropType: "",
    plantingDate: "",
    area: "",
    soilType: "loamy",
    wateringFrequency: "3"
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  function update(e) {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
  }

  async function submit(e) {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const headers = token ? { Authorization: `Bearer ${token}` } : {};
      await axios.post("http://localhost:5000/api/crops", {
        field: form.field,
        cropType: form.cropType,
        plantingDate: form.plantingDate,
        area: Number(form.area || 0),
        soilType: form.soilType,
        wateringFrequency: Number(form.wateringFrequency || 3),
        userId: user._id
      }, { headers });

      // success - go to dashboard
      navigate("/dashboard");
    } catch (err) {
      console.error(err);
      setError(err?.response?.data?.message || "Error saving crop");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="max-w-3xl mx-auto mt-10 p-6 bg-white rounded-lg shadow">
      <h2 className="text-2xl font-semibold mb-4">Add a new crop</h2>

      {error && <div className="mb-4 p-3 bg-red-50 text-red-700 rounded">{error}</div>}

      <form onSubmit={submit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="text-sm text-gray-600">Field name *</label>
          <input
            name="field"
            value={form.field}
            onChange={update}
            required
            className="mt-2 w-full border rounded p-2"
            placeholder="e.g., North plot"
          />
        </div>

        <div>
          <label className="text-sm text-gray-600">Crop type *</label>
          <select
            name="cropType"
            value={form.cropType}
            onChange={update}
            required
            className="mt-2 w-full border rounded p-2"
          >
            <option value="">Select crop type</option>
            <option value="Wheat">Wheat</option>
            <option value="Rice">Rice</option>
            <option value="Corn">Corn</option>
            <option value="Tomato">Tomato</option>
            <option value="Potato">Potato</option>
            <option value="Soybean">Soybean</option>
            <option value="Other">Other</option>
          </select>
        </div>

        <div>
          <label className="text-sm text-gray-600">Planting date *</label>
          <input
            name="plantingDate"
            value={form.plantingDate}
            onChange={update}
            required
            type="date"
            className="mt-2 w-full border rounded p-2"
          />
        </div>

        <div>
          <label className="text-sm text-gray-600">Area (acres) *</label>
          <input
            name="area"
            value={form.area}
            onChange={update}
            required
            type="number"
            step="0.1"
            className="mt-2 w-full border rounded p-2"
            placeholder="e.g., 2.5"
          />
        </div>

        <div>
          <label className="text-sm text-gray-600">Soil Type</label>
          <select
            name="soilType"
            value={form.soilType}
            onChange={update}
            className="mt-2 w-full border rounded p-2"
          >
            <option value="loamy">Loamy</option>
            <option value="sandy">Sandy</option>
            <option value="clayey">Clayey</option>
            <option value="silty">Silty</option>
          </select>
        </div>

        <div>
          <label className="text-sm text-gray-600">Watering Frequency (days)</label>
          <input
            name="wateringFrequency"
            value={form.wateringFrequency}
            onChange={update}
            type="number"
            min="1"
            className="mt-2 w-full border rounded p-2"
            placeholder="3"
          />
        </div>

        <div className="md:col-span-2">
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-green-600 text-white py-2 rounded font-medium hover:bg-green-700 disabled:opacity-50"
          >
            {loading ? "Adding..." : "Add Crop"}
          </button>
        </div>
      </form>
    </div>
  );
}
