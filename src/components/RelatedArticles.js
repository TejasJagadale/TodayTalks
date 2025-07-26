import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/RelatedArticles.css";

const RelatedArticles = ({ currentArticleId, category }) => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchRelated = async () => {
      try {
        const response = await fetch(
          `https://todaytalkserver.onrender.com/api/contents/${category}`
        );
        const data = await response.json();
        
        // Filter out current article and get 3 random related
        const related = data
          .filter(article => article._id !== currentArticleId)
          .sort(() => 0.5 - Math.random())
          .slice(0, 3);
          
        setArticles(related);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching related articles:", error);
        setLoading(false);
      }
    };

    fetchRelated();
  }, [currentArticleId, category]);

  if (loading) return <div className="loading">Loading related articles...</div>;
  if (articles.length === 0) return null;

  return (
    <div className="related-articles">
      <h3>More in {category}</h3>
      <div className="related-grid">
        {articles.map(article => (
          <div 
            key={article._id} 
            className="related-item"
            onClick={() => navigate(`/article/${article._id}`)}
          >
            <h4>{article.title}</h4>
            <p>{article.summary}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RelatedArticles;