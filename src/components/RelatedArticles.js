import React, { useState, useEffect } from "react";
import NewsCard from "./NewsCard";
import "../styles/RelatedArticles.css"

const RelatedArticles = ({ currentArticleId, category }) => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRelatedArticles = async () => {
      try {
        const response = await fetch("/data/news.json");
        const data = await response.json();
        const related = data.articles
          .filter(article => article.category === category && article.id !== currentArticleId)
          .slice(0, 3);
        setArticles(related);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching related articles:", error);
        setLoading(false);
      }
    };

    fetchRelatedArticles();
  }, [currentArticleId, category]);

  if (loading) {
    return <div className="loading">Loading related articles...</div>;
  }

  if (articles.length === 0) {
    return null;
  }

  return (
    <section className="related-articles">
      <h3>More in {category}</h3>
      <div className="related-grid">
        {articles.map(article => (
          <NewsCard key={article.id} article={article} />
        ))}
      </div>
    </section>
  );
};

export default RelatedArticles;