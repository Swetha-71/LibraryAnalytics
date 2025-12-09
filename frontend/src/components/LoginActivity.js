// src/components/LoginActivity.jsx
import React, { useEffect, useState } from "react";

const LoginActivity = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const res = await fetch("http://localhost:8080/api/admin/login-events");
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
    <div>
      <h2>Login Activity</h2>
      <table style={{ width: "100%", marginTop: 16, borderCollapse: "collapse" }}>
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
              <td style={{ color: e.status === "SUCCESS" ? "green" : "red" }}>
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
