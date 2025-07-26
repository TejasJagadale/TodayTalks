import React, { useState, useEffect } from "react";
import NewsSection from "./NewsSection.js";
// import './HealthNews.css';

const HealthNews = () => {
  const [trendingNews, setTrendingNews] = useState([]);
  const [popularNews, setPopularNews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchHealthNews = async () => {
      try {
        await new Promise((resolve) => setTimeout(resolve, 800));

        const mockData = {
          trending: [
            {
              id: 1,
              title: "New Alzheimer's drug shows promise in clinical trials",
              excerpt:
                "Experimental treatment slows cognitive decline by 35% in phase 3 trials.",
              imageUrl:
                "https://via.placeholder.com/300x200?text=Alzheimers+Drug",
              category: "Medicine",
              date: "2023-11-03",
              readTime: "7 min read",
              author: "Dr. Susan Lee"
            },
            {
              id: 2,
              title: "WHO warns of global mental health crisis",
              excerpt:
                "Report shows depression and anxiety rates up 25% since pandemic began.",
              imageUrl:
                "https://via.placeholder.com/300x200?text=Mental+Health",
              category: "Public Health",
              date: "2023-11-01",
              readTime: "6 min read",
              author: "Maria Gonzalez"
            }
          ],
          popular: [
            {
              id: 3,
              title: "FDA approves first gene therapy for sickle cell disease",
              excerpt:
                "Breakthrough treatment uses CRISPR technology to edit patient's genes.",
              imageUrl: "https://via.placeholder.com/300x200?text=Gene+Therapy",
              category: "Biotech",
              date: "2023-10-30",
              readTime: "8 min read",
              author: "Dr. James Wilson"
            },
            {
              id: 4,
              title: "Study links ultra-processed foods to 32 health risks",
              excerpt:
                "Comprehensive review finds consistent evidence of multiple health harms.",
              imageUrl:
                "https://via.placeholder.com/300x200?text=Processed+Foods",
              category: "Nutrition",
              date: "2023-10-27",
              readTime: "5 min read",
              author: "Dr. Emily Chen"
            }
          ]
        };

        setTrendingNews(mockData.trending);
        setPopularNews(mockData.popular);
        setLoading(false);
      } catch (err) {
        setError("Failed to load health news. Please try again later.");
        setLoading(false);
        console.error("Error fetching health news:", err);
      }
    };

    fetchHealthNews();
  }, []);

  if (loading)
    return (
      <div className="business-news-loading">Loading business news...</div>
    );
  if (error) return <div className="business-news-error">{error}</div>;

  return (
    <div className="business-news-container">
      <NewsSection
        title="Trending in Health"
        icon="🏥"
        newsItems={trendingNews}
        categoryColor="#e74c3c"
      />
      <NewsSection
        title="Most Popular Health"
        icon="❤️"
        newsItems={popularNews}
        categoryColor="#c0392b"
      />
    </div>
  );
};

export default HealthNews;
