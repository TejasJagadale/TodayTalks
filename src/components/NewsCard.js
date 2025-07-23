import React from "react";
import { format } from 'date-fns';
import "../styles/NewsCard.css";

const NewsCard = ({ article, featured = false }) => {
  const formattedDate = format(new Date(article.date), 'MMMM d, yyyy');

  return (
    <div className={`news-card2 ${featured ? 'featured' : ''}`}>
      <div className="card-image">
        <img src={article.imageUrl} alt={article.title} />
        {featured && <span className="featured-badge">Featured</span>}
        <div className="category-tag">{article.category}</div>
      </div>
      <div className="card-content">
        <div className="card-meta">
          <span className="author">{article.author}</span>
          <span className="date">{formattedDate}</span>
          <span className="read-time">{article.readTime}</span>
        </div>
        <h3 className="card-title">{article.title}</h3>
        <p className="card-summary">{article.summary}</p>
        <div className="card-footer">
          <div className="tags">
            {article.tags.map((tag, index) => (
              <span key={index} className="tag">{tag}</span>
            ))}
          </div>
          <div className="engagement">
            <span className="views">{article.views.toLocaleString()} views</span>
            <span className="comments">{article.comments} comments</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewsCard;