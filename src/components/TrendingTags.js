import React from "react";
import "../styles/TrandingTags.css";

const TrendingTags = ({ tags, selectedTag, onTagClick }) => {
  return (
    <div className="trending-tags">
      <h3>Trending Topics</h3>
      <div className="tags-container">
        {tags.map((tag, index) => (
          <button
            key={index}
            className={`tag ${selectedTag === tag ? 'active' : ''}`}
            onClick={() => onTagClick(tag)}
          >
            {tag}
          </button>
        ))}
      </div>
      {selectedTag && (
        <button 
          className="clear-filter"
          onClick={() => onTagClick(null)}
        >
          Clear Filter
        </button>
      )}
    </div>
  );
};

export default TrendingTags;