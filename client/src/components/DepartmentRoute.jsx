import { Navigate } from "react-router-dom";

export default function DepartmentRoute({ children }) {
  const role = localStorage.getItem("role");

  if (role !== "department") {
    return <Navigate to="/login" replace />;
  }

  return children;
}
