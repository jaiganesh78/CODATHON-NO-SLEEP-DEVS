import { createContext, useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { storage } from "../utils/storage";
import { getMe, loginUser } from "../api/auth.api";

export const AuthContext = createContext(null);

export default function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true); // checks auth on page refresh

  const loadUser = async () => {
    try {
      const token = storage.getToken();
      if (!token) {
        setUser(null);
        setLoading(false);
        return;
      }

      const data = await getMe();
      setUser(data.user);
    } catch (err) {
      storage.removeToken();
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadUser();
  }, []);

  const login = async ({ email, password }) => {
    const data = await loginUser({ email, password });

    storage.setToken(data.token);
    setUser(data.user);

    toast.success("Logged in ✅");
    return data;
  };

  const logout = () => {
    storage.removeToken();
    setUser(null);
    toast.success("Logged out ✅");
  };

  const value = {
    user,
    loading,
    login,
    logout,
    loadUser,
    isLoggedIn: !!user,
    isAdmin: user?.role === "admin",
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
