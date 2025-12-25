import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Landing from "./pages/LandingNew";
import Recommendations from "./pages/Recommendations";
import Weather from "./pages/Weather";
import Dashboard from "./pages/Dashboard";
import AddCrop from "./pages/AddCrop";
import CropDetail from "./pages/CropDetail";
import Alerts from "./pages/Alerts";
import Analytics from "./pages/Analytics";
import ProtectedRoute from "./components/ProtectedRoute";
import RedirectIfAuth from "./components/RedirectIfAuth";

function AppContent() {
  return (
    <>
      <Navbar />

      <Routes>
        <Route path="/" element={<Landing />} />

        {/* Public pages but blocked for logged-in users */}
        <Route
          path="/login"
          element={
            <RedirectIfAuth>
              <Login />
            </RedirectIfAuth>
          }
        />
        <Route
          path="/register"
          element={
            <RedirectIfAuth>
              <Register />
            </RedirectIfAuth>
          }
        />

        {/* Protected pages */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/add-crop"
          element={
            <ProtectedRoute>
              <AddCrop />
            </ProtectedRoute>
          }
        />

        <Route
          path="/crop/:id"
          element={
            <ProtectedRoute>
              <CropDetail />
            </ProtectedRoute>
          }
        />

        <Route
          path="/alerts"
          element={
            <ProtectedRoute>
              <Alerts />
            </ProtectedRoute>
          }
        />

        <Route
          path="/analytics"
          element={
            <ProtectedRoute>
              <Analytics />
            </ProtectedRoute>
          }
        />

        <Route
          path="/recommendations"
          element={
            <ProtectedRoute>
              <Recommendations />
            </ProtectedRoute>
          }
        />

        <Route
          path="/weather"
          element={
            <ProtectedRoute>
              <Weather />
            </ProtectedRoute>
          }
        />
      </Routes>

      <Footer />
    </>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <AppContent />
      </AuthProvider>
    </BrowserRouter>
  );
}
