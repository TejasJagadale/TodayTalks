import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import NewsCard from "../components/NewsCard";
import "../styles/CategoryView.css";

const CategoryView = () => {
  const { categoryName } = useParams();
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        setLoading(true);
        const response = await fetch(
          `https://todaytalkserver.onrender.com/api/contents/${categoryName}`
        );
        const data = await response.json();
        setArticles(data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching articles:", error);
        setLoading(false);
      }
    };

    fetchArticles();
  }, [categoryName]);

  if (loading) {
    return (
      <div className="loading-spinner">
        <div className="spinner"></div>
        <p>Loading articles...</p>
      </div>
    );
  }

  return (
    <div className="category-view-container">
      <h1 className="category-title">{categoryName}</h1>
      
      <div className="featured-section">
        <h2>Featured Articles</h2>
        <div className="featured-grid">
          {articles
            .filter(article => article.trending)
            .map((article) => (
              <NewsCard key={article._id} article={article} featured={true} />
            ))}
        </div>
      </div>

      <div className="all-articles-section">
        <h2>All Articles</h2>
        <div className="articles-grid">
          {articles.map((article) => (
            <NewsCard key={article._id} article={article} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default CategoryView;