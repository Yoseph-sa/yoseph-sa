import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { useTheme } from "../context/ThemeContext";
const CategorySelector = ({ categories = [], activeTab, setActiveTab }) => {
  const { theme } = useTheme();
  console.log(651651, theme);

  return (
    <div className="category-selector d-flex flex-wrap gap-2">
      {/* All Tab */}
      <button
        className={`category-btn  ${activeTab === "All" ? "active" : ""}`}
        onClick={() => setActiveTab("All")}
        style={{ color: theme === "dark" ? "" : "#555" }}
      >
        All
      </button>

      {/* Dynamic Categories */}
      {categories.map((cat, index) => (
        <button
          key={index}
          className={`category-btn ${activeTab === cat.name ? "active" : ""}`}
          onClick={() => setActiveTab(cat.name)}
          style={{ color: theme === "dark" ? "" : "#555" }}
        >
          {cat.name}
        </button>
      ))}
    </div>
  );
};

export default CategorySelector;
