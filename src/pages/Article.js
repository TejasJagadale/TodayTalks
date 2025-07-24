import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import AdSenseAd from '../components/AdSenseAd';

const Article = () => {
  const { id } = useParams();
  const [article, setArticle] = useState(null);
  const [loading, setLoading] = useState(true);
  const [relatedArticles, setRelatedArticles] = useState([]);

  useEffect(() => {
    fetch('/data/news.json')
      .then(response => response.json())
      .then(data => {
        const foundArticle = data.articles;
        setArticle(foundArticle);
        
        // Get related articles (same category)
        const related = data.articles
          .filter(a => a.id !== parseInt(id) && a.category === foundArticle.category)
          .slice(0, 3);
        setRelatedArticles(related);
        
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching article:', error);
        setLoading(false);
      });
  }, [id]);

  if (loading) {
    return <div className="loading">Loading...</div>;
  }

  if (!article) {
    return <div className="not-found">Article not found</div>;
  }

  return (
    <div className="article-page">
      <article>
        <h1>{article.title}</h1>
        <div className="article-meta">
          <span className="author">By {article.author}</span>
          <span className="date">{article.date}</span>
          <span className="category">{article.category}</span>
        </div>
        
        <AdSenseAd slotId="1122334455" format="horizontal" />
        
        <div className="article-image">
          <img src={article.imageUrl} alt={article.title} />
        </div>
        
        <div className="article-content">
          {article.content.split('\n').map((paragraph, i) => (
            <p key={i}>{paragraph}</p>
          ))}
        </div>
        
        <AdSenseAd slotId="5566778899" format="rectangle" />
      </article>
      
      <aside className="related-articles">
        <h3>Related Articles</h3>
        {relatedArticles.map(article => (
          <div key={article.id} className="related-article">
            <h4><a href={`/article/${article.id}`}>{article.title}</a></h4>
            <p className="summary">{article.summary}</p>
          </div>
        ))}
      </aside>
    </div>
  );
};

export default Article;