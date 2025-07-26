import React from "react";
import { useNavigate } from "react-router-dom";
import { format } from 'date-fns';
import "../styles/NewsCard.css";

const NewsCard = ({ article, featured = false }) => {
  const navigate = useNavigate();
  const formattedDate = format(new Date(article.createdAt), 'MMMM d, yyyy');

  const handleClick = () => {
    navigate(`/article/${article._id}`, { state: { article } });
  };

  return (
    <div 
      className={`news-card2 ${featured ? 'featured' : ''}`}
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
        {/* <p className="card-summary">{article.summary}</p> */}
        <div className="card-footer">
          <span className="date">{formattedDate}</span>
          {article.trending && <span className="trending">Trending</span>}
        </div>
      </div>
    </div>
  );
};

export default NewsCard;