import { Navigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import Loader from "./Loader";

export default function AdminRoute({ children }) {
  const { isLoggedIn, isAdmin, loading } = useAuth();

  if (loading) return <Loader text="Checking admin access..." />;

  if (!isLoggedIn) return <Navigate to="/admin/login" replace />;

  if (!isAdmin) return <Navigate to="/dashboard" replace />;

  return children;
}
