import React, { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate, Link } from "react-router-dom";
import "../styles/style.css";

const Login = () => {
  const [identifier, setIdentifier] = useState(""); // email or username
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { login } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    document.body.classList.add("login-page");
    return () => document.body.classList.remove("login-page");
  }, []);

  const handleLogin = async (event) => {
  event.preventDefault();
  setError("");

  const result = await login(identifier, password); // identifier = email or username

  if (result.success) {
    if (result.role === "ADMIN" || result.role === "MANAGER") {
      navigate("/dashboard");
    } else if (result.role === "STUDENT") {
      navigate("/student");
    } else {
      navigate("/");
    }
  } else {
    setError(result.message || "Invalid credentials. Please try again.");
  }
};
// ← close handleLogin here

  return (
    <div className="login-container">
      <h2>🔐 Login</h2>

      <form onSubmit={handleLogin}>
        <input
          type="text"
          placeholder="Email or username"
          className="login-input"
          value={identifier}
          onChange={(e) => setIdentifier(e.target.value)}
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

      {error && <p className="error-text">{error}</p>}

      <p style={{ marginTop: 16, fontSize: "0.9rem", textAlign: "center" }}>
        New user?{" "}
        <Link to="/register" style={{ color: "#2563eb", fontWeight: 500 }}>
          Register here
        </Link>
      </p>
    </div>
  );
};

export default Login;