import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import NewsCard from "../components/NewsCard";
import AdSenseAd from "../components/AdSenseAd";
import TrendingTags from "../components/TrendingTags";
import "../styles/Home.css";
import AdSenseLoader from "../components/AdSenseLoader";
import localData from "../data/news.json";

const Home = () => {
  const { categoryName } = useParams();
  const navigate = useNavigate();
  const [allArticles, setAllArticles] = useState([]);
  const [trendingTags, setTrendingTags] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState(
    categoryName || "Technology"
  );
  const [selectedTag, setSelectedTag] = useState(null);
  const [showTrendingModal, setShowTrendingModal] = useState(false);
  const [fadeState, setFadeState] = useState("fade-in");
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const [error, setError] = useState(null);

  // Gold price state
  const [goldPrices, setGoldPrices] = useState({
    india24k: "Loading...",
    india22k: "Loading...",
    tamilnadu24k: "Loading...",
    tamilnadu22k: "Loading...",
    lastUpdated: ""
  });
  const [goldLoading, setGoldLoading] = useState(true);

  const categories = [
    "Technology",
    "Business",
    "Health",
    "Education",
    "Stories",
    "Information",
    "Updates"
  ];

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);
  // Updated FREE gold price implementation
  useEffect(() => {
    const fetchGoldPrices = async () => {
      try {
        // Option 1: GoldPrice.org (free JSON API)
        const response = await fetch(
          "https://data-asg.goldprice.org/dbXRates/INR"
        );
        const data = await response.json();
        console.log(data);

        // Price per troy ounce (31.1 grams) to per gram
        const pricePerGram = data.items[0].xauPrice / 31.1;
        const tnPremium = 1.04; // 4% Tamil Nadu premium

        setGoldPrices({
          india24k: `₹${Math.round(pricePerGram)}/g`,
          india22k: `₹${Math.round(pricePerGram * 0.916)}/g`,
          tamilnadu24k: `₹${Math.round(pricePerGram * tnPremium)}/g`,
          tamilnadu22k: `₹${Math.round(pricePerGram * 0.916 * tnPremium)}/g`,
          lastUpdated: new Date().toLocaleTimeString()
        });
      } catch (error) {
        console.error("Error fetching gold prices:", error);

        // Option 2: Fallback to HTML scraping (no API needed)
        try {
          const scrapedPrices = await fetchGoldPricesFromWebPage();
          setGoldPrices(scrapedPrices);
        } catch (scrapeError) {
          console.error("Scraping failed:", scrapeError);
          setGoldPrices({
            india24k: "Check today's rate",
            india22k: "Check today's rate",
            tamilnadu24k: "Check today's rate",
            tamilnadu22k: "Check today's rate",
            lastUpdated: ""
          });
        }
      } finally {
        setGoldLoading(false);
      }
    };

    // Web scraping fallback function
    const fetchGoldPricesFromWebPage = async () => {
      // In a real app, you would use a proxy server to scrape
      // (Direct scraping from frontend violates CORS)
      return {
        india24k: "₹5,800/g (sample)",
        india22k: "₹5,300/g (sample)",
        tamilnadu24k: "₹6,000/g (sample)",
        tamilnadu22k: "₹5,500/g (sample)",
        lastUpdated: `${new Date().toLocaleTimeString()} (sample data)`
      };
    };

    fetchGoldPrices();
    const interval = setInterval(fetchGoldPrices, 30 * 60 * 1000); // 30 mins
    return () => clearInterval(interval);
  }, []);
  // Fetch gold prices
  // useEffect(() => {
  //   const fetchGoldPrices = async () => {
  //     try {
  //       // Using GoldAPI.io with API key (replace with your actual API key)
  //       const response = await fetch("https://www.goldapi.io/api/XAU/INR", {
  //         headers: {
  //           "x-access-token": "your-api-key-here", // Replace with your actual API key
  //           "Content-Type": "application/json"
  //         }
  //       });

  //       if (!response.ok) {
  //         throw new Error("Failed to fetch gold prices");
  //       }

  //       const data = await response.json();

  //       // GoldAPI.io returns price per troy ounce (31.1 grams), so we convert to per gram
  //       const pricePerGram = data.price / 31.1;
  //       const tnPremium = 1.04; // 4% premium for Tamil Nadu

  //       setGoldPrices({
  //         india24k: `₹${Math.round(pricePerGram)}/g`,
  //         india22k: `₹${Math.round(pricePerGram * 0.916)}/g`,
  //         tamilnadu24k: `₹${Math.round(pricePerGram * tnPremium)}/g`,
  //         tamilnadu22k: `₹${Math.round(pricePerGram * 0.916 * tnPremium)}/g`,
  //         lastUpdated: new Date().toLocaleTimeString()
  //       });

  //       setGoldLoading(false);
  //     } catch (error) {
  //       console.error("Error fetching gold prices:", error);
  //       // Fallback to scraping or alternative API
  //       fetchGoldPricesFallback();
  //     }
  //   };

  //   // Fallback method if primary API fails
  //   const fetchGoldPricesFallback = async () => {
  //     try {
  //       // Alternative API - GoldPrice.org JSON API
  //       const response = await fetch(
  //         "https://data-asg.goldprice.org/dbXRates/INR"
  //       );
  //       const data = await response.json();

  //       // This API returns price per troy ounce (31.1 grams)
  //       const pricePerGram = data.items[0].xauPrice / 31.1;
  //       const tnPremium = 1.04; // 4% premium for Tamil Nadu

  //       setGoldPrices({
  //         india24k: `₹${Math.round(pricePerGram)}/g`,
  //         india22k: `₹${Math.round(pricePerGram * 0.916)}/g`,
  //         tamilnadu24k: `₹${Math.round(pricePerGram * tnPremium)}/g`,
  //         tamilnadu22k: `₹${Math.round(pricePerGram * 0.916 * tnPremium)}/g`,
  //         lastUpdated: `${new Date().toLocaleTimeString()} (fallback)`
  //       });
  //     } catch (fallbackError) {
  //       console.error("Fallback API also failed:", fallbackError);
  //       setGoldPrices({
  //         india24k: "Price unavailable",
  //         india22k: "Price unavailable",
  //         tamilnadu24k: "Price unavailable",
  //         tamilnadu22k: "Price unavailable",
  //         lastUpdated: ""
  //       });
  //     } finally {
  //       setGoldLoading(false);
  //     }
  //   };

  //   fetchGoldPrices();
  //   // Update every 5 minutes
  //   const interval = setInterval(fetchGoldPrices, 5 * 60 * 1000);
  //   return () => clearInterval(interval);
  // }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);

        if (localData && localData.length > 0) {
          console.log("Using local data");
          const combinedArticles = localData.map((article) => ({
            ...article,
            category: article.category || "Technology",
            tags: article.tags || [],
            trending: article.trending || false,
            status: article.status !== false
          }));

          setAllArticles(combinedArticles);

          const activeArticles = combinedArticles.filter(
            (a) => a.status !== false
          );
          const allTags = activeArticles.flatMap((a) => a.tags || []);
          setTrendingTags([...new Set(allTags)].slice(0, 10));

          setLoading(false);
          return;
        } else {
          console.log("Using API data");
        }

        console.log("Fetching from API");
        const promises = categories.map(async (category) => {
          const response = await fetch(
            `https://ttofficial.onrender.com/api/contents/${category}`
          );

          if (!response.ok) {
            throw new Error(`Failed to fetch ${category} data`);
          }
          return response.json();
        });

        const results = await Promise.all(promises);

        const combinedArticles = results.flatMap((data, index) => {
          let articles = [];
          if (Array.isArray(data)) {
            articles = data;
          } else if (data.articles && Array.isArray(data.articles)) {
            articles = data.articles;
          } else if (data.data && Array.isArray(data.data)) {
            articles = data.data;
          } else if (data.items && Array.isArray(data.items)) {
            articles = data.items;
          }

          return articles.map((article) => ({
            ...article,
            category: article.category || categories[index],
            tags: article.tags || [],
            trending: article.trending || false,
            status: article.status !== false
          }));
        });

        console.log(combinedArticles);

        setAllArticles(combinedArticles);

        const activeArticles = combinedArticles.filter(
          (a) => a.status !== false
        );
        const allTags = activeArticles.flatMap((a) => a.tags || []);
        setTrendingTags([...new Set(allTags)].slice(0, 10));

        setLoading(false);
      } catch (err) {
        console.error("Error fetching data:", err);
        setError(err.message);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    if (!loading) {
      setFadeState("fade-out");
      const timer = setTimeout(() => {
        setFadeState("fade-in");
      }, 300);
      return () => clearTimeout(timer);
    }
  }, [selectedCategory, loading]);

  const getFilteredArticles = () => {
    let filtered = allArticles.filter((article) => article.status !== false);

    if (selectedCategory === "Trending") {
      filtered = filtered.filter((article) => article.trending === true);
    } else if (categories.includes(selectedCategory)) {
      filtered = filtered.filter(
        (article) => article.category === selectedCategory
      );
    }

    if (selectedTag) {
      filtered = filtered.filter(
        (article) => article.tags && article.tags.includes(selectedTag)
      );
    }

    return filtered;
  };

  const filteredArticles = getFilteredArticles();
  const featuredArticles = filteredArticles.filter((a) => a.trending === true);
  const regularArticles = filteredArticles.filter((a) => a.trending !== true);

  const handleCategorySelect = (category) => {
    setSelectedCategory(category);
    setSelectedTag(null);
    if (category !== "Trending" && categoryName) {
      navigate(`/category/${category}`);
    }
  };

  const TrendingModal = ({ onClose }) => {
    const trendingArticles = allArticles.filter(
      (a) => a.status !== false && a.trending === true
    );

    return (
      <div className="modal-overlay" onClick={onClose}>
        <div
          className="trending-modal-content"
          onClick={(e) => e.stopPropagation()}
        >
          <button className="close-modal" onClick={onClose}>
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M18 6L6 18M6 6L18 18"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
              />
            </svg>
          </button>
          <h2>🔥 All Trending News</h2>
          <div className="trending-grid">
            {trendingArticles.length > 0 ? (
              trendingArticles.map((article) => (
                <NewsCard
                  key={article._id || article.id}
                  article={article}
                  featured
                />
              ))
            ) : (
              <div className="no-results">
                <svg
                  width="48"
                  height="48"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z"
                    stroke="#888"
                    strokeWidth="2"
                  />
                  <path
                    d="M12 8V12M12 16H12.01"
                    stroke="#888"
                    strokeWidth="2"
                    strokeLinecap="round"
                  />
                </svg>
                <p>No trending articles found</p>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  };

  if (loading) {
    return (
      <div className="loading-container">
        <div className="loading-spinner">
          <div className="spinner"></div>
          <p>Loading the latest news...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="error-container">
        <div className="error-message">
          <svg
            width="48"
            height="48"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M12 8V12M12 16H12.01M22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12Z"
              stroke="#FF4D4F"
              strokeWidth="2"
              strokeLinecap="round"
            />
          </svg>
          <h3>Error Loading Content</h3>
          <p>{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="retry-button"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className={`home-container ${categoryName ? "category-view" : ""}`}>
      <AdSenseLoader />

      {/* Breaking news marquee */}
      <div className="breaking-news-container">
        <div className="breaking-news-label">BREAKING:</div>
        <marquee
          className="breaking-news-marquee"
          behavior="scroll"
          direction="left"
        >
          {categories
            .map((category) => {
              const trendingArticle = allArticles.find(
                (article) =>
                  article.category === category &&
                  article.trending === true &&
                  article.status !== false
              );

              return trendingArticle ? (
                <span
                  key={`${category}-${trendingArticle.id}`}
                  className="marquee-item"
                >
                  {category}: {trendingArticle.title} •
                </span>
              ) : null;
            })
            .filter(Boolean)}
        </marquee>
      </div>

      <div className="category-selector-container">
        <div className="category-selector">
          {categories.map((category) => (
            <button
              key={category}
              className={`category-tab ${
                selectedCategory === category ? "active" : ""
              }`}
              onClick={() => handleCategorySelect(category)}
            >
              {category}
            </button>
          ))}
          <button
            className={`trending-tab ${
              selectedCategory === "Trending" ? "active" : ""
            }`}
            onClick={() => handleCategorySelect("Trending")}
          >
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M13 2L3 14H12L11 22L21 10H12L13 2Z"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            Trending
          </button>
        </div>
      </div>

      <div className={`content-container ${fadeState}`}>
        <main className="home-content">
          <div className="main-content">
            {featuredArticles.length > 0 && (
              <>
                <section className="featured-news">
                  <div className="section-header">
                    <h2>
                      {selectedCategory === "Trending"
                        ? "🔥 Top Trending Stories"
                        : `⭐ Trending in ${selectedCategory}`}
                    </h2>
                    {selectedCategory !== "Trending" && (
                      <button
                        onClick={() => setShowTrendingModal(true)}
                        className="view-all-button"
                      >
                        View All Trending
                        <svg
                          width="16"
                          height="16"
                          viewBox="0 0 24 24"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M5 12H19M19 12L12 5M19 12L12 19"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      </button>
                    )}
                  </div>
                  <div className="featured-grid">
                    {featuredArticles.map((article) => (
                      <NewsCard
                        key={article._id || article.id}
                        article={article}
                        featured
                      />
                    ))}
                  </div>
                </section>

                <div className="content-ad">
                  <AdSenseAd
                    slotId="mid_content_ad"
                    format="rectangle"
                    style={{ display: "block", margin: "2rem 0" }}
                  />
                  <p className="ad-label">Advertisement</p>
                </div>
              </>
            )}

            {regularArticles.length > 0 ? (
              <>
                <section className="regular-news">
                  <h2>
                    {selectedCategory === "Trending"
                      ? "More Trending Articles"
                      : `All ${selectedCategory} Articles`}
                  </h2>
                  <div className="articles-grid">
                    {regularArticles.map((article) => (
                      <NewsCard
                        key={article._id || article.id}
                        article={article}
                      />
                    ))}
                  </div>
                </section>

                {isMobile && (
                  <div className="mobile-ad">
                    <AdSenseAd
                      slotId="mobile_content_ad"
                      format="fluid"
                      style={{ display: "block", margin: "1rem 0" }}
                    />
                    <p className="ad-label">Advertisement</p>
                  </div>
                )}
              </>
            ) : (
              !featuredArticles.length && (
                <div className="no-articles">
                  <svg
                    width="64"
                    height="64"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z"
                      stroke="#888"
                      strokeWidth="2"
                    />
                    <path
                      d="M8 14C8 14 9.5 16 12 16C14.5 16 16 14 16 14M9 9H9.01M15 9H15.01"
                      stroke="#888"
                      strokeWidth="2"
                      strokeLinecap="round"
                    />
                  </svg>
                  <h3>No articles found</h3>
                  <p>Try selecting a different category or tag</p>
                </div>
              )
            )}

            <div className="footer-ad">
              <AdSenseAd
                slotId="footer_ad"
                format="leaderboard"
                style={{ display: "block", marginTop: "3rem" }}
              />
              <p className="ad-label">Advertisement</p>
            </div>
          </div>

          {!categoryName && !isMobile && (
            <aside className="sidebar">
              {/* Gold Price Card */}
              <div className="gold-price-card">
                <h3>🪙 Live Gold Rates</h3>
                {goldLoading ? (
                  <div className="gold-loading">Loading gold prices...</div>
                ) : (
                  <>
                    <div className="gold-rate">
                      <span>India 24K:</span>
                      <strong>{goldPrices.india24k}</strong>
                    </div>
                    <div className="gold-rate">
                      <span>India 22K:</span>
                      <strong>{goldPrices.india22k}</strong>
                    </div>
                    <div className="gold-rate">
                      <span>Tamil Nadu 24K:</span>
                      <strong>{goldPrices.tamilnadu24k}</strong>
                    </div>
                    <div className="gold-rate">
                      <span>Tamil Nadu 22K:</span>
                      <strong>{goldPrices.tamilnadu22k}</strong>
                    </div>
                    <div className="gold-update-time">
                      Updated: {goldPrices.lastUpdated}
                    </div>
                  </>
                )}
              </div>

              <TrendingTags
                tags={trendingTags}
                selectedTag={selectedTag}
                onTagClick={(tag) =>
                  setSelectedTag(tag === selectedTag ? null : tag)
                }
              />

              <div className="sidebar-ad">
                <AdSenseAd slotId="sidebar_ad_1" format="rectangle" />
                <p className="ad-label">Advertisement</p>
              </div>
            </aside>
          )}

          {/* Mobile Gold Price Display */}
          {isMobile && (
            <div className="mobile-gold-price">
              <h3>Indian Live Gold Rates</h3>
              <div className="mobile-gold-rates">
                <div>
                  <span>24K:</span>
                  <strong>{goldPrices.india24k}</strong>
                </div>
                <div>
                  <span>22K:</span>
                  <strong>{goldPrices.india22k}</strong>
                </div>
              </div>
              <h3>Tamil Nadu Live Gold Rates</h3>
              <div className="mobile-gold-rates">
                <div>
                  <span>24K:</span>
                  <strong>{goldPrices.tamilnadu24k}</strong>
                </div>
                <div>
                  <span>22K:</span>
                  <strong>{goldPrices.tamilnadu22k}</strong>
                </div>
              </div>
              <div className="gold-update-time">
                Updated: {goldPrices.lastUpdated}
              </div>
            </div>
          )}
        </main>
      </div>

      {showTrendingModal && (
        <TrendingModal onClose={() => setShowTrendingModal(false)} />
      )}
    </div>
  );
};

export default Home;
