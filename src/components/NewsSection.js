// NewsSection.js
import React from 'react';
import '../styles/NewsSection.css';
import Cards from './Cards';

const NewsSection = ({ title, icon, newsItems, categoryColor }) => {
  return (
    <section className="news-section-container">
      <h2 className="news-section-title">
        <span className="news-section-icon" style={{ color: categoryColor }}>
          {icon}
        </span>
        {title}
      </h2>
      <div className="news-section-grid">
        {newsItems.map((news) => (
          <Cards 
            key={news.id} 
            news={news} 
            categoryColor={categoryColor}
          />
        ))}
      </div>
    </section>
  );
};

export default NewsSection;