import React, { useState } from "react";
import "../styles/SearchBar.css"

const SearchBar = () => {
  const [query, setQuery] = useState("");
  const [isFocused, setIsFocused] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    // In a real app, you would handle the search
    console.log("Searching for:", query);
  };

  return (
    <form
      className={`search-bar ${isFocused ? "focused" : ""}`}
      onSubmit={handleSubmit}
    >
      <input
        className="search-inputbar"
        type="text"
        placeholder="Search news..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
      />
      <button type="submit">
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