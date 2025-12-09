// frontend/src/context/AuthContext.js
import React, { createContext, useState, useContext, useEffect } from "react";

const AuthContext = createContext();
export const useAuth = () => useContext(AuthContext);

const API_URL = "http://localhost:8080/api";

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const storedUser = localStorage.getItem("user");
    return storedUser ? JSON.parse(storedUser) : null;
  });
const login = async (identifier, password) => {
  try {
    const response = await fetch(`${API_URL}/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ identifier, password }),
    });

    console.log("Login status:", response.status);

    const data = await response.json().catch(() => {
      console.error("Failed to parse JSON");
      return { success: false, message: "Bad response from server" };
    });

    console.log("Login data:", data);

    if (data.success) {
      setUser(data);
      localStorage.setItem("user", JSON.stringify(data));
    }

    return data;
  } catch (err) {
    console.error("Login failed:", err);
    return { success: false, message: "Login error" };
  }
};

 // AuthContext.js
const logout = () => {
  localStorage.removeItem("user");
  setUser(null);
  window.location.href = "/login";
};

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
