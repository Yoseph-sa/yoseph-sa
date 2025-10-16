import React, { useEffect, useState } from "react";
import portfolioJson from "../json/portfolioData.json";
import { useNavigate, useParams } from "react-router-dom";
import Gallery from "../components/Gallery";
import { client } from "../server/sanityClient";
import imageUrlBuilder from "@sanity/image-url";

const builder = imageUrlBuilder(client);
function urlFor(source) {
  return builder.image(source);
}
const ProjectDetail = () => {
  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);
  const [allprojects, setAllProjects] = useState([]);

  const navigate = useNavigate();
  const { slug } = useParams();

  useEffect(() => {
    const fetchSingleProject = async () => {
      setLoading(true);
      const query = `*[_type == "project2" && slug.current == $slug][0]{
                        name,
                         image{
                            "url": asset->url
                          },
                        category->{
                          name
                        },
                        id,
                        userClass,
                        years,
                        projectImages[]{
                          "url": asset->url
                        },
                        multiImages[]{
                          "url": asset->url
                        },
                        descriptionTitle,
                        shortDescription,
                         descriptionImage{
                            "url": asset->url
                          },
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
                          impactReflection { title, content },
                          ProjectHighlights {
                            title,
                            content[] { title, content }
                          },
                          conclusion { title, content }
                        },
                        iframes[] {
                          src
                        }
                      }`;

      try {
        const data = await client.fetch(query, { slug });
        console.log(5154, data);

        if (data) {
          setProject(data);
          setLoading(false);
        }
      } catch (error) {
        console.error("Error fetching project detail:", error);
        setLoading(false);
      }
    };
    const fetchAllSlugs = async () => {
      const query = `*[_type == "project2"]{
    "slug": slug.current
  }`;

      try {
        const slugs = await client.fetch(query);
        // slugs = [{ slug: "project-1" }, { slug: "project-2" }, ...]
        setAllProjects(slugs);
      } catch (err) {
        console.error("Error fetching project slugs:", err);
      }
    };
    fetchAllSlugs();
    fetchSingleProject();
  }, [slug]);

  // const project = portfolioJson.find((item) => item.id == id);
  if (!project) {
    return loading ? <div>loading...</div> : <div>Project not found</div>;
  }
  const handleBack = () => {
    const currentIndex = allprojects?.findIndex((p) => p.slug === slug);
    if (currentIndex > 0) {
      navigate(`/${allprojects[currentIndex - 1].slug}`);
    }
  };

  const handleNext = () => {
    const currentIndex = allprojects?.findIndex((p) => p.slug === slug);
    if (currentIndex >= 0 && currentIndex < allprojects?.length - 1) {
      navigate(`/${allprojects[currentIndex + 1].slug}`);
    }
  };

  return (
    <div>
      <div className="container-fluid">
        <div className="row">
          <div className="col-lg-12">
            <div className="nav-portfolio text-end">
              <a onClick={handleBack}>
                <i class="bi bi-chevron-left"></i>
              </a>
              <a onClick={handleNext}>
                <i class="bi bi-chevron-right"></i>
              </a>
            </div>
            <h1 className="detail-title">{project?.name}</h1>
          </div>
        </div>
        <div className="row">
          {/* <div className="col-md-8">
            <img
              src={require(`../assets/img/${project?.image}`)}
              className="img-fluid w-100 rounded"
              alt=""
            />
          </div> */}
          <div className="col-md-8">
            <Gallery project={project} />
          </div>

          <div className="col-md-4">
            <div class="project-description">
              <div class="block-title">
                <h3>Description</h3>
              </div>
              <ul class="project-general-info">
                <li>
                  <p>
                    <i class="bi bi-person-fill"></i> {project?.userClass}
                  </p>
                </li>
                {project?.link?.url && (
                  <li>
                    <p>
                      <i class="bi bi-globe"></i>{" "}
                      <a
                        style={{ color: "#e5b556" }}
                        href={project?.link?.url}
                        target="_blank"
                      >
                        {project?.link?.title}
                      </a>
                    </p>
                  </li>
                )}
                <li>
                  <p>
                    <i class="bi bi-calendar3"></i> {project?.years}
                  </p>
                </li>
              </ul>

              <div class="text-justify">
                {project?.descriptionTitle && (
                  <p>
                    <strong>{project?.descriptionTitle}</strong>
                  </p>
                )}
                {project?.shortDescription && (
                  <p>{project?.shortDescription}</p>
                )}

                {project?.description?.ProjectOverview?.content && (
                  <p>
                    <strong>
                      {project?.description?.ProjectOverview?.title ||
                        "Project Overview"}
                    </strong>
                    <br />
                    {project?.description?.ProjectOverview?.content}
                  </p>
                )}
                {project?.description?.ConceptObjective?.content && (
                  <p>
                    <strong>
                      {project?.description?.ConceptObjective?.title ||
                        "Concept & Objective"}
                    </strong>
                    <br />
                    {project?.description?.ConceptObjective?.content}
                  </p>
                )}
                {project?.description?.DesignProcess?.content && (
                  <>
                    <p>
                      <strong>
                        {project?.description?.DesignProcess?.title ||
                          "Design Process"}
                      </strong>
                    </p>
                    {project?.description?.DesignProcess?.description && (
                      <p>{project?.description?.DesignProcess?.description}</p>
                    )}
                    <ol>
                      {project?.description?.DesignProcess?.content.map(
                        (item, index) => (
                          <li key={index}>
                            {item?.title && <strong>{item?.title}:</strong>}{" "}
                            {item?.content}
                          </li>
                        )
                      )}
                    </ol>
                  </>
                )}

                {project?.description?.ResearchInspiration?.content && (
                  <p>
                    <strong>
                      {project?.description?.ResearchInspiration?.title ||
                        "Research & Inspiration"}
                    </strong>
                    <br />
                    {project?.description?.ResearchInspiration?.content}
                  </p>
                )}
                {project?.description?.impactReflection?.content && (
                  <p>
                    <strong>
                      {project?.description?.impactReflection?.title ||
                        "Impact & Reflection"}
                    </strong>
                    <br />
                    {project?.description?.impactReflection?.content}
                  </p>
                )}
                {project?.description?.ProjectHighlights?.content && (
                  <>
                    <p>
                      <strong>
                        {project?.description?.ProjectHighlights?.title ||
                          "Project Highlights"}
                      </strong>
                    </p>
                    <ul>
                      {project?.description?.ProjectHighlights?.content.map(
                        (item, index) => (
                          <li key={index}>
                            {item?.title && <strong>{item?.title}:</strong>}{" "}
                            {item?.content}
                          </li>
                        )
                      )}
                    </ul>
                  </>
                )}

                {project?.description?.conclusion?.content && (
                  <p>
                    <strong>
                      {project?.description?.conclusion?.title || "conclusion"}
                    </strong>
                    <br />
                    {project?.description?.conclusion?.content}
                  </p>
                )}
                {project?.descriptionImage?.url && (
                  <img
                    src={project?.descriptionImage?.url}
                    className="img-fluid w-100 rounded"
                    alt={project?.name}
                  />
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectDetail;
