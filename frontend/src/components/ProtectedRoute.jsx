import { useContext, useEffect } from "react";
import { AuthContext } from "../contexts/AuthContext";
import { useNavigate, Outlet } from "react-router-dom";

const ProtectedRoute = () => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      alert("Please log in or sign up to continue."); // simple flash
      navigate("/login", { replace: true });
    }
  }, [user, navigate]);

  // If user is logged in, render the child route(s)
  return user ? <Outlet /> : null;
};

export default ProtectedRoute;
