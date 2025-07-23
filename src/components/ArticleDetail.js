import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { format } from 'date-fns';
// import CommentsSection from "../components/CommentsSection";
import RelatedArticles from "../components/RelatedArticles";
import "../styles/ArticleDetail.css"

const ArticleDetail = () => {
  const { id } = useParams();
  const [article, setArticle] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchArticle = async () => {
      try {
        const response = await fetch("/data/news.json");
        const data = await response.json();
        const foundArticle = data.articles.find(art => art.id === parseInt(id));
        
        if (foundArticle) {
          setArticle(foundArticle);
        } else {
          setError("Article not found");
        }
        setLoading(false);
      } catch (err) {
        setError("Failed to fetch article");
        setLoading(false);
      }
    };

    fetchArticle();
  }, [id]);

  if (loading) {
    return <div className="loading-spinner">Loading...</div>;
  }

  if (error) {
    return <div className="error-message">{error}</div>;
  }

  if (!article) {
    return <div className="not-found">Article not found</div>;
  }

  const formattedDate = format(new Date(article.date), 'MMMM d, yyyy');

  return (
    <div className="article-detail">
      <article>
        <header className="article-header">
          <div className="breadcrumbs">
            <a href="/">Home</a> &gt; <a href={`/category/${article.category}`}>{article.category}</a> &gt; {article.title}
          </div>
          <h1>{article.title}</h1>
          <div className="article-meta">
            <div className="author-info">
              <span className="author">{article.author}</span>
              <span className="publication-date">{formattedDate}</span>
            </div>
            <div className="article-stats">
              <span className="read-time">{article.readTime}</span>
              <span className="views">{article.views.toLocaleString()} views</span>
            </div>
          </div>
          <div className="article-tags">
            {article.tags.map((tag, index) => (
              <a key={index} href={`/tag/${tag}`} className="tag">{tag}</a>
            ))}
          </div>
        </header>

        <div className="article-image">
          <img src={article.imageUrl} alt={article.title} />
        </div>

        <div className="article-content">
          <p className="lead">{article.summary}</p>
          
          {article.content.split('\n').map((paragraph, index) => (
            <p key={index}>{paragraph}</p>
          ))}
        </div>

        <footer className="article-footer">
          <div className="engagement-buttons">
            <button className="like-button">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M14 9V5a3 3 0 0 0-3-3l-4 9v11h11.28a2 2 0 0 0 2-1.7l1.38-9a2 2 0 0 0-2-2.3zM7 22H4a2 2 0 0 1-2-2v-7a2 2 0 0 1 2-2h3"></path>
              </svg>
              Like
            </button>
            <button className="share-button">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="18" cy="5" r="3"></circle>
                <circle cx="6" cy="12" r="3"></circle>
                <circle cx="18" cy="19" r="3"></circle>
                <line x1="8.59" y1="13.51" x2="15.42" y2="17.49"></line>
                <line x1="15.41" y1="6.51" x2="8.59" y2="10.49"></line>
              </svg>
              Share
            </button>
          </div>
        </footer>
      </article>

      <RelatedArticles currentArticleId={article.id} category={article.category} />
      {/* <CommentsSection articleId={article.id} /> */}
    </div>
  );
};

export default ArticleDetail;