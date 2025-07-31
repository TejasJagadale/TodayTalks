//

import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { format } from "date-fns";
import "../styles/ArticleDetail.css";
import AdSenseAd from "./AdSenseAd";

const ArticleDetail = () => {
  const location = useLocation();
  const article = location.state?.article;
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/article/${article._id}`, { state: { article } });
  };

  if (!article) {
    return (
      <div className="not-found">
        <h2>Article Not Found</h2>
        <p>The article you're looking for is not available.</p>
        <button onClick={() => navigate("/")}>Return to Home</button>
      </div>
    );
  }

  // Fallback to publishedAt if createdAt doesn't exist
  const articleDate = article.createdAt || article.publishedAt;
  const formattedDate = articleDate
    ? format(new Date(articleDate), "MMMM d, yyyy")
    : "Date not available";

  return (
    <div className="article-detail">
      <button className="back-button" onClick={() => navigate(-1)}>
        ← Back to previous page
      </button>
      <article>
        <header className="article-header">
          <h1>{article.title}</h1>
          <div className="article-meta">
            <span className="publication-date">{formattedDate}</span>
            {article.trending && (
              <span className="trending-badge">🔥 Trending</span>
            )}
            {article.category && (
              <span className="category-badge">{article.category}</span>
            )}
          </div>
        </header>

        <div className="card-image1">
          <img
            src={article.imageUrl}
            alt={article.title}
            onError={(e) => {
              e.target.src = "/default-news-image.jpg";
              e.target.alt = "Default news image";
            }}
          />
        </div>

        <div className="article-content">
          {article.description && (
            <div className="ad-container">
              <AdSenseAd
                slotId="article_content_ad"
                format="rectangle"
                style={{ display: "block" }}
              />
              <p className="ad-containerdesc">{article.description}</p>
            </div>
          )}
          {article.content && <p>{article.content}</p>}
        </div>

        {article.sourceUrl && (
          <div className="source-link">
            <a
              href={article.sourceUrl}
              target="_blank"
              rel="noopener noreferrer"
            >
              Read full story at source
            </a>
          </div>
        )}

        {article.tags?.length > 0 && (
          <div className="article-tags">
            <h3>Related Topics:</h3>
            <div className="tags-container">
              {article.tags.map((tag, index) => (
                <span key={index} className="tag">
                  #{tag}
                </span>
              ))}
            </div>
          </div>
        )}
      </article>
    </div>
  );
};

export default ArticleDetail;
