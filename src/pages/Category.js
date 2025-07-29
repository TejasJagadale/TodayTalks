import AdSenseAd from "../components/AdSenseAd";
import NewsCard from "../components/NewsCard";

// Sample technology category data (25 articles)
const techArticles = [
  {
    "_id": "tech1",
    "title": "Quantum Computing Breakthrough Announced",
    "description": "IBM reveals 512-qubit processor that solves problems in minutes instead of years.",
    "content": "<p>Detailed article content... (400+ words)</p>",
    "wordCount": 620,
    "tags": ["Quantum", "IBM", "Supercomputing"]
  },
  // 24 more technology articles with similar structure
];

// Component rendering with proper ad placement
const TechnologyCategory = () => (
  <div className="category-page">
    <h1>Technology News</h1>
    <p className="category-description">
      Latest innovations in AI, quantum computing, robotics and emerging technologies. 
      Our tech journalists provide in-depth analysis of industry trends.
    </p>

    <AdSenseAd 
      slotId="category_top_ad"
      format="leaderboard"
      className="content-top-ad"
    />

    <div className="article-grid">
      {techArticles.map(article => (
        <NewsCard key={article._id} article={article} />
      ))}
    </div>

    <div className="mid-content-ad">
      <AdSenseAd 
        slotId="category_mid_ad"
        format="rectangle"
      />
      <p className="ad-label">Advertisement</p>
    </div>

    <section className="category-info">
      <h2>About Our Tech Coverage</h2>
      <p>300+ word original content about your tech journalism standards...</p>
    </section>
  </div>
);