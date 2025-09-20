import { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Navbar({ onToggleSidebar }) {
  const [isDark, setIsDark] = useState(false);
  const { user } = useAuth();
  useEffect(() => {
    const stored = localStorage.getItem("theme");
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;

    if (stored === "dark" || (!stored && prefersDark)) {
      document.body.classList.add("dark");
      setIsDark(true);
    }
  }, []);

  const toggleTheme = () => {
    if (isDark) {
      document.body.classList.remove("dark");
      localStorage.setItem("theme", "light");
    } else {
      document.body.classList.add("dark");
      localStorage.setItem("theme", "dark");
    }
    setIsDark(!isDark);
  };

  return (
    <>
      <header className="navbar">
        {/* Logo / Title */}
        <div className="logo-title">
          <button className="menu-button" onClick={onToggleSidebar}>
            ☰
          </button>
          <img src="/logo.svg" alt="Logo" className="logo" />
          <h1 className="title">EduPlatform</h1>
        </div>

        {/* Center Navigation (optional) */}
        


        {/* Right Side */}
        <div className="right-side">
          {/* Notification Icon */}
          <div className="notification">
            <button className="icon-button">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="icon"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V4a2 2 0 10-4 0v1.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
                />
              </svg>
            </button>
            <span className="notification-dot"></span>
          </div>

          {/* User Info */}
          <div className="user-menu">
            <button className="user-button">
              <img
                src="https://via.placeholder.com/40"
                alt="Profile"
                className="avatar"
              />
            </button>
            {/* Theme Toggle */}
            <button className="theme-toggle" onClick={toggleTheme}>
              {isDark ? "🌞" : "🌙"}
            </button>
            {/* Dropdown */}
            <div className="dropdown">
             
  <NavLink to="/profile" className={({ isActive }) => (isActive ? "active" : "")}>
    Profile
  </NavLink>
  <NavLink to="/settings" className={({ isActive }) => (isActive ? "active" : "")}>
    Settings
  </NavLink>
  <NavLink to="/logout" className="logout">
    Logout
  </NavLink>


            </div>
          </div>
        </div>
      </header>

      {/* CSS */}
      <style>{`
        /* Navbar container */
        .navbar {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 10px 25px;
          background-color: #ffffff;
          box-shadow: 0 2px 6px rgba(0,0,0,0.1);
          position: sticky;
          top: 0;
          z-index: 100;
          font-family: Arial, sans-serif;
        }

        /* Dark theme */
        body.dark .navbar {
          background-color: #1a1a2e;
          color: #fff;
        }

        /* Logo and title */
        .logo-title {
          display: flex;
          align-items: center;
          gap: 10px;
        }

        .logo {
          width: 40px;
          height: 40px;
        }

        .title {
          font-size: 1.5rem;
          font-weight: bold;
          color: #2575fc;
        }

        body.dark .title {
          color: #00c4ff;
        }

        /* Menu button (for sidebar toggle) */
       .menu-button {
  background: none;
  border: none;
  color: white;
  font-size: 1.5rem;
  cursor: pointer;
  margin-right: 1rem;
  z-index: 3000; /* higher than sidebar */
  position: relative;
}


        /* Center navigation links */
        .nav-links {
          display: flex;
          gap: 20px;
        }

        .nav-links a {
          text-decoration: none;
          color: #333;
          font-weight: 500;
          transition: color 0.2s;
        }

        .nav-links a:hover {
          color: #2575fc;
        }

        body.dark .nav-links a {
          color: #fff;
        }

        body.dark .nav-links a:hover {
          color: #00c4ff;
        }

        /* Right side */
        .right-side {
          display: flex;
          align-items: center;
          gap: 15px;
        }

        /* Notification icon */
        .notification {
          position: relative;
        }

        .icon-button {
          background: none;
          border: none;
          cursor: pointer;
          padding: 5px;
        }

        .icon {
          width: 24px;
          height: 24px;
          color: #333;
        }

        body.dark .icon {
          color: #fff;
        }

        .notification-dot {
          position: absolute;
          top: 0;
          right: 0;
          width: 8px;
          height: 8px;
          background-color: #ff4d4f;
          border-radius: 50%;
        }

        /* User menu */
        .user-menu {
          position: relative;
        }

        .user-button {
          background: none;
          border: none;
          cursor: pointer;
          padding: 0;
        }

        .avatar {
          width: 40px;
          height: 40px;
          border-radius: 50%;
        }

        /* Theme toggle */
        .theme-toggle {
          background: none;
          border: none;
          font-size: 1.2rem;
          cursor: pointer;
          margin-left: 10px;
        }

        /* Dropdown menu */
        .dropdown {
          position: absolute;
          top: 50px;
          right: 0;
          background-color: #fff;
          border-radius: 10px;
          box-shadow: 0 6px 20px rgba(0,0,0,0.15);
          display: flex;
          flex-direction: column;
          min-width: 150px;
          overflow: hidden;
          opacity: 0;
          visibility: hidden;
          transform: translateY(-10px);
          transition: all 0.3s ease;
          z-index: 10;
        }

        .user-menu:hover .dropdown {
          opacity: 1;
          visibility: visible;
          transform: translateY(0);
        }

        .dropdown a {
          padding: 10px 15px;
          text-decoration: none;
          color: #333;
          font-weight: 500;
          transition: background 0.2s;
        }

        .dropdown a:hover {
          background-color: #f0f0f0;
        }

        body.dark .dropdown {
          background-color: #2a2a40;
        }

        body.dark .dropdown a {
          color: #fff;
        }

        body.dark .dropdown a:hover {
          background-color: #3a3a5a;
        }
      `}</style>
    </>
  );
}
