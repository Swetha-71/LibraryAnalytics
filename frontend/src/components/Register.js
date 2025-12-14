import React, { useState, useEffect } from "react";
import { register as registerApi } from "../services/api";
import { useNavigate, Link } from "react-router-dom";
import "../styles/style.css";

const Register = () => {
  const [form, setForm] = useState({
    email: "",
    username: "",
    password: "",
    role: "STUDENT", // default role
  });
  const [error, setError] = useState("");
  const [ok, setOk] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    document.body.classList.add("login-page");
    return () => document.body.classList.remove("login-page");
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setOk("");
    try {
      const res = await registerApi(form); // { email, username, password, role }
      if (res.success) {
        setOk("Registered successfully. You can now log in.");
        setTimeout(() => navigate("/login"), 1000);
      } else {
        setError(res.message || "Registration failed");
      }
    } catch (err) {
      setError("Server error");
    }
  };

  return (
    <div className="login-container">
      <h2>📝 Register</h2>
      <form onSubmit={handleSubmit}>
        <input
          name="email"
          type="email"
          placeholder="Email address"
          value={form.email}
          onChange={handleChange}
          required
          className="login-input"
        />
        <input
          name="username"
          placeholder="Username"
          value={form.username}
          onChange={handleChange}
          required
          className="login-input"
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={form.password}
          onChange={handleChange}
          required
          className="login-input"
        />

        <select
          name="role"
          value={form.role}
          onChange={handleChange}
          className="login-input"
          required
        >
          <option value="ADMIN">Admin</option>
          <option value="MANAGER">Librarian / Manager</option>
          <option value="STUDENT">Student</option>
        </select>

        <button type="submit" className="login-btn">
          Sign up
        </button>
      </form>

      {error && <p className="error-text">{error}</p>}
      {ok && <p className="error-text" style={{ color: "green" }}>{ok}</p>}

      <p style={{ marginTop: 16, fontSize: "0.9rem", textAlign: "center" }}>
        Already have an account?{" "}
        <Link to="/login" style={{ color: "#2563eb", fontWeight: 500 }}>
          Login
        </Link>
      </p>
    </div>
  );
};

export default Register;