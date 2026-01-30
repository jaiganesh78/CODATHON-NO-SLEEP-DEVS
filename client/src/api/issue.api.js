import { api } from "./axios";

// Create new complaint
export const createIssue = async (data) => {
  const res = await api.post("/api/issues", data);
  return res.data;
};

// Get user's complaints
export const getMyIssues = async () => {
  const res = await api.get("/api/issues/my");
  return res.data;
};
