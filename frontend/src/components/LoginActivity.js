// src/components/LoginActivity.jsx
import React, { useEffect, useState } from "react";

const LoginActivity = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const res = await fetch("http://localhost:8080/api/login-activity");

        const data = await res.json();
        setEvents(data || []);
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    };
    fetchEvents();
  }, []);

  if (loading) return <div>Loading login activity...</div>;

 return (
  <div style={{ padding: "16px" }}>
    <h2>Login Activity</h2>
    <table className="login-activity-table">
      <thead>
        <tr>
          <th>Date/Time</th>
          <th>User</th>
          <th>Role</th>
          <th>Status</th>
        </tr>
      </thead>
      <tbody>
        {events.map((e) => (
          <tr key={e.id}>
            <td>{new Date(e.timestamp).toLocaleString()}</td>
            <td>{e.username || e.email}</td>
            <td>{e.role}</td>
            <td className={e.status === "SUCCESS" ? "status-success" : "status-fail"}>
              {e.status}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);
};

export default LoginActivity;
