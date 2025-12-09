import React, { useState } from "react";
import { register as registerApi } from "../services/api";
import { useNavigate } from "react-router-dom";
import "../styles/style.css";

const Register = () => {

  const [form, setForm] = useState({
    name: "",
    email: "",
    username: "",
    password: "",
    confirmPassword: "",
    role: "STUDENT",
  });
  
  const [error, setError] = useState("");
  const [ok, setOk] = useState("");
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);


  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setOk("");

    // Email validation
    if (!form.email.includes("@")) {
      setError("Invalid email format");
      return;
    }

    // Password match validation
    if (form.password !== form.confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    try {
      const res = await registerApi({
        name: form.name,
        email: form.email,
        username: form.username,
        password: form.password,
        role: form.role,
      });

      if (res.success) {
        setOk("Registered successfully! Redirecting to login...");
        setTimeout(() => navigate("/login"), 1000);
      } else {
        setError(res.message);
      }
    } catch (err) {
      setError("Server error");
    }
  };

  return (
    <div className="register-container">
      <h2>Create Account</h2>

      <form onSubmit={handleSubmit}>

        <input
          name="name"
          placeholder="Full Name"
          value={form.name}
          onChange={handleChange}
          className="register-input"
          required
        />

        <input
          name="email"
          placeholder="Email Address"
          value={form.email}
          onChange={handleChange}
          className="register-input"
          required
        />

        <input
          name="username"
          placeholder="Username"
          value={form.username}
          onChange={handleChange}
          className="register-input"
          required
        />

        <input
          type="password"
          name="password"
          placeholder="Password"
          value={form.password}
          onChange={handleChange}
          className="register-input"
          required
        />

        <input
          type="password"
          name="confirmPassword"
          placeholder="Confirm Password"
          value={form.confirmPassword}
          onChange={handleChange}
          className="register-input"
          required
        />

        <select
          name="role"
          value={form.role}
          onChange={handleChange}
          className="register-input"
        >
          <option value="STUDENT">Student</option>
          <option value="ADMIN">Admin</option>
          <option value="LIBRARIAN">Librarian</option>
        </select>

        <button type="submit" className="register-btn">Register</button>

      </form>
      <div className="login-link">
        Already have an account? <a href="/login">Login here</a>
      </div>


      {error && <p className="error-text">{error}</p>}
      {ok && <p className="success-text">{ok}</p>}
    </div>
  );
};

export default Register;
