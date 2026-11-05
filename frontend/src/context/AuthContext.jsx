import { createContext, useContext, useEffect, useState } from "react";
import { authAPI } from "../services/api";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => JSON.parse(localStorage.getItem("cloudbite_user") || "null"));
  const [loading, setLoading] = useState(false);

  const login = async (email, password) => {
    setLoading(true);
    try {
      const { data } = await authAPI.login({ email, password });
      localStorage.setItem("cloudbite_token", data.token);
      localStorage.setItem("cloudbite_user", JSON.stringify(data.user));
      setUser(data.user);
      return data;
    } finally { setLoading(false); }
  };
  const register = async (payload) => {
    setLoading(true);
    try {
      const { data } = await authAPI.register(payload);
      localStorage.setItem("cloudbite_token", data.token);
      localStorage.setItem("cloudbite_user", JSON.stringify(data.user));
      setUser(data.user);
      return data;
    } finally { setLoading(false); }
  };
  const logout = () => {
    localStorage.removeItem("cloudbite_token");
    localStorage.removeItem("cloudbite_user");
    setUser(null);
  };
  useEffect(() => {
    const token = localStorage.getItem("cloudbite_token");
    if (!token) return;
    authAPI.me().then(({ data }) => {
      setUser(data.user);
      localStorage.setItem("cloudbite_user", JSON.stringify(data.user));
    }).catch(logout);
  }, []);
  return <AuthContext.Provider value={{ user, loading, login, register, logout }}>
    {children}
  </AuthContext.Provider>;
}
export const useAuth = () => useContext(AuthContext);
