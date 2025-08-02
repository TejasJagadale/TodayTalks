import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import "../styles/Header.css";

const Header = () => {
  const [trendingTopics, setTrendingTopics] = useState([
    "Climate Summit Updates",
    "Tech Market Trends",
    "Global Economy Outlook",
    "Space Exploration News",
    "Health Breakthroughs"
  ]);
  const [currentTopicIndex, setCurrentTopicIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTopicIndex((prevIndex) => 
        prevIndex === trendingTopics.length - 1 ? 0 : prevIndex + 1
      );
    }, 3000);
    return () => clearInterval(interval);
  }, [trendingTopics.length]);

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
          <NavLink to="/" className="logo">
            <h1>TodayTalks</h1>
            {/* <span className="subbtext">Your trusted news source</span> */}
          </NavLink>
          
          <div className="trending-topics">
            <span className="trending-label">Trending:</span>
            <div className="topic-ticker">
              {trendingTopics[currentTopicIndex]}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;