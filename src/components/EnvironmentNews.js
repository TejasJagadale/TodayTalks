import React, { useState, useEffect } from 'react';
import NewsSection from './NewsSection';
// import './EnvironmentNews.css';

const EnvironmentNews = () => {
  const [trendingNews, setTrendingNews] = useState([]);
  const [popularNews, setPopularNews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchEnvironmentNews = async () => {
      try {
        await new Promise(resolve => setTimeout(resolve, 800));
        
        const mockData = {
          trending: [
            {
              id: 1,
              title: "UN report warns of 'hellish' 3°C warming by 2100",
              excerpt: "New climate projections show current policies leading to dangerous temperature rise.",
              imageUrl: "https://via.placeholder.com/300x200?text=Climate+Report",
              category: "Climate",
              date: "2023-11-02",
              readTime: "8 min read",
              author: "Emma Wilson"
            },
            {
              id: 2,
              title: "Great Barrier Reef shows signs of recovery",
              excerpt: "Scientists report coral regrowth in several sections of the reef system.",
              imageUrl: "https://via.placeholder.com/300x200?text=Great+Barrier+Reef",
              category: "Conservation",
              date: "2023-10-31",
              readTime: "5 min read",
              author: "David Attenborough"
            }
          ],
          popular: [
            {
              id: 3,
              title: "EU passes landmark nature restoration law",
              excerpt: "Member states required to restore 20% of degraded ecosystems by 2030.",
              imageUrl: "https://via.placeholder.com/300x200?text=EU+Nature+Law",
              category: "Policy",
              date: "2023-10-29",
              readTime: "6 min read",
              author: "Sophie Martin"
            },
            {
              id: 4,
              title: "Solar panel efficiency breaks new record",
              excerpt: "New perovskite-silicon tandem cells achieve 33.7% conversion efficiency.",
              imageUrl: "https://via.placeholder.com/300x200?text=Solar+Panels",
              category: "Energy",
              date: "2023-10-26",
              readTime: "4 min read",
              author: "Raj Patel"
            }
          ]
        };

        setTrendingNews(mockData.trending);
        setPopularNews(mockData.popular);
        setLoading(false);
      } catch (err) {
        setError("Failed to load environment news. Please try again later.");
        setLoading(false);
        console.error("Error fetching environment news:", err);
      }
    };

    fetchEnvironmentNews();
  }, []);

  if (loading) return <div className="business-news-loading">Loading business news...</div>;
  if (error) return <div className="business-news-error">{error}</div>;

  return (
    <div className="business-news-container">
      <NewsSection
        title="Trending in Environment"
        icon="🌍"
        newsItems={trendingNews}
        categoryColor="#2ecc71"
      />
      <NewsSection
        title="Most Popular Environment"
        icon="🌱"
        newsItems={popularNews}
        categoryColor="#1abc9c"
      />
    </div>
  );
};

export default EnvironmentNews;