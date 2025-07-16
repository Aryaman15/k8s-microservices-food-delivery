// src/components/ProtectedRoute.jsx
import { useContext } from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContext";

const ProtectedRoute = () => {
  const { user, loading } = useContext(AuthContext);
  const location = useLocation();

  if (loading) {
    // still hydrating from localStorage
    return <div className="p-8 text-center">Loading…</div>;
  }

  if (!user) {
    // not logged in → send to login
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // logged in → render nested routes
  return <Outlet />;
};

export default ProtectedRoute;
