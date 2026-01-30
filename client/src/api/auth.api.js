import { api } from "./axios";

export const registerUser = async (payload) => {
  const res = await api.post("/api/auth/register", payload);
  return res.data;
};

export const loginUser = async (payload) => {
  const res = await api.post("/api/auth/login", payload);
  return res.data;
};

export const getMe = async () => {
  const res = await api.get("/api/user/me");
  return res.data;
};

export const forgotPassword = async (payload) => {
  const res = await api.post("/api/auth/forgot-password", payload);
  return res.data;
};

export const resetPassword = async (payload) => {
  const res = await api.post("/api/auth/reset-password", payload);
  return res.data;
};

// ✅ Admin test route
export const getAdminDashboard = async () => {
  const res = await api.get("/api/admin/dashboard");
  return res.data;
};
export const googleLogin = async (credential) => {
  const res = await api.post("/api/auth/google", { credential });
  return res.data;
};
