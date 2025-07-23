import React from "react";
import { Link } from "react-router-dom";
import SearchBar from "./SearchBar";
import "../styles/Header.css";

const Header = () => {
  return (
    <header className="site-header">
      <div className="header-top">
        <div className="container1">
          <div className="date-display">
            {new Date().toLocaleDateString("en-US", {
              weekday: "long",
              month: "long",
              day: "numeric",
              year: "numeric"
            })}
          </div>
          <div className="header-links">
            <a href="/about">About</a>
            <a href="/contact">Contact</a>
          </div>
        </div>
      </div>
      <div className="header-main">
        <div className="container">
          <Link to="/" className="logo">
            <h1>TodayTalks</h1>
            <span className="subbtext">Your trusted news source</span>
          </Link>
          <SearchBar />
        </div>
      </div>
      <nav className="main-nav">
        <div className="container">
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/category/technology">Technology</Link>
            </li>
            <li>
              <Link to="/category/business">Business</Link>
            </li>
            <li>
              <Link to="/category/environment">Environment</Link>
            </li>
            <li>
              <Link to="/category/health">Health</Link>
            </li>
            <li>
              <Link to="/category/entertainment">Entertainment</Link>
            </li>
          </ul>
        </div>
      </nav>
    </header>
  );
};

export default Header;
