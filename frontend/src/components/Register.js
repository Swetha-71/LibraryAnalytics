import React, { useState, useEffect } from "react";
import { register as registerApi, sendOtp } from "../services/api";
import { useNavigate, Link } from "react-router-dom";
import "../styles/style.css";

const Register = () => {
  const [form, setForm] = useState({
    email: "",
    username: "",
    password: "",
    branch: "",
    semester: "",
    otp: "",
  });
  const [sendingOtp, setSendingOtp] = useState(false);
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

  const handleSendOtp = async () => {
    setError("");
    setOk("");
    if (!form.email) {
      setError("Please enter email first.");
      return;
    }
    try {
      setSendingOtp(true);
      const res = await sendOtp(form.email);
      if (res.success) {
        setOk("OTP sent to your email. Please check inbox/spam.");
      } else {
        setError(res.message || "Failed to send OTP");
      }
    } catch (err) {
      setError("Failed to send OTP");
    } finally {
      setSendingOtp(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setOk("");

    if (!form.branch || !form.semester) {
      setError("Please select branch and semester.");
      return;
    }
    if (!form.otp) {
      setError("Please enter the OTP sent to your email.");
      return;
    }

    const payload = {
      email: form.email,
      username: form.username,
      password: form.password,
      branch: form.branch,
      semester: form.semester,
      otp: form.otp,
      // role not sent; backend will set STUDENT
    };

    try {
      const res = await registerApi(payload);
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
        {/* Email + Send OTP row */}
        <div className="otp-row">
          <input
            name="email"
            type="email"
            placeholder="Email address"
            value={form.email}
            onChange={handleChange}
            required
            className="login-input"
          />
          <button
            type="button"
            onClick={handleSendOtp}
            className="login-btn"
            disabled={sendingOtp}
            style={{ width: "140px" }}
          >
            {sendingOtp ? "Sending..." : "Send OTP"}
          </button>
        </div>

        <input
          name="otp"
          placeholder="Enter OTP"
          value={form.otp}
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
          name="branch"
          value={form.branch}
          onChange={handleChange}
          className="login-input"
          required
        >
          <option value="">Select branch</option>
          <option value="CSE">CSE</option>
          <option value="ECE">ECE</option>
          <option value="EEE">EEE</option>
          <option value="MECH">MECH</option>
        </select>

        <select
          name="semester"
          value={form.semester}
          onChange={handleChange}
          className="login-input"
          required
        >
          <option value="">Select semester</option>
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
          <option value="4">4</option>
          <option value="5">5</option>
          <option value="6">6</option>
          <option value="7">7</option>
          <option value="8">8</option>
        </select>

        <button type="submit" className="login-btn">
          Sign up
        </button>
      </form>

      {error && <p className="error-text">{error}</p>}
      {ok && (
        <p className="error-text" style={{ color: "green" }}>
          {ok}
        </p>
      )}

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