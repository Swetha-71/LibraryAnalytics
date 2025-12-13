import React, { createContext, useContext, useState, useEffect } from "react";
import { loginApi } from "../services/api";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // load saved user on refresh
  useEffect(() => {
    const saved = localStorage.getItem("la_user");
    if (saved) {
      setUser(JSON.parse(saved));
    }
    setLoading(false);
  }, []);

  const login = async (identifier, password) => {
  const res = await loginApi(identifier, password); // no try/catch for now
  // console.log to see exactly what backend returns
  console.log("loginApi response", res);
  if (!res.success) {
    return res;
  }
  const loggedInUser = {
    username: res.username,
    email: res.email,
    role: res.role,
  };
  setUser(loggedInUser);
  localStorage.setItem("la_user", JSON.stringify(loggedInUser));
  return { success: true, ...loggedInUser };
};


  const logout = () => {
    setUser(null);
    localStorage.removeItem("la_user");
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
