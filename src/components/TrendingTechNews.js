import React, { useState, useEffect } from 'react';
import '../styles/TrendingTechNews.css';

const TrendingTechNews = () => {
  const [trendingNews, setTrendingNews] = useState([]);
  const [popularNews, setPopularNews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // In a real app, you would fetch this from your API
    // For demo purposes, we're using mock data
    const fetchTechNews = async () => {
      try {
        // Simulate API call delay
        await new Promise(resolve => setTimeout(resolve, 800));
        
        // This would be your actual API call:
        // const response = await fetch('https://api.todaytalks.com/tech-news');
        // const data = await response.json();
        
        // Mock data - replace with your actual API response
        const mockData = {
          trending: [
            {
              id: 1,
              title: "Apple announces new M3 chip with breakthrough performance",
              excerpt: "The new silicon promises 40% faster performance than previous generation.",
              imageUrl: "https://via.placeholder.com/300x200?text=Apple+M3",
              category: "Hardware",
              date: "2023-11-01",
              readTime: "4 min read",
              author: "Jane Smith"
            },
            {
              id: 2,
              title: "Google's Gemini AI challenges OpenAI's dominance",
              excerpt: "New multimodal AI model shows impressive capabilities across text, images, and video.",
              imageUrl: "https://via.placeholder.com/300x200?text=Google+Gemini",
              category: "Artificial Intelligence",
              date: "2023-10-30",
              readTime: "6 min read",
              author: "Mike Johnson"
            },
            {
              id: 3,
              title: "Microsoft Copilot now available for all Windows 11 users",
              excerpt: "The AI assistant integrates across Office apps and the operating system.",
              imageUrl: "https://via.placeholder.com/300x200?text=Microsoft+Copilot",
              category: "Software",
              date: "2023-10-28",
              readTime: "3 min read",
              author: "Sarah Williams"
            }
          ],
          popular: [
            {
              id: 4,
              title: "Elon Musk's Neuralink gets FDA approval for human trials",
              excerpt: "Brain-computer interface technology moves closer to real-world implementation.",
              imageUrl: "https://via.placeholder.com/300x200?text=Neuralink",
              category: "Biotech",
              date: "2023-10-25",
              readTime: "5 min read",
              author: "David Chen"
            },
            {
              id: 5,
              title: "Meta's Quest 3 mixed reality headset reviewed",
              excerpt: "Early reviews praise the improved passthrough and performance.",
              imageUrl: "https://via.placeholder.com/300x200?text=Meta+Quest+3",
              category: "VR/AR",
              date: "2023-10-22",
              readTime: "7 min read",
              author: "Lisa Wong"
            },
            {
              id: 6,
              title: "Amazon announces AI-powered shopping assistant",
              excerpt: "New feature uses generative AI to answer product questions and make recommendations.",
              imageUrl: "https://via.placeholder.com/300x200?text=Amazon+AI",
              category: "E-commerce",
              date: "2023-10-20",
              readTime: "4 min read",
              author: "Robert Taylor"
            }
          ]
        };

        setTrendingNews(mockData.trending);
        setPopularNews(mockData.popular);
        setLoading(false);
      } catch (err) {
        setError("Failed to load technology news. Please try again later.");
        setLoading(false);
        console.error("Error fetching tech news:", err);
      }
    };

    fetchTechNews();
  }, []);

  if (loading) {
    return <div className="loadingtech">Loading technology news...</div>;
  }

  if (error) {
    return <div className="errortech">{error}</div>;
  }

  return (
    <div className="tech-news-containertech">
      <section className="trending-sectiontech">
        <h2 className="section-titletech">
          <span className="trending-icontech">🔥</span> Trending in Tech
        </h2>
        <div className="news-gridtech">
          {trendingNews.map((news) => (
            <div key={news.id} className="news-cardtech">
              <div className="card-imagetech">
                <img src={news.imageUrl} alt={news.title} />
                <span className="category-badgetech">{news.category}</span>
              </div>
              <div className="card-contenttech">
                <h3 className="news-titletech">{news.title}</h3>
                <p className="news-excerpttech">{news.excerpt}</p>
                <div className="news-metatech">
                  <span className="authortech">{news.author}</span>
                  <span className="datetech">{news.date}</span>
                  <span className="read-timetech">{news.readTime}</span>
                </div>
                <button className="read-moretech">Read More</button>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="popular-sectiontech">
        <h2 className="section-titletech">
          <span className="popular-icontech">⭐</span> Most Popular Tech
        </h2>
        <div className="news-gridtech">
          {popularNews.map((news) => (
            <div key={news.id} className="news-cardtech">
              <div className="card-imagetech">
                <img src={news.imageUrl} alt={news.title} />
                <span className="category-badgetech">{news.category}</span>
              </div>
              <div className="card-contenttech">
                <h3 className="news-titletech">{news.title}</h3>
                <p className="news-excerpttech">{news.excerpt}</p>
                <div className="news-metatech">
                  <span className="authortech">{news.author}</span>
                  <span className="datetech">{news.date}</span>
                  <span className="read-timetech">{news.readTime}</span>
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