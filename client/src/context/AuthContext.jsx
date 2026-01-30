import { createContext, useEffect, useState } from "react";
import { storage } from "../utils/storage";
import { getMe, loginUser } from "../api/auth.api";
import { toast } from "react-hot-toast";

export const AuthContext = createContext(null);

export default function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Load user on refresh
  const loadUser = async () => {
    try {
      const token = storage.getToken();
      if (!token) {
        setUser(null);
        setLoading(false);
        return;
      }

      const res = await getMe();
      setUser(res.user);
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

  const login = async (data) => {
    const res = await loginUser(data);
    storage.setToken(res.token);
    setUser(res.user);
    return res;
  };

  const logout = () => {
    storage.removeToken();
    setUser(null);
    window.location.href = "/login";
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        login,
        logout,
        isLoggedIn: !!user,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
