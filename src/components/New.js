import React, { useEffect, useState } from "react";
import "../styles/News.css";

const New = () => {
  const [articles, setArticles] = useState([]);
  const API_KEY = "70a602f222cc10d6b5bbbdc87505da5a"; // Replace with your key
  const URL = `https://gnews.io/api/v4/top-headlines?lang=en&country=in&max=10&apikey=${API_KEY}`;

  useEffect(() => {
    fetch(URL)
      .then((res) => res.json())
      .then((data) => {
        setArticles(data.articles);
      })
      .catch((err) => console.error("Error fetching news:", err));
  }, []);

  return (
    <div className="news-container">
      <h1>Latest News</h1>
      <div className="news-grid">
        {articles.map((article, index) => (
          <div className="news-card1" key={index}>
            <img src={article.image} alt={article.title} />
            <div className="news-content">
              <h3>{article.title}</h3>
              <p>{article.description}</p>
              <a href={article.url} target="_blank" rel="noreferrer">
                Read More
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default New