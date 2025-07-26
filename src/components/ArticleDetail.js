import React from "react";
import { useLocation, useNavigate  } from "react-router-dom";
import { format } from "date-fns";
import "../styles/ArticleDetail.css";

const ArticleDetail = () => {
  const location = useLocation();
  const article = location.state?.article;
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/article/${article._id}`, { state: { article } });
  };

  console.log(article);

  if (!article) {
    return <div className="not-found">Article data not available</div>;
  }

  const formattedDate = format(new Date(article.createdAt), "MMMM d, yyyy");

  return (
    <div
      className="article-detail"
      onClick={handleClick}
      style={{ cursor: "pointer" }}
    >
      <article>
        <header className="article-header">
          <h1>{article.title}</h1>
          <div className="article-meta">
            <span className="publication-date">{formattedDate}</span>
            {article.trending && (
              <span className="trending-badge">Trending</span>
            )}
          </div>
        </header>

        <div className="card-image1">
          <img src={article.imageUrl} alt=""></img>
        </div>

        <div className="article-content">
          <p className="lead">{article.summary}</p>
          <p>{article.description}</p>
        </div>

        {article.tags?.length > 0 && (
          <div className="article-tags">
            {article.tags.map((tag, index) => (
              <span key={index} className="tag">
                {tag}
              </span>
            ))}
          </div>
        )}
      </article>
    </div>
  );
};

export default ArticleDetail;
