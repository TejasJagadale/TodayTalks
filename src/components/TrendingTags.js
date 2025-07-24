import React from "react";
import "../styles/TrandingTags.css"

const TrendingTags = ({ tags }) => {
  return (
    <div className="trending-tags">
      <h3>Trending Topics</h3>
      <div className="tags-container">
        {tags.map((tag, index) => (
          <a key={index} href={`/tag/${tag.name}`} className="tag">
            {tag.name} 
            {/* <span className="tag-count">{tag.count}</span> */}
          </a>
        ))}
      </div>
    </div>
  );
};

export default TrendingTags;