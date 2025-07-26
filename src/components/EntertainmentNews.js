import React, { useState, useEffect } from 'react';
import NewsSection from './NewsSection';
// import './EntertainmentNews.css';

const EntertainmentNews = () => {
  const [trendingNews, setTrendingNews] = useState([]);
  const [popularNews, setPopularNews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchEntertainmentNews = async () => {
      try {
        await new Promise(resolve => setTimeout(resolve, 800));
        
        const mockData = {
          trending: [
            {
              id: 1,
              title: "Taylor Swift's Eras Tour becomes first to gross $1 billion",
              excerpt: "Concert film also breaks records with $123 million opening weekend.",
              imageUrl: "https://via.placeholder.com/300x200?text=Taylor+Swift",
              category: "Music",
              date: "2023-11-04",
              readTime: "4 min read",
              author: "Jessica Brown"
            },
            {
              id: 2,
              title: "Hollywood actors reach tentative deal to end strike",
              excerpt: "SAG-AFTRA and studios agree on new three-year contract.",
              imageUrl: "https://via.placeholder.com/300x200?text=Actors+Strike",
              category: "Film",
              date: "2023-11-02",
              readTime: "6 min read",
              author: "Mark Johnson"
            }
          ],
          popular: [
            {
              id: 3,
              title: "Netflix announces Squid Game season 2 for December 2024",
              excerpt: "Teaser trailer reveals returning cast members and new games.",
              imageUrl: "https://via.placeholder.com/300x200?text=Squid+Game",
              category: "TV",
              date: "2023-10-31",
              readTime: "5 min read",
              author: "Kim Soo-min"
            },
            {
              id: 4,
              title: "Video game industry sets new revenue record",
              excerpt: "Global gaming market reaches $184 billion in 2023.",
              imageUrl: "https://via.placeholder.com/300x200?text=Video+Games",
              category: "Gaming",
              date: "2023-10-28",
              readTime: "7 min read",
              author: "Alex Rivera"
            }
          ]
        };

        setTrendingNews(mockData.trending);
        setPopularNews(mockData.popular);
        setLoading(false);
      } catch (err) {
        setError("Failed to load entertainment news. Please try again later.");
        setLoading(false);
        console.error("Error fetching entertainment news:", err);
      }
    };

    fetchEntertainmentNews();
  }, []);

  if (loading) return <div className="business-news-loading">Loading business news...</div>;
  if (error) return <div className="business-news-error">{error}</div>;

  return (
    <div className="business-news-container">
      <NewsSection
        title="Trending in Entertainment"
        icon="🎬"
        newsItems={trendingNews}
        categoryColor="#9b59b6"
      />
      <NewsSection
        title="Most Popular Entertainment"
        icon="🎵"
        newsItems={popularNews}
        categoryColor="#8e44ad"
      />
    </div>
  );
};

export default EntertainmentNews;