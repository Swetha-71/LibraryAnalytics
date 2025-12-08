// src/components/StudentDashboard.jsx
import React from "react";

const StudentDashboard = () => {
  return (
    <div style={{ padding: "24px" }}>
      <h2>Your Library Activity</h2>

      <div style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
        gap: "16px",
        marginTop: "16px"
      }}>
        <div className="card">
          <h3>Books Currently Issued</h3>
          <p>2</p>
        </div>
        <div className="card">
          <h3>Overdue Books</h3>
          <p>0</p>
        </div>
        <div className="card">
          <h3>Total Books Read</h3>
          <p>18</p>
        </div>
      </div>

      <div style={{ marginTop: "24px" }}>
        <h3>Suggestions</h3>
        <ul>
          <li>Borrow at least one book from your current semester subjects.</li>
          <li>See what your classmates are reading (coming soon).</li>
        </ul>
      </div>
    </div>
  );
};

export default StudentDashboard;
