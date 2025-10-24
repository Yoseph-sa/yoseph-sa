import React, { useEffect, useState } from "react";
import portfolioJson from "../json/portfolioData.json";
import { client } from "../server/sanityClient";
import imageUrlBuilder from "@sanity/image-url";
import CategorySelector from "../components/CategorySelector";

const builder = imageUrlBuilder(client);
function urlFor(source) {
  return builder.image(source);
}
const TabsComponent = () => {
  const [activeTab, setActiveTab] = useState("All");
  const [categories, setCategories] = useState([]);

  const [projects, setProjects] = useState([]);

  useEffect(() => {
    const fetchCategorys = async () => {
      const query = `*[_type == "categorys"]{
         
          name
        }`;
      try {
        const data = await client.fetch(query);
        setCategories(data);
        console.log(745120, data);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };
    fetchCategorys();

    const fetchData = async () => {
      const query = `*[_type == "project2"]{
         
          name,
          "slug": slug.current,   // <--- fetch only the string
            image{
              "url": asset->url
            },
          categories[]->{    // note the [] for array
            name
          },
          projectid
        }`;

      try {
        const data = await client.fetch(query);
        console.log(565161, data);

        setProjects(data);
      } catch (err) {
        console.error("Error fetching Sanity data:", err);
      }
    };

    fetchData();
  }, []);

  const filteredProjects = projects.filter((project) => {
    if (activeTab === "All") return true; // All projects

    // Check if any of the categories match the activeTab
    return project?.categories?.some((cat) => cat.name === activeTab);
  });
  return (
    <div className="container mt-4">
      {/* <ul className="nav nav-tabs m-nav-tabs" id="myTab" role="tablist">
        <li className="nav-item" role="presentation">
          <button
            className={`nav-link ${"All" === activeTab ? "active" : ""}`}
            type="button"
            onClick={() => setActiveTab("All")}
          >
            All
          </button>
        </li>
        {categories?.map((category, index) => (
          <li className="nav-item" role="presentation" key={index}>
            <button
              className={`nav-link ${
                category.name === activeTab ? "active" : ""
              }`}
              type="button"
              onClick={() => setActiveTab(category.name)}
            >
              {category?.name}
            </button>
          </li>
        ))}
      </ul> */}
      <CategorySelector
        categories={categories}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
      />

      <div className="tab-content mt-3">
        <div className="tab-pane fade show active">
          <div className="row">
            {filteredProjects?.map((item, index) => {
              const slug = item.slug;
              return (
                <div
                  className="col-lg-4 col-md-4"
                  key={index}
                  data-aos="fade-up"
                  data-aos-delay={index * 100}
                >
                  <a href={`/${slug}`} className="port-box">
                    <div className="item-img">
                      <img
                        src={item?.image?.url}
                        className="img-fluid w-100"
                        alt={item.name}
                        loading="lazy"
                      />
                    </div>
                    <h4 className="name">{item.name}</h4>
                    {/* <i className="bi bi-file-earmark-text"></i> */}

                    <div className="category-item">
                      <span className="category portfolio-card-heading">{item.name}</span>
                      <span className="category">
                        {item?.categories?.map((cat) => cat.name).join(", ")}
                      </span>
                    </div>
                  </a>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TabsComponent;
