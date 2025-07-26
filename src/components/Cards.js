// Cards.js
import React from "react";
import "../styles/Card.css";

const Cards = ({ news, categoryColor = "#3498db" }) => {
  return (
    <div className="news-card-container">
      <div className="news-card-image">
        <img src={news.imageUrl} alt={news.title} />
        <span
          className="news-card-category-badge"
          style={{ backgroundColor: categoryColor }}
        >
          {news.category}
        </span>
      </div>
      <div className="news-card-content">
        <h3 className="news-card-title">{news.title}</h3>
        <p className="news-card-excerpt">{news.excerpt}</p>
        <div className="news-card-meta">
          <span className="news-card-author">{news.author}</span>
          <span className="news-card-date">{news.date}</span>
          <span className="news-card-read-time">{news.readTime}</span>
        </div>
        <button
          className="news-card-read-more"
          style={{ backgroundColor: categoryColor }}
        >
          Read More
        </button>
      </div>
    </div>
  );
};

export default Cards;