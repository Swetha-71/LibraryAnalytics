import React, { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import "../styles/style.css"; // ⭐ Import global CSS

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
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

  return (
    <div className="login-container">
      <h2>🔐 Login</h2>

      <form onSubmit={handleSubmit}>
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

      {error && <p className="error-text">{error}</p>}

      <div className="demo-info">
        <b>Demo users:</b><br />
        admin / admin123 (Admin)<br />
        librarian / lib123 (Manager)<br />
        student1 / stu123 (Student)
      </div>
    </div>
  );
};

export default Login;
