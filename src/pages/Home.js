import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import NewsCard from "../components/NewsCard";
import AdSenseAd from "../components/AdSenseAd";
import TrendingTags from "../components/TrendingTags";
import "../styles/Home.css";
import AdSenseLoader from "../components/AdSenseLoader";

const Home = () => {
  const { categoryName } = useParams();
  const navigate = useNavigate();
  const [articles, setArticles] = useState([]);
  const [trendingTags, setTrendingTags] = useState([]);
  const [loading, setLoading] = useState(true);
  const [transitionLoading, setTransitionLoading] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(categoryName || "Technology");
  const [selectedTag, setSelectedTag] = useState(null);
  const [filteredArticles, setFilteredArticles] = useState([]);
  const [expandedArticle, setExpandedArticle] = useState(null);
  const [showFullDescription, setShowFullDescription] = useState({});
  const [isCategoryView, setIsCategoryView] = useState(!!categoryName);
  const [fadeState, setFadeState] = useState('fade-in'); // 'fade-in', 'fade-out'

  const toggleArticle = (articleId) => {
    if (expandedArticle === articleId) {
      setExpandedArticle(null);
    } else {
      setExpandedArticle(articleId);
      setShowFullDescription((prev) => ({ ...prev, [articleId]: false }));
    }
  };

  const toggleDescription = (articleId, e) => {
    e.stopPropagation();
    setShowFullDescription((prev) => ({
      ...prev,
      [articleId]: !prev[articleId]
    }));
  };

  const truncateDescription = (text, maxLength = 150) => {
    if (!text) return "";
    return text.length > maxLength
      ? text.substring(0, maxLength) + "..."
      : text;
  };

  const categories = [
    "Technology",
    "Business",
    "Science",
    "Environment",
    "Health",
    "Entertainment",
    "Sports",
    "Education"
  ];

  useEffect(() => {
    // Update selectedCategory when URL changes
    if (categoryName) {
      setSelectedCategory(categoryName);
      setIsCategoryView(true);
    } else {
      setIsCategoryView(false);
    }
  }, [categoryName]);

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        // Start fade-out and loading transition
        setFadeState('fade-out');
        setTransitionLoading(true);
        
        // Small delay to allow fade-out animation to complete
        await new Promise(resolve => setTimeout(resolve, 300));
        
        const response = await fetch(
          `https://todaytalkserver.onrender.com/api/contents/${selectedCategory}`
        );
        const data = await response.json();

        setArticles(data);

        // Extract trending tags
        const allTags = data.flatMap((article) => article.tags);
        const uniqueTags = [...new Set(allTags)];
        setTrendingTags(uniqueTags.slice(0, 10));

        // Fade in the new content
        setFadeState('fade-in');
        setTransitionLoading(false);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching articles:", error);
        setFadeState('fade-in');
        setTransitionLoading(false);
        setLoading(false);
      }
    };

    fetchArticles();
  }, [selectedCategory]);

  useEffect(() => {
    if (selectedTag) {
      const filtered = articles.filter((article) =>
        article.tags.includes(selectedTag)
      );
      setFilteredArticles(filtered);
    } else {
      setFilteredArticles(articles);
    }
  }, [selectedTag, articles]);

  const handleTagSelect = (tag) => {
    setSelectedTag(tag === selectedTag ? null : tag);
  };

  const handleCategorySelect = (category) => {
    if (category === selectedCategory) return;
    
    setSelectedCategory(category);
    setSelectedTag(null);
    if (isCategoryView) {
      navigate(`/category/${category}`);
    }
  };

  const handleViewAll = () => {
    navigate(`/category/${selectedCategory}`);
  };

  if (loading) {
    return (
      <div className="loading-spinner">
        <div className="spinner"></div>
        <p>Loading the latest news...</p>
      </div>
    );
  }

  // Use filtered articles if a tag is selected
  const displayArticles = selectedTag ? filteredArticles : articles;
  const featuredArticles = displayArticles.filter(
    (article) => article.trending
  );
  const regularArticles = displayArticles.filter(
    (article) => !article.trending
  );

  return (
    <div className={`home-container ${isCategoryView ? "category-view" : ""}`}>
      <AdSenseLoader />

      <div className="category-selector">
        {categories.map((category) => (
          <button
            key={category}
            className={selectedCategory === category ? "active" : ""}
            onClick={() => handleCategorySelect(category)}
            disabled={transitionLoading}
          >
            {category}
          </button>
        ))}
      </div>

      {transitionLoading && (
        <div className="transition-loader">
          <div className="spinner"></div>
          <p>Loading {selectedCategory} news...</p>
        </div>
      )}

      <div className={`content-container ${fadeState}`}>
        <div className="breaking-news-banner">
          <span>BREAKING:</span>
          {selectedTag
            ? `Articles tagged with "${selectedTag}"`
            : `Latest updates in ${selectedCategory}`}
        </div>

        <main className="home-content">
          <div className="main-content">
            {isCategoryView ? (
              <>
                <section className="featured-news">
                  <div className="section-header">
                    <h2>Featured in {selectedCategory}</h2>
                  </div>
                  <div className="featured-grid">
                    {featuredArticles.map((article) => (
                      <NewsCard key={article._id} article={article} featured={true} />
                    ))}
                  </div>
                </section>

                <section className="all-articles">
                  <h2>All {selectedCategory} Articles</h2>
                  <div className="articles-grid">
                    {regularArticles.map((article) => (
                      <NewsCard key={article._id} article={article} />
                    ))}
                  </div>
                </section>
              </>
            ) : (
              <>
                <section className="featured-news">
                  <div className="section-header">
                    <h2>
                      {selectedTag
                        ? `Featured in "${selectedTag}"`
                        : `Trending in ${selectedCategory}`}
                    </h2>
                    <button onClick={handleViewAll} className="view-all">
                      View All <span>&rarr;</span>
                    </button>
                  </div>
                  <div className="featured-grid">
                    {featuredArticles.map((article) => (
                      <NewsCard key={article._id} article={article} featured={true} />
                    ))}
                  </div>
                </section>
              </>
            )}

            <AdSenseAd key="3581145953" slotId="3581145953" format="horizontal" />
          </div>

          {!isCategoryView && (
            <aside className="sidebar">
              <TrendingTags
                tags={trendingTags}
                selectedTag={selectedTag}
                onTagClick={handleTagSelect}
              />

              <div className="most-popular">
                <h3>Most Popular</h3>
                <div className="popular-list">
                  {displayArticles
                    .sort((a, b) => (b.views || 0) - (a.views || 0))
                    .slice(0, 5)
                    .map((article) => (
                      <div
                        key={article._id}
                        className={`popular-item ${
                          expandedArticle === article._id ? "expanded" : ""
                        }`}
                      >
                        <div
                          className="popular-header"
                          onClick={() => toggleArticle(article._id)}
                        >
                          <span className="popular-rank">
                            {articles.indexOf(article) + 1}
                          </span>
                          <span className="popular-title">
                            {article.title}
                            {article.trending && (
                              <span className="trending-badge">Trending</span>
                            )}
                          </span>
                        </div>

                        {expandedArticle === article._id && (
                          <div className="popular-content">
                            <p className="popular-summary">{article.summary}</p>

                            {article.description && (
                              <div className="description-container">
                                <p className="popular-description">
                                  {showFullDescription[article._id]
                                    ? article.description
                                    : truncateDescription(article.description)}
                                </p>
                                {article.description.length > 150 && (
                                  <button
                                    className="read-more-btn"
                                    onClick={(e) =>
                                      toggleDescription(article._id, e)
                                    }
                                  >
                                    {showFullDescription[article._id]
                                      ? "Show Less"
                                      : "Read More"}
                                  </button>
                                )}
                              </div>
                            )}

                            {article.tags?.length > 0 && (
                              <div className="popular-tags">
                                {article.tags.map((tag, index) => (
                                  <span key={index} className="tag">
                                    {tag}
                                  </span>
                                ))}
                              </div>
                            )}

                            <div className="article-meta">
                              <span className="date">
                                {new Date(article.createdAt).toLocaleDateString()}
                              </span>
                            </div>
                          </div>
                        )}
                      </div>
                    ))}
                </div>
              </div>

              <AdSenseAd key="3581145953" slotId="3581145953" format="horizontal" />
            </aside>
          )}
        </main>
      </div>
    </div>
  );
};

export default Home;