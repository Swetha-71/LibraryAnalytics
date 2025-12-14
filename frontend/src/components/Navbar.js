import React from "react";
import { Link } from "react-router-dom";

import { Link } from "react-router-dom";

const Navbar = () => {
  const { user, logout } = useAuth();
  return (
    <nav /* ...same styles... */>
      <div /* container styles */>
        <div /* logo */>📚 LibraryAnalytics</div>

        {user && (
          <div style={{ display: "flex", gap: "12px", alignItems: "center" }}>
            {/* Role-based links */}
            {(user.role === "ADMIN" || user.role === "MANAGER" || user.role === "LIBRARIAN") && (
              <>
                <Link to="/dashboard" style={{ color: "white", textDecoration: "none" }}>
                  Dashboard
                </Link>
                <Link to="/login-activity" style={{ color: "white", textDecoration: "none" }}>
                  Login Activity
                </Link>
              </>
            )}

            {user.role === "LIBRARIAN" && (
              <Link to="/librarian" style={{ color: "white", textDecoration: "none" }}>
                Librarian Panel
              </Link>
            )}

            {user.role === "STUDENT" && (
              <Link to="/student" style={{ color: "white", textDecoration: "none" }}>
                Student Dashboard
              </Link>
            )}

            <span style={{ color: "white" }}>👋 {user.name}</span>
            <button /* logout styles */ onClick={logout}>Logout</button>
          </div>
        )}

        {!user && (
          <div style={{ display: "flex", gap: "10px" }}>
            <Link to="/login" style={{ color: "white", textDecoration: "none" }}>
              Login
            </Link>
            <Link to="/register" style={{ color: "white", textDecoration: "none" }}>
              Register
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
};


export default Navbar;
