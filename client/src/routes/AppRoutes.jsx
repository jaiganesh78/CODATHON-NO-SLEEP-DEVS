import { Routes, Route, Navigate } from "react-router-dom";

import ProtectedRoute from "../components/ProtectedRoute";
import AdminRoute from "../components/AdminRoute";
import DepartmentDashboard from "../pages/department/DepartmentDashboard.jsx";

import DepartmentRoute from "../components/DepartmentRoute";
import Login from "../pages/auth/Login";
import Register from "../pages/auth/Register";
import ForgotPassword from "../pages/auth/ForgotPassword";
import ResetPassword from "../pages/auth/ResetPassword";
import Dashboard from "../pages/dashboard/Dashboard";
import Account from "../pages/account/Account";
import AdminDashboard from "../pages/admin/AdminDashboard";
import CreateIssue from "../pages/issues/CreateIssue";
import LiveMap from "../pages/map/LiveMap";

import IssueFeed from "../pages/issues/IssueFeed";

export default function AppRoutes() {
  return (
    <Routes>
      {/* Public */}
      <Route path="/" element={<Navigate to="/login" replace />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />
      <Route path="/reset-password" element={<ResetPassword />} />
      <Route path="/map" element={<LiveMap />} />

      

      {/* Protected */}
      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        }
      />

      {/* Issues Feed */}
      <Route
        path="/issues"
        element={
          <ProtectedRoute>
            <IssueFeed />
          </ProtectedRoute>
        }
      />
<Route
  path="/department/dashboard"
  element={
    <DepartmentRoute>
      <DepartmentDashboard />
    </DepartmentRoute>
  }
/>


      {/* Create Issue */}
      <Route
        path="/issues/new"
        element={
          <ProtectedRoute>
            <CreateIssue />
          </ProtectedRoute>
        }
      />


      <Route
        path="/account"
        element={
          <ProtectedRoute>
            <Account />
          </ProtectedRoute>
        }
      />

      {/* Admin */}
      <Route
        path="/admin/dashboard"
        element={
          <AdminRoute>
            <AdminDashboard />
          </AdminRoute>
        }
      />

      {/* Fallback */}
      <Route path="*" element={<Navigate to="/login" replace />} />
    </Routes>
  );
}
