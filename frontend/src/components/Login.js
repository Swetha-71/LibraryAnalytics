import React, { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import "../styles/style.css";

const Login = () => {
  const [mode, setMode] = useState("login"); // "login" | "register"
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [role, setRole] = useState("STUDENT"); // ADMIN | MANAGER | STUDENT
  const [error, setError] = useState("");
  const { login } = useAuth();
  const navigate = useNavigate();

  // Apply login-page background only on this screen
  useEffect(() => {
    document.body.classList.add("login-page");
    return () => document.body.classList.remove("login-page");
  }, []);

  const handleLogin = async (event) => {
    event.preventDefault();
    setError("");

    const result = await login(username, password);

    if (result.success) {
      if (result.role === "ADMIN") navigate("/dashboard");
      else if (result.role === "MANAGER") navigate("/analytics");
      else if (result.role === "STUDENT") navigate("/dashboard");
      else navigate("/");
    } else {
      setError("Invalid credentials. Please try again.");
    }
  };

  const handleRegister = async (event) => {
    event.preventDefault();
    setError("");

    try {
      const res = await fetch("http://localhost:8080/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password, name, role }),
      });

      const data = await res.json();

      if (!res.ok || !data.success) {
        setError(data.message || "Registration failed. Please try again.");
        return;
      }

      setMode("login");
      setError("Registration successful! Please log in.");
    } catch (e) {
      setError("Registration error. Please try again.");
    }
  };

  return (
    <div className="login-container">
      <h2>🔐 {mode === "login" ? "Login" : "Register"}</h2>

      <div className="login-toggle">
        <button
          type="button"
          className={mode === "login" ? "active" : ""}
          onClick={() => setMode("login")}
        >
          Existing user
        </button>
        <button
          type="button"
          className={mode === "register" ? "active" : ""}
          onClick={() => setMode("register")}
        >
          New user
        </button>
      </div>

      {mode === "login" ? (
        <form onSubmit={handleLogin}>
          <input
            type="text"
            placeholder="Username"
            className="login-input"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />

          <input
            type="password"
            placeholder="Password"
            className="login-input"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <button type="submit" className="login-btn">
            Login
          </button>
        </form>
      ) : (
        <form onSubmit={handleRegister}>
          <input
            type="text"
            placeholder="Full name"
            className="login-input"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />

          <input
            type="text"
            placeholder="Username"
            className="login-input"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />

          <input
            type="password"
            placeholder="Password"
            className="login-input"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <select
            className="login-input"
            value={role}
            onChange={(e) => setRole(e.target.value)}
          >
            <option value="ADMIN">Admin</option>
            <option value="MANAGER">Librarian / Manager</option>
            <option value="STUDENT">Student</option>
          </select>

          <button type="submit" className="login-btn">
            Register
          </button>
        </form>
      )}

      {error && <p className="error-text">{error}</p>}

      {mode === "login" && (
        <div className="demo-info">
          <b>Demo users:</b>
          <br />
          admin / admin123 (Admin)
          <br />
          librarian / lib123 (Manager)
          <br />
          student1 / stu123 (Student)
        </div>
      )}
    </div>
  );
};

export default Login;
