import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
const CategorySelector = ({ categories = [], activeTab, setActiveTab }) => {
  return (
    <div className="category-selector d-flex flex-wrap gap-2">
      {/* All Tab */}
      <button
        className={`category-btn ${activeTab === "All" ? "active" : ""}`}
        onClick={() => setActiveTab("All")}
      >
        All
      </button>

      {/* Dynamic Categories */}
      {categories.map((cat, index) => (
        <button
          key={index}
          className={`category-btn ${activeTab === cat.name ? "active" : ""}`}
          onClick={() => setActiveTab(cat.name)}
        >
          {cat.name}
        </button>
      ))}
    </div>
  );
};

export default CategorySelector;
