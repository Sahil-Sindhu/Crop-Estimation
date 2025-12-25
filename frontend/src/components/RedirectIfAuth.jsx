import { useAuth } from "../context/AuthContext";
import { Navigate } from "react-router-dom";

export default function RedirectIfAuth({ children }) {
  const { token } = useAuth();

  if (token) return <Navigate to="/dashboard" />;
  return children;
}

