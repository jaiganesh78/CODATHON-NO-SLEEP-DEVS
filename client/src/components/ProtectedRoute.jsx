import { Navigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import Loader from "./Loader";

export default function ProtectedRoute({ children }) {
  const { isLoggedIn, loading } = useAuth();

  if (loading) return <Loader text="Checking login..." />;

  if (!isLoggedIn) return <Navigate to="/login" replace />;

  return children;
}
