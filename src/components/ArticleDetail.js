import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { format } from "date-fns";
import "../styles/ArticleDetail.css";
import AdSenseAd from "./AdSenseAd";

const ArticleDetail = () => {
  const location = useLocation();
  const article = location.state?.article;
  const navigate = useNavigate();

  if (!article) {
    return (
      <div className="not-found">
        <h2>Article Not Found</h2>
        <p>The article you're looking for is not available.</p>
        <button onClick={() => navigate("/")}>Return to Home</button>
      </div>
    );
  }

  const articleDate = article.createdAt || article.publishedAt;
  const formattedDate = articleDate
    ? format(new Date(articleDate), "MMMM d, yyyy")
    : "Date not available";

  // Process description into paragraphs with proper formatting
  const renderDescription = () => {
    if (!article.description) return null;
    
    return article.description.split('\n').map((paragraph, index) => {
      if (!paragraph.trim()) return null;
      
      // Check if paragraph is likely a subheading (short, ends with colon, etc.)
      const isSubheading = paragraph.length < 60 && (paragraph.endsWith(':') || !paragraph.includes('.'));
      
      return (
        <React.Fragment key={index}>
          {isSubheading ? (
            <h3 className="article-subheading">{paragraph}</h3>
          ) : (
            <p className="article-paragraph">{paragraph}</p>
          )}
          {/* Add ad after every 3rd paragraph */}
          {index % 3 === 2 && (
            <div className="paragraph-ad">
              <AdSenseAd 
                slotId={`paragraph_ad_${index}`}
                format="rectangle"
              />
            </div>
          )}
        </React.Fragment>
      );
    });
  };

  return (
    <div className="article-detail news-article">
      <article>
        <header className="article-header">
          <div className="article-category">{article.category}</div>
          <h1 className="article-title">{article.title}</h1>
          <div className="article-meta">
            <span className="publication-date">{formattedDate}</span>
            {article.author && (
              <span className="article-author">By {article.author}</span>
            )}
            {article.trending && (
              <span className="trending-badge">🔥 Trending</span>
            )}
          </div>
          {article.summary && (
            <div className="article-summary">
              <p>{article.summary}</p>
            </div>
          )}
        </header>

        <div className="article-featured-image">
          <img
            src={article.imageUrl}
            alt={article.title}
            onError={(e) => {
              e.target.src = "/default-news-image.jpg";
              e.target.alt = "Default news image";
            }}
          />
          {article.imageCaption && (
            <figcaption className="image-caption">
              {article.imageCaption}
            </figcaption>
          )}
        </div>

        <div className="article-body">
          <div className="article-content">{renderDescription()}</div>

          {article.content && (
            <div className="article-fulltext">
              {article.content.split("\n").map((para, i) => (
                <p key={i}>{para}</p>
              ))}
            </div>
          )}

          <div className="article-end-ad">
            <AdSenseAd slotId="article_end_ad" format="rectangle" />
          </div>
        </div>

        {article.sourceUrl && (
          <div className="article-source">
            <h4>Source:</h4>
            <a
              href={article.sourceUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="source-link"
            >
              {new URL(article.sourceUrl).hostname}
            </a>
          </div>
        )}

        {article.tags?.length > 0 && (
          <div className="article-tags">
            <h4>Related Topics:</h4>
            <div className="tags-container">
              {article.tags.map((tag, index) => (
                <p
                  style={{
                    background: index % 2 === 0 ? "lightblue" : "lightgreen",
                    padding:'2px 10px',
                    borderRadius: "5px"
                  }}
                >
                  {tag}
                </p>
              ))}
            </div>
          </div>
        )}
      </article>

      <div className="article-footer">
        <button className="back-button" onClick={() => navigate(-1)}>
          ← Back to previous page
        </button>
      </div>
    </div>
  );
};

export default ArticleDetail;