import { Link, NavLink, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { LogOut, Bell, BarChart3, Lightbulb, Cloud } from "lucide-react";
import { useState } from "react";

export default function Navbar() {
  const { token, logout } = useAuth();
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const hiddenRoutes = ["/login", "/register"];
  if (hiddenRoutes.includes(location.pathname)) return null;

  return (
    <nav className="bg-white/70 backdrop-blur-md shadow-sm px-8 py-4 border-b border-gray-200">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold flex items-center gap-2">
          <span className="w-10 h-10 rounded-xl bg-gradient-to-br from-green-500 to-green-600 text-white flex items-center justify-center text-lg">
            🌾
          </span>
          <span className="text-green-700">CropVision</span>
        </Link>

        {token ? (
          <>
            {/* Desktop Menu */}
            <div className="hidden md:flex items-center gap-2">
              <NavLink
                to="/dashboard"
                className={({ isActive }) =>
                  `text-sm font-medium px-3 py-2 rounded-lg transition ${
                    isActive
                      ? "text-green-700 bg-green-100"
                      : "text-gray-600 hover:text-green-700"
                  }`
                }
              >
                Dashboard
              </NavLink>

              <NavLink
                to="/recommendations"
                className={({ isActive }) =>
                  `text-sm font-medium px-3 py-2 rounded-lg flex items-center gap-1 transition ${
                    isActive
                      ? "text-green-700 bg-green-100"
                      : "text-gray-600 hover:text-green-700"
                  }`
                }
              >
                <Lightbulb size={16} /> Recommendations
              </NavLink>

              <NavLink
                to="/weather"
                className={({ isActive }) =>
                  `text-sm font-medium px-3 py-2 rounded-lg flex items-center gap-1 transition ${
                    isActive
                      ? "text-green-700 bg-green-100"
                      : "text-gray-600 hover:text-green-700"
                  }`
                }
              >
                <Cloud size={16} /> Weather
              </NavLink>

              <NavLink
                to="/analytics"
                className={({ isActive }) =>
                  `text-sm font-medium px-3 py-2 rounded-lg flex items-center gap-1 transition ${
                    isActive
                      ? "text-green-700 bg-green-100"
                      : "text-gray-600 hover:text-green-700"
                  }`
                }
              >
                <BarChart3 size={16} /> Analytics
              </NavLink>

              <NavLink
                to="/alerts"
                className={({ isActive }) =>
                  `text-sm font-medium px-3 py-2 rounded-lg flex items-center gap-1 transition ${
                    isActive
                      ? "text-green-700 bg-green-100"
                      : "text-gray-600 hover:text-green-700"
                  }`
                }
              >
                <Bell size={16} /> Alerts
              </NavLink>

              <NavLink
                to="/add-crop"
                className={({ isActive }) =>
                  `text-sm font-medium px-3 py-2 rounded-lg transition ${
                    isActive
                      ? "text-green-700 bg-green-100"
                      : "text-gray-600 hover:text-green-700"
                  }`
                }
              >
                + Add Crop
              </NavLink>

              <button
                onClick={logout}
                className="flex items-center gap-2 px-4 py-2 bg-red-100 text-red-600 rounded-lg hover:bg-red-200 transition ml-2"
              >
                <LogOut size={16} /> Logout
              </button>
            </div>

            {/* Mobile Menu Button */}
            <button
              className="md:hidden text-gray-600"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              ☰
            </button>
          </>
        ) : (
          <div className="flex items-center gap-4">
            <Link
              to="/login"
              className="px-4 py-2 rounded-lg bg-green-600 text-white hover:bg-green-700 font-medium text-sm"
            >
              Login
            </Link>
            <Link
              to="/register"
              className="px-4 py-2 rounded-lg bg-gray-200 text-gray-700 hover:bg-gray-300 font-medium text-sm"
            >
              Sign Up
            </Link>
          </div>
        )}
      </div>

      {/* Mobile Menu */}
      {token && mobileMenuOpen && (
        <div className="md:hidden mt-4 space-y-2">
          <NavLink
            to="/dashboard"
            className="block px-4 py-2 text-gray-600 hover:text-green-700 rounded-lg"
            onClick={() => setMobileMenuOpen(false)}
          >
            Dashboard
          </NavLink>
          <NavLink
            to="/recommendations"
            className="block px-4 py-2 text-gray-600 hover:text-green-700 rounded-lg"
            onClick={() => setMobileMenuOpen(false)}
          >
            Recommendations
          </NavLink>
          <NavLink
            to="/weather"
            className="block px-4 py-2 text-gray-600 hover:text-green-700 rounded-lg"
            onClick={() => setMobileMenuOpen(false)}
          >
            Weather
          </NavLink>
          <NavLink
            to="/analytics"
            className="block px-4 py-2 text-gray-600 hover:text-green-700 rounded-lg"
            onClick={() => setMobileMenuOpen(false)}
          >
            Analytics
          </NavLink>
          <NavLink
            to="/alerts"
            className="block px-4 py-2 text-gray-600 hover:text-green-700 rounded-lg"
            onClick={() => setMobileMenuOpen(false)}
          >
            Alerts
          </NavLink>
          <NavLink
            to="/add-crop"
            className="block px-4 py-2 text-gray-600 hover:text-green-700 rounded-lg"
            onClick={() => setMobileMenuOpen(false)}
          >
            + Add Crop
          </NavLink>
        </div>
      )}
    </nav>
  );
}
