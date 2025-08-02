import React from "react";
import { useNavigate } from "react-router-dom";
import { format } from 'date-fns';
import "../styles/NewsCard.css";

const NewsCard = ({ article, featured = false }) => {
  const navigate = useNavigate();
  
  // Use publishedAt if createdAt doesn't exist in local data
  const dateToFormat = article.createdAt || article.publishedAt;
  const formattedDate = dateToFormat ? format(new Date(dateToFormat), 'MMMM d, yyyy') : '';

  if (article.status === false) return null;

  const handleClick = () => {
    navigate(`/article/${article._id}`, { state: { article } });
  };

  return (
    <div 
      className={`news-card21 ${featured ? 'featured' : ''}`}
      onClick={handleClick}
      style={{ cursor: 'pointer' }}
    >
      <div className="card-image">
        {article.imageUrl && (
          <img 
            src={article.imageUrl} 
            alt={article.title}
            onError={(e) => {
              e.target.src = '/default-news-image.jpg';
            }}
          />
        )}
        {featured && <span className="featured-badge">Featured</span>}
      </div>
      <div className="card-content">
        <h3 className="card-title">{article.title}</h3>
        {/* {article.description && <p className="card-summary">{article.description}</p>} */}
        <div className="card-footer">
          {formattedDate && <span className="date">{formattedDate}</span>}
          {article.trending && <span className="trending">🔥 Trending</span>}
          {article.category && <span className="category-tag">{article.category}</span>}
        </div>
      </div>
    </div>
  );
};

export default NewsCard;