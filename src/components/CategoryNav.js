import React from 'react';
import { Link } from 'react-router-dom';

const CategoryNav = () => {
  const categories = [
    { name: 'technology', label: 'Technology' },
    { name: 'business', label: 'Business' },
    { name: 'sports', label: 'Sports' },
    { name: 'entertainment', label: 'Entertainment' },
    { name: 'health', label: 'Health' },
    { name: 'science', label: 'Science' },
    { name: 'politics', label: 'Politics' }
  ];

  return (
    <nav className="category-nav">
      {/* <div className="container">
        <ul>
          {categories.map((category) => (
            <li key={category.name}>
              <Link to={`/category/${category.name}`}>{category.label}</Link>
            </li>
          ))}
        </ul>
      </div> */}
    </nav>
  );
};

export default CategoryNav;