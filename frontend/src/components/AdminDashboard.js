// src/components/AdminDashboard.jsx
import React from "react";
import { useNavigate } from "react-router-dom";

const AdminDashboard = () => {
  const navigate = useNavigate();

  const cardStyle = {
    padding: "16px",
    borderRadius: "12px",
    background: "white",
    boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
    cursor: "pointer",
  };

  return (
    <div style={{ padding: "24px" }}>
      <h2>Library Analytics – Staff View</h2>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
          gap: "16px",
          marginTop: "16px",
        }}
      >
        <div style={cardStyle} onClick={() => navigate("/analytics")}>
          <h3>Usage Analytics</h3>
          <p>Open detailed charts.</p>
        </div>

        <div style={cardStyle} onClick={() => navigate("/alerts")}>
          <h3>Alerts</h3>
          <p>View at‑risk students & lost books.</p>
        </div>

        <div style={cardStyle} onClick={() => navigate("/login-activity")}>
          <h3>Login Activity</h3>
          <p>Monitor student logins.</p>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
