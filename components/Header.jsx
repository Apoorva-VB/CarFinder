// Header.js
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./Header.css";

const Header = () => {
  const [darkMode, setDarkMode] = useState(() => {
    return localStorage.getItem("theme") === "dark";
  });

  useEffect(() => {
    if (darkMode) {
      document.body.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.body.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [darkMode]);

  return (
    <header className="app-header">
      <Link to="/" className="logo">
        Car Finder
      </Link>
      <div className="header-right">
        <button className="theme-toggle" onClick={() => setDarkMode(!darkMode)}>
          {darkMode ? "🌞" : "🌙"}
        </button>
        <Link to="/wishlist" className="wishlist-link">
          Wishlist
        </Link>
      </div>
    </header>
  );
};

export default Header;
