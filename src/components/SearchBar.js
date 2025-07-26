import React, { useState, useEffect } from "react";
import "../styles/SearchBar.css";
import { useNavigate, useLocation } from "react-router-dom";

const SearchBar = ({ selectedCategory }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [query, setQuery] = useState("");
  const [isFocused, setIsFocused] = useState(false);

  // Initialize search query from URL
  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const urlQuery = searchParams.get("q");
    if (urlQuery) {
      setQuery(decodeURIComponent(urlQuery));
    }
  }, [location.search]);

  const handleSearch = (e) => {
    e.preventDefault();
    if (query.trim()) {
      navigate(
        `/category/${selectedCategory}?q=${encodeURIComponent(query.trim())}`
      );
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleSearch(e);
    }
  };

  return (
    <form
      className={`search-bar ${isFocused ? "focused" : ""}`}
      onSubmit={handleSearch}
    >
      <input
        className="search-inputbar"
        type="text"
        placeholder="Search news..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        onKeyDown={handleKeyDown}
      />
      <button type="submit" aria-label="Search">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <circle cx="11" cy="11" r="8"></circle>
          <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
        </svg>
      </button>
    </form>
  );
};

export default SearchBar;
