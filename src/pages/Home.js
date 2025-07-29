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
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);

        // First try to use local data if available
        if (localData && localData.length > 0) {
          console.log("Using local data");
          const combinedArticles = localData.map((article) => ({
            ...article,
            category: article.category || "Technology", // default category
            tags: article.tags || [],
            trending: article.trending || false,
            status: article.status !== false
          }));

          setAllArticles(combinedArticles);

          // Extract trending tags from local data
          const activeArticles = combinedArticles.filter(
            (a) => a.status !== false
          );
          const allTags = activeArticles.flatMap((a) => a.tags || []);
          setTrendingTags([...new Set(allTags)].slice(0, 10));

          setLoading(false);
          return;
        }

        // If no local data, fetch from API
        console.log("Fetching from API");
        const promises = categories.map(async (category) => {
          const response = await fetch(
            `https://todaytalkserver.onrender.com/api/contents/${category}`
          );

          if (!response.ok) {
            throw new Error(`Failed to fetch ${category} data`);
          }
          return response.json();
        });

        const results = await Promise.all(promises);

        // Combine all articles into one array
        const combinedArticles = results.flatMap((data, index) => {
          // Handle different response structures
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

          // Add category if not present
          return articles.map((article) => ({
            ...article,
            category: article.category || categories[index],
            tags: article.tags || [],
            trending: article.trending || false,
            status: article.status !== false
          }));
        });

        setAllArticles(combinedArticles);

        // Extract trending tags
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
        <div className="breaking-news-banner">
          <span className="breaking-label">BREAKING</span>
          <span className="breaking-text">
            {selectedCategory === "Trending"
              ? "Trending across all categories"
              : selectedTag
              ? `Tagged with "${selectedTag}" in ${selectedCategory}`
              : `Latest in ${selectedCategory}`}
          </span>
        </div>

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

                {/* First Content Ad - After Featured Articles */}
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

                {/* Mobile-Specific Ad */}
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

            {/* Footer Ad */}
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
        </main>
      </div>

      {showTrendingModal && (
        <TrendingModal onClose={() => setShowTrendingModal(false)} />
      )}
    </div>
  );
};

export default Home;

// import React, { useState, useEffect } from "react";
// import { useParams, useNavigate } from "react-router-dom";
// import NewsCard from "../components/NewsCard";
// import AdSenseAd from "../components/AdSenseAd";
// import TrendingTags from "../components/TrendingTags";
// import "../styles/Home.css";
// import AdSenseLoader from "../components/AdSenseLoader";

// const Home = () => {
//   const { categoryName } = useParams();
//   const navigate = useNavigate();
//   const [allArticles, setAllArticles] = useState([]);
//   const [trendingTags, setTrendingTags] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [selectedCategory, setSelectedCategory] = useState(categoryName || "Technology");
//   const [selectedTag, setSelectedTag] = useState(null);
//   const [showTrendingModal, setShowTrendingModal] = useState(false);
//   const [fadeState, setFadeState] = useState("fade-in");
//   const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

//   const categories = [
//     "Technology",
//     "Business",
//     "Science",
//     "Environment",
//     "Health",
//     "Entertainment",
//     "Sports",
//     "Education"
//   ];

//   useEffect(() => {
//     const handleResize = () => {
//       setIsMobile(window.innerWidth < 768);
//     };
//     window.addEventListener('resize', handleResize);
//     return () => window.removeEventListener('resize', handleResize);
//   }, []);

//   // Fetch all articles on component mount
//   useEffect(() => {
//     const fetchAllArticles = async () => {
//       try {
//         setLoading(true);
//         const promises = categories.map(category =>
//           fetch(`https://todaytalkserver.onrender.com/api/contents/${category}`)
//             .then(res => res.json())
//             .then(data => data.map(article => ({ ...article, category })))
//         );

//         const results = await Promise.all(promises);
//         const combined = results.flat();
//         setAllArticles(combined);

//         const activeArticles = combined.filter(a => a.status !== false);
//         const allTags = activeArticles.flatMap(a => a.tags || []);
//         setTrendingTags([...new Set(allTags)].slice(0, 10));

//         setLoading(false);
//       } catch (error) {
//         console.error("Error fetching articles:", error);
//         setLoading(false);
//       }
//     };

//     fetchAllArticles();
//   }, []);

//   useEffect(() => {
//     if (!loading) {
//       setFadeState("fade-out");
//       const timer = setTimeout(() => {
//         setFadeState("fade-in");
//       }, 300);
//       return () => clearTimeout(timer);
//     }
//   }, [selectedCategory, loading]);

//   const getFilteredArticles = () => {
//     let filtered = allArticles.filter(article => article.status !== false);

//     if (selectedCategory === 'Trending') {
//       filtered = filtered.filter(article => article.trending === true);
//     } else if (categories.includes(selectedCategory)) {
//       filtered = filtered.filter(article => article.category === selectedCategory);
//     }

//     if (selectedTag) {
//       filtered = filtered.filter(article =>
//         article.tags && article.tags.includes(selectedTag)
//       );
//     }

//     return filtered;
//   };

//   const filteredArticles = getFilteredArticles();
//   const featuredArticles = filteredArticles.filter(a => a.trending === true);
//   const regularArticles = filteredArticles.filter(a => a.trending !== true);

