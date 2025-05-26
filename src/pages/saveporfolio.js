import React, { useEffect, useState } from "react";
import portfolioJson from "../json/portfolioData.json";
import { client } from "../common/sanityClient";
import imageUrlBuilder from "@sanity/image-url";

const builder = imageUrlBuilder(client);
function urlFor(source) {
  return builder.image(source);
}
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
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const query = `*[_type == "project2"]{
          _id,
          name,
          image,
          category,
          id,
          userClass,
          years,
          multiImages,
          descriptionTitle,
          shortDescription,
          descriptionImage,
          link {
            title,
            url
          },
          description {
            ProjectOverview { title, content },
            ConceptObjective { title, content },
            DesignProcess {
              title,
              content[] { title, content }
            },
            ResearchInspiration { title, content },
            ProjectHighlights {
              title,
              content[] { title, content }
            },
            conclusion { title, content }
          }
        }`;

      try {
        const data = await client.fetch(query);

        // Map images to URLs
        const projectsWithUrls = data.map((project) => ({
          ...project,
          imageUrl: project.image ? urlFor(project.image).url() : null,
          multiImageUrls:
            project.multiImages?.map((img) => urlFor(img).width(400).url()) ||
            [],
        }));

        setProjects(projectsWithUrls);
      } catch (err) {
        console.error("Error fetching Sanity data:", err);
      }
    };

    fetchData();
  }, []);
  console.log(51251, projects);
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
