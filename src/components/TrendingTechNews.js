import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import '../styles/TrendingTechNews.css';
import localTechData from '../data/localTechData.json';

const TrendingTechNews = () => {
  const { category } = useParams(); // Get category from URL
  const [trendingNews, setTrendingNews] = useState([]);
  const [popularNews, setPopularNews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTechNews = async () => {
      try {
        setLoading(true);
        setError(null);
        
        // First try to use local data if available
        if (localTechData && localTechData.length > 0) {
          console.log("Using local tech data");
          
          // Process local data for the current category
          const categoryData = localTechData.filter(
            article => article.category === (category || 'Technology')
          );
          
          // If no category-specific data, use all data
          const dataToUse = categoryData.length > 0 ? categoryData : localTechData;
          
          // Process trending and popular articles
          const trending = dataToUse
            .filter(article => article.trending === true)
            .sort((a, b) => new Date(b.date || b.createdAt) - new Date(a.date || a.createdAt))
            .slice(0, 3);

          const popular = dataToUse
            .filter(article => article.popular === true)
            .sort((a, b) => (b.views || 0) - (a.views || 0))
            .slice(0, 3);

          // Fallback if no trending/popular flags exist
          const finalTrending = trending.length > 0 ? trending : dataToUse
            .sort((a, b) => new Date(b.date || b.createdAt) - new Date(a.date || a.createdAt))
            .slice(0, 3);

          const finalPopular = popular.length > 0 ? popular : dataToUse
            .sort((a, b) => (b.views || 0) - (a.views || 0))
            .slice(0, 3);

          setTrendingNews(finalTrending);
          setPopularNews(finalPopular);
          setLoading(false);
          return;
        }

        // If no local data, proceed with API fetch and caching logic
        const cacheKey = `techNewsData_${category}`;
        const cachedData = sessionStorage.getItem(cacheKey);
        
        if (cachedData) {
          const { trending, popular, timestamp } = JSON.parse(cachedData);
          if (Date.now() - timestamp < 300000) {
            setTrendingNews(trending);
            setPopularNews(popular);
            setLoading(false);
            return;
          }
        }

        // Fetch from API
        const response = await fetch(`https://todaytalkserver.onrender.com/api/contents/${category || 'Technology'}`);
        
        if (!response.ok) {
          throw new Error(`Failed to load ${category || 'Technology'} news`);
        }

        const data = await response.json();
        const apiData = Array.isArray(data) ? data : data.articles || data.data || [];
        
        // Process API response (same as before)
        const trending = apiData
          .filter(article => article.trending === true)
          .sort((a, b) => new Date(b.date || b.createdAt) - new Date(a.date || a.createdAt))
          .slice(0, 3);

        const popular = apiData
          .filter(article => article.popular === true)
          .sort((a, b) => (b.views || 0) - (a.views || 0))
          .slice(0, 3);

        const finalTrending = trending.length > 0 ? trending : apiData
          .sort((a, b) => new Date(b.date || b.createdAt) - new Date(a.date || a.createdAt))
          .slice(0, 3);

        const finalPopular = popular.length > 0 ? popular : apiData
          .sort((a, b) => (b.views || 0) - (a.views || 0))
          .slice(0, 3);

        setTrendingNews(finalTrending);
        setPopularNews(finalPopular);

        // Cache the API data
        sessionStorage.setItem(cacheKey, JSON.stringify({
          trending: finalTrending,
          popular: finalPopular,
          timestamp: Date.now()
        }));

      } catch (err) {
        console.error(`Error fetching ${category} news:`, err);
        setError(`Failed to load ${category || 'Technology'} news. Please try again later.`);
        
        // Fallback data with dynamic category
        setTrendingNews([
          {
            id: 1,
            title: `Latest in ${category || 'Technology'}`,
            excerpt: `Stay updated with ${category || 'Technology'} innovations`,
            imageUrl: `https://via.placeholder.com/300x200?text=${category || 'Technology'}`,
            category: category || 'Technology',
            date: new Date().toISOString().split('T')[0],
            readTime: "5 min read",
            author: `${category || 'Technology'} Reporter`
          }
        ]);
        
        setPopularNews([
          {
            id: 2,
            title: `Popular in ${category || 'Technology'}`,
            excerpt: `What's trending in ${category || 'Technology'} this week`,
            imageUrl: `https://via.placeholder.com/300x200?text=Popular+${category || 'Technology'}`,
            category: category || 'Technology',
            date: new Date().toISOString().split('T')[0],
            readTime: "4 min read",
            author: `${category || 'Technology'} Analyst`
          }
        ]);
      } finally {
        setLoading(false);
      }
    };

    fetchTechNews();
  }, [category]);

  if (loading) {
    return (
      <div className="loadingtech">
        <h2 className="section-titletech">
          {category ? `Loading ${category} News...` : "Loading Tech News..."}
        </h2>
        <div className="skeleton-gridtech">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="skeleton-cardtech">
              <div className="skeleton-imagetech"></div>
              <div className="skeleton-contenttech">
                <div className="skeleton-titletech"></div>
                <div className="skeleton-excerpttech"></div>
                <div className="skeleton-metatech"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="errortech">
        <div className="error-icontech">⚠️</div>
        <p>{error}</p>
        <button 
          className="retry-buttontech"
          onClick={() => window.location.reload()}
        >
          Retry
        </button>
      </div>
    );
  }

  return (
    <div className="tech-news-containertech">
      <section className="trending-sectiontech">
        <h2 className="section-titletech">
          <span className="trending-icontech">🔥</span> 
          {category ? `Trending in ${category}` : "Trending in Tech"}
        </h2>
        <div className="news-gridtech">
          {trendingNews.map((news) => (
            <div key={news.id || news._id} className="news-cardtech">
              <div className="card-imagetech">
                <img 
                  src={news.imageUrl || 
                    `https://via.placeholder.com/300x200?text=${news.category || category || 'Tech'}`} 
                  alt={news.title} 
                  onError={(e) => {
                    e.target.src = `https://via.placeholder.com/300x200?text=${news.category || category || 'Tech'}`;
                  }}
                />
                <span className="category-badgetech">
                  {news.category || category || 'Tech'}
                </span>
              </div>
              <div className="card-contenttech">
                <h3 className="news-titletech">{news.title}</h3>
                <p className="news-excerpttech">
                  {news.excerpt || news.description || `Latest ${news.category || category} update`}
                </p>
                <div className="news-metatech">
                  <span className="authortech">
                    {news.author || 'Staff Writer'}
                  </span>
                  <span className="datetech">
                    {news.date || new Date(news.createdAt).toISOString().split('T')[0]}
                  </span>
                  <span className="read-timetech">
                    {news.readTime || `${Math.max(3, Math.floor((news.content?.length || 500) / 200))} min read`}
                  </span>
                </div>
                <button className="read-moretech">Read More</button>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="popular-sectiontech">
        <h2 className="section-titletech">
          <span className="popular-icontech">⭐</span> 
          {category ? `Popular in ${category}` : "Popular Tech"}
        </h2>
        <div className="news-gridtech">
          {popularNews.map((news) => (
            <div key={news.id || news._id} className="news-cardtech">
              <div className="card-imagetech">
                <img 
                  src={news.imageUrl || 
                    `https://via.placeholder.com/300x200?text=Popular+${news.category || category || 'Tech'}`} 
                  alt={news.title}
                  onError={(e) => {
                    e.target.src = `https://via.placeholder.com/300x200?text=Popular+${news.category || category || 'Tech'}`;
                  }}
                />
                <span className="category-badgetech">
                  {news.category || category || 'Tech'}
                </span>
              </div>
              <div className="card-contenttech">
                <h3 className="news-titletech">{news.title}</h3>
                <p className="news-excerpttech">
                  {news.excerpt || news.description || `Popular ${news.category || category} content`}
                </p>
                <div className="news-metatech">
                  <span className="authortech">
                    {news.author || 'Staff Writer'}
                  </span>
                  <span className="datetech">
                    {news.date || new Date(news.createdAt).toISOString().split('T')[0]}
                  </span>
                  <span className="read-timetech">
                    {news.readTime || `${Math.max(3, Math.floor((news.content?.length || 500) / 200))} min read`}
                  </span>
                </div>
                <button className="read-moretech">Read More</button>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default TrendingTechNews;