//   const handleCategorySelect = (category) => {
//     setSelectedCategory(category);
//     setSelectedTag(null);
//     if (category !== 'Trending' && categoryName) {
//       navigate(`/category/${category}`);
//     }
//   };

//   const TrendingModal = ({ onClose }) => {
//     const trendingArticles = allArticles.filter(
//       a => a.status !== false && a.trending === true
//     );

//     return (
//       <div className="modal-overlay" onClick={onClose}>
//         <div className="trending-modal-content" onClick={e => e.stopPropagation()}>
//           <button className="close-modal" onClick={onClose}>
//             <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
//               <path d="M18 6L6 18M6 6L18 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
//             </svg>
//           </button>
//           <h2>🔥 All Trending News</h2>
//           <div className="trending-grid">
//             {trendingArticles.length > 0 ? (
//               trendingArticles.map(article => (
//                 <NewsCard key={article._id} article={article} featured />
//               ))
//             ) : (
//               <div className="no-results">
//                 <svg width="48" height="48" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
//                   <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" stroke="#888" strokeWidth="2"/>
//                   <path d="M12 8V12M12 16H12.01" stroke="#888" strokeWidth="2" strokeLinecap="round"/>
//                 </svg>
//                 <p>No trending articles found</p>
//               </div>
//             )}
//           </div>
//         </div>
//       </div>
//     );
//   };

//   if (loading) {
//     return (
//       <div className="loading-container">
//         <div className="loading-spinner">
//           <div className="spinner"></div>
//           <p>Loading the latest news...</p>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className={`home-container ${categoryName ? "category-view" : ""}`}>
//       <AdSenseLoader />

//       <div className="category-selector-container">
//         <div className="category-selector">
//           {categories.map(category => (
//             <button
//               key={category}
//               className={`category-tab ${selectedCategory === category ? "active" : ""}`}
//               onClick={() => handleCategorySelect(category)}
//             >
//               {category}
//             </button>
//           ))}
//           <button
//             className={`trending-tab ${selectedCategory === 'Trending' ? 'active' : ''}`}
//             onClick={() => handleCategorySelect('Trending')}
//           >
//             <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
//               <path d="M13 2L3 14H12L11 22L21 10H12L13 2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
//             </svg>
//             Trending
//           </button>
//         </div>
//       </div>

//       <div className={`content-container ${fadeState}`}>
//         <div className="breaking-news-banner">
//           <span className="breaking-label">BREAKING</span>
//           <span className="breaking-text">
//             {selectedCategory === 'Trending'
//               ? 'Trending across all categories'
//               : selectedTag
//               ? `Tagged with "${selectedTag}" in ${selectedCategory}`
//               : `Latest in ${selectedCategory}`}
//           </span>
//         </div>

//         <main className="home-content">
//           <div className="main-content">
//             {featuredArticles.length > 0 && (
//               <section className="featured-news">
//                 <div className="section-header">
//                   <h2>
//                     {selectedCategory === 'Trending'
//                       ? '🔥 Top Trending Stories'
//                       : `⭐ Trending in ${selectedCategory}`}
//                   </h2>
//                   {selectedCategory !== 'Trending' && (
//                     <button
//                       onClick={() => setShowTrendingModal(true)}
//                       className="view-all-button"
//                     >
//                       View All Trending
//                       <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
//                         <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
//                       </svg>
//                     </button>
//                   )}
//                 </div>
//                 <div className="featured-grid">
//                   {featuredArticles.map(article => (
//                     <NewsCard key={article._id} article={article} featured />
//                   ))}
//                 </div>
//               </section>
//             )}

//             {regularArticles.length > 0 ? (
//               <section className="regular-news">
//                 <h2>
//                   {selectedCategory === 'Trending'
//                     ? 'More Trending Articles'
//                     : `All ${selectedCategory} Articles`}
//                 </h2>
//                 <div className="articles-grid">
//                   {regularArticles.map(article => (
//                     <NewsCard key={article._id} article={article} />
//                   ))}
//                 </div>
//               </section>
//             ) : (
//               !featuredArticles.length && (
//                 <div className="no-articles">
//                   <svg width="64" height="64" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
//                     <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" stroke="#888" strokeWidth="2"/>
//                     <path d="M8 14C8 14 9.5 16 12 16C14.5 16 16 14 16 14M9 9H9.01M15 9H15.01" stroke="#888" strokeWidth="2" strokeLinecap="round"/>
//                   </svg>
//                   <h3>No articles found</h3>
//                   <p>Try selecting a different category or tag</p>
//                 </div>
//               )
//             )}
//           </div>

//           {!categoryName && !isMobile && (
//             <aside className="sidebar">
//               <TrendingTags
//                 tags={trendingTags}
//                 selectedTag={selectedTag}
//                 onTagClick={tag => setSelectedTag(tag === selectedTag ? null : tag)}
//               />

//               <div className="sidebar-ad">
//                 <AdSenseAd slotId="sidebar_ad_1" format="rectangle" />
//               </div>
//             </aside>
//           )}
//         </main>
//       </div>

//       {showTrendingModal && (
//         <TrendingModal onClose={() => setShowTrendingModal(false)} />
//       )}
//     </div>
//   );
// };

// export default Home;
