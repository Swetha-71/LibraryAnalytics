import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider, useAuth } from "./context/AuthContext";
import AdminDashboard from "./components/AdminDashboard";
import StudentDashboard from "./components/StudentDashboard";
import Analytics from "./components/Analytics";
import Alerts from "./components/Alerts";
import Login from "./components/Login";
import Register from "./components/Register";
import "./styles/theme.css";
import "./styles/components.css";
import LoginActivity from "./components/LoginActivity"

const Navbar = () => {
  const { user, logout } = useAuth();
  return (
    <nav
      style={{
        background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
        padding: "1rem 0",
        boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
      }}
    >
      <div
        style={{
          maxWidth: "1200px",
          margin: "0 auto",
          padding: "0 20px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <div style={{ color: "white", fontSize: "24px", fontWeight: "bold" }}>
          📚 LibraryAnalytics
        </div>
        {user && (
          <div style={{ display: "flex", gap: "10px", alignItems: "center" }}>
            <span style={{ color: "white" }}>👋 {user.name}</span>
            <button
              onClick={logout}
              style={{
                background: "none",
                color: "white",
                border: "1px solid white",
                padding: "8px 16px",
                borderRadius: "20px",
                cursor: "pointer",
              }}
            >
              Logout
            </button>
          </div>
        )}
      </div>
    </nav>
  );
};

const ProtectedRoute = ({ children, allowedRoles = [] }) => {
  const { user, loading } = useAuth();
  if (loading) {
    return (
      <div style={{ padding: "50px", textAlign: "center" }}>Loading...</div>
    );
  }
  if (!user) return <Navigate to="/login" replace />;
  if (allowedRoles.length && !allowedRoles.includes(user.role)) {
    return <Navigate to="/login" replace />;
  }
  return children;
};

const RoleBasedHome = () => {
  const { user } = useAuth();
  if (!user) return <Navigate to="/login" replace />;
  if (user.role === "STUDENT") return <Navigate to="/student" replace />;
  return <Navigate to="/dashboard" replace />; // ADMIN or MANAGER
};

function AppContent() {
  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        backgroundColor: "#f8f9fa",
      }}
    >
      <Navbar />
      <div style={{ flex: 1, padding: "20px" }}>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          {/* home redirect based on role */}
          <Route
            path="/"
            element={
              <ProtectedRoute>
                <RoleBasedHome />
              </ProtectedRoute>
            }
          />

          {/* staff dashboard */}
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute allowedRoles={["ADMIN", "MANAGER"]}>
                <AdminDashboard />
              </ProtectedRoute>
            }
          />

          {/* student dashboard */}
          <Route
            path="/student"
            element={
              <ProtectedRoute allowedRoles={["STUDENT"]}>
                <StudentDashboard />
              </ProtectedRoute>
            }
          />

          {/* extra analytics pages for staff */}
          <Route
            path="/analytics"
            element={
              <ProtectedRoute allowedRoles={["ADMIN", "MANAGER"]}>
                <Analytics />
              </ProtectedRoute>
            }
          />
          <Route
            path="/alerts"
            element={
              <ProtectedRoute allowedRoles={["ADMIN", "MANAGER"]}>
                <Alerts />
              </ProtectedRoute>
            }
          />
          <Route
  path="/login-activity"
  element={
    <ProtectedRoute allowedRoles={["ADMIN"]}>
      <LoginActivity />
    </ProtectedRoute>
  }
/>
        </Routes>
      </div>
    </div>
  );
}

function App() {
  return (
    <Router>
      <AuthProvider>
        <AppContent />
      </AuthProvider>
    </Router>
  );
}

export default App;
