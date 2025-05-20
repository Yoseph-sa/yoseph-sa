import React, { useState } from "react";
import portfolioJson from "../json/portfolioData.json";

const TabsComponent = () => {
  const [activeTab, setActiveTab] = useState("All");

  const categorys = [
    {
      name: "All",
      value: "All",
    },
    {
      name: "Aramco",
      value: "Aramco",
    },
    {
      name: "IARDA",
      value: "IARDA",
    },
    {
      name: "Mascola",
      value: "Mascola",
    },
    {
      name: "University",
      value: "University",
    },
  ];
  return (
    <div className="container mt-4">
      <ul className="nav nav-tabs m-nav-tabs" id="myTab" role="tablist">
        {categorys.map((category, index) => (
          <li className="nav-item" role="presentation" key={index}>
            <button
              className={`nav-link ${
                category.value === activeTab ? "active" : ""
              }`}
              type="button"
              onClick={() => setActiveTab(category.value)}
            >
              {category.name}
            </button>
          </li>
        ))}
      </ul>

      <div className="tab-content mt-3">
        <div className="tab-pane fade show active">
          <div className="row">
            {portfolioJson
              .filter(
                (item) => activeTab === "All" || item.category === activeTab
              )
              .map((item, index) => (
                <div
                  className="col-lg-4 col-md-4"
                  key={index}
                  data-aos="fade-up"
                  data-aos-delay={index * 100}
                >
                  <a href={`details/${item.id}`} className="port-box">
                    <div className="item-img">
                      <img
                        src={require(`../assets/img/${item.image}`)}
                        className="img-fluid w-100"
                        alt={item.name}
                        loading="lazy"
                      />
                    </div>
                    <h4 className="name">{item.name}</h4>
                    <i className="bi bi-file-earmark-text"></i>
                    <span className="category">{item.category}</span>
                  </a>
                </div>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TabsComponent;
