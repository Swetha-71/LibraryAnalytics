// src/components/AdminDashboard.jsx
import React from "react";

const AdminDashboard = () => {
  return (
    <div style={{ padding: "24px" }}>
      <h2>Library Analytics – Staff View</h2>

      <div style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
        gap: "16px",
        marginTop: "16px"
      }}>
        <div className="card">
          <h3>Total Active Students</h3>
          <p>132</p>
        </div>
        <div className="card">
          <h3>Books Issued Today</h3>
          <p>47</p>
        </div>
        <div className="card">
          <h3>Overdue Books</h3>
          <p>19</p>
        </div>
        <div className="card">
          <h3>At‑risk Students (beta)</h3>
          <p>5 flagged this week</p>
        </div>
      </div>

      <div style={{ marginTop: "24px" }}>
        <h3>Recent Alerts</h3>
        <ul>
          <li>3 students have 3+ overdue books.</li>
          <li>2 books likely lost (overdue & not scanned).</li>
        </ul>
      </div>
    </div>
  );
};

export default AdminDashboard;
