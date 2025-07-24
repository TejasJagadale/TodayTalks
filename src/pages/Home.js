import React, { useState, useEffect } from "react";
import NewsCard from "../components/NewsCard";
import AdSenseAd from "../components/AdSenseAd";
// import CategoryNav from "../components/CategoryNav";
import TrendingTags from "../components/TrendingTags";
// import NewsletterSignup from "../components/NewsletterSignup";
import "../styles/Home.css";
import ArticleDetail from "../components/ArticleDetail";
import AdSenseLoader from "../components/AdSenseLoader";

const Home = () => {
  const [articles, setArticles] = useState([]);
  const [articles1, setArticles1] = useState([]);
  // const [categories, setCategories] = useState([]);
  const [trendingTags, setTrendingTags] = useState([]);
  const [loading, setLoading] = useState(true);
  // const [activeCategory, setActiveCategory] = useState("all");

  useEffect(() => {
    fetch("/data/news.json")
      .then((response) => response.json())
      .then((data) => {
        setArticles(data.articles);
        setArticles1(data.articles1);
        // setCategories(data.categories);
        setTrendingTags(data.trendingTags);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching news:", error);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div className="loading-spinner">
        <div className="spinner"></div>
        <p>Loading the latest news...</p>
      </div>
    );
  }

  const featuredArticles = articles1.filter((article) => article.featured);
  const regularArticles = articles.filter((article) => article.featured);

  return (
    <div className="home-container">
      <AdSenseLoader />
      <div className="breaking-news-banner">
        <span>BREAKING:</span> AI Breakthrough Announced - New Model Surpasses
        Human Performance
      </div>

      {/* <CategoryNav
        categories={categories}
        activeCategory={activeCategory}
        setActiveCategory={setActiveCategory}
      /> */}

      <main className="home-content">
        <div className="main-content">
          <section className="featured-news">
            <div className="section-header">
              <h2>Featured Stories</h2>
              <a href="/news" className="view-all">
                View All Featured <span>&rarr;</span>
              </a>
            </div>
            <div className="featured-grid">
              {featuredArticles.map((article) => (
                <NewsCard key={article.id} article={article} featured={true} />
              ))}
            </div>
          </section>

          <AdSenseAd key="3581145953" slotId="3581145953" format="horizontal" />

          <section className="regular-news">
            <div className="section-header">
              <h2>Latest News</h2>
              <div className="sort-options">
                <span>Sort by:</span>
                <button className="active">Newest</button>
                <button>Most Viewed</button>
                <button>Trending</button>
              </div>
            </div>
            <div className="news-grid">
              {regularArticles.map((article) => (
                <NewsCard key={article.id} article={article} />
              ))}
            </div>
            {/* <button className="load-more">Load More Stories</button> */}
          </section>
        </div>

        <aside className="sidebar">
          {/* <NewsletterSignup /> */}
          <TrendingTags tags={trendingTags} />

          <div className="most-popular">
            <h3>Most Popular</h3>
            <div className="popular-list">
              {articles
                .sort((a, b) => b.views - a.views)
                .slice(0, 5)
                .map((article) => (
                  <div key={article.id} className="popular-item">
                    <span className="popular-rank">
                      {articles.indexOf(article) + 1}
                    </span>
                    <a
                      href={`/article/${article.id}`}
                      className="popular-title"
                    >
                      {article.title}
                    </a>
                    {/* <span className="popular-views">
                      {article.views.toLocaleString()} views
                    </span> */}
                  </div>
                ))}
            </div>
          </div>

          <ArticleDetail />

          {/* <AdSenseAd slotId="0987654321" format="rectangle" /> */}
          <AdSenseAd key="3581145953" slotId="3581145953" format="horizontal" />
        </aside>
      </main>
    </div>
  );
};

export default Home;
