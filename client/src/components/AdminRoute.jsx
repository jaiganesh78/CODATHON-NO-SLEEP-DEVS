import { Navigate } from "react-router-dom";

export default function AdminRoute({ children }) {
  const isAdmin = localStorage.getItem("admin") === "true";

  if (!isAdmin) {
    return <Navigate to="/login" replace />;
  }

  return children;
}
