import React, { useState, useEffect } from "react";
import NewsSection from "./NewsSection";
import "../styles/BusinessNews.css";

const BusinessNews = () => {
  const [trendingNews, setTrendingNews] = useState([]);
  const [popularNews, setPopularNews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBusinessNews = async () => {
      try {
        // Simulate API call
        await new Promise((resolve) => setTimeout(resolve, 800));

        // Mock data - replace with actual API call
        const mockData = {
          trending: [
            {
              id: 1,
              title: "Federal Reserve signals potential pause in rate hikes",
              excerpt:
                "Central bank leaves rates unchanged but keeps options open for future increases.",
              imageUrl:
                "https://via.placeholder.com/300x200?text=Federal+Reserve",
              category: "Economy",
              date: "2023-11-01",
              readTime: "5 min read",
              author: "Robert Johnson"
            },
            {
              id: 2,
              title: "Amazon reports stronger-than-expected Q3 earnings",
              excerpt:
                "E-commerce giant beats estimates with 13% revenue growth.",
              imageUrl:
                "https://via.placeholder.com/300x200?text=Amazon+Earnings",
              category: "Corporate",
              date: "2023-10-30",
              readTime: "4 min read",
              author: "Sarah Chen"
            }
          ],
          popular: [
            {
              id: 3,
              title: "Wall Street rebounds after three-week slump",
              excerpt: "Dow jumps 500 points as investor sentiment improves.",
              imageUrl: "https://via.placeholder.com/300x200?text=Wall+Street",
              category: "Markets",
              date: "2023-10-28",
              readTime: "6 min read",
              author: "Michael Wong"
            },
            {
              id: 4,
              title: "Tesla Cybertruck production begins after years of delays",
              excerpt:
                "Electric truck enters production with new pricing structure.",
              imageUrl:
                "https://via.placeholder.com/300x200?text=Tesla+Cybertruck",
              category: "Auto",
              date: "2023-10-25",
              readTime: "7 min read",
              author: "Lisa Park"
            }
          ]
        };

        setTrendingNews(mockData.trending);
        setPopularNews(mockData.popular);
        setLoading(false);
      } catch (err) {
        setError("Failed to load business news. Please try again later.");
        setLoading(false);
        console.error("Error fetching business news:", err);
      }
    };

    fetchBusinessNews();
  }, []);

  if (loading) return <div className="business-news-loading">Loading business news...</div>;
  if (error) return <div className="business-news-error">{error}</div>;

  return (
    <div className="business-news-container">
      <NewsSection
        title="Trending in Business"
        icon="📈"
        newsItems={trendingNews}
        categoryColor="#16a085"
      />
      <NewsSection
        title="Most Popular Business"
        icon="💰"
        newsItems={popularNews}
        categoryColor="#27ae60"
      />
    </div>
  );
};

export default BusinessNews;
