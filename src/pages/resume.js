import { useEffect, useState } from "react";

import { client } from "../server/sanityClient";
import imageUrlBuilder from "@sanity/image-url";

const builder = imageUrlBuilder(client);
function urlFor(source) {
  return builder.image(source);
}
const Resume = () => {
  const [resume, setResume] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchResume = async () => {
      try {
        const query = `*[_type == "resume"][0]{
          experience[] {
            yearRangeFrom,
            yearRangeTo,
            title,
            location,
            description
          },
          courses[] {
            title,
            name,
            image {
              asset->{
                url
              }
            }
          },
          skills[] {
            icon,
            name
          }
        }`;

        const data = await client.fetch(query);

        // Map course image URL
        const formattedData = {
          ...data,
          courses: data?.courses?.map((course) => ({
            ...course,
            imageUrl: course?.image?.asset?.url || null,
          })),
        };

        setResume(formattedData);
      } catch (err) {
        console.error("Failed to fetch resume:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchResume();
  }, []);

  return (
    <div>
      <div className="container-fluid entry-content">
        <div className="row">
          <div className="col-lg-12">
            <h2 className="small-title">Experience</h2>

            <div class="timeline">
              {resume?.experience?.map((exp, index) => (
                <div class="timeline-item" key={index} data-aos="fade-up">
                  <h5 class="item-period">
                    {exp?.yearRangeFrom} - {exp?.yearRangeTo}
                  </h5>
                  <span class="item-company">{exp?.location}</span>
                  <h4 class="item-title">{exp?.title}</h4>
                  <div class="text whitespace-pre-wrap">{exp?.description}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      <div className="container-fluid">
        <div className="row ab-row">
          <div className="col-lg-12">
            <h2 className="small-title">Courses</h2>
          </div>
        </div>
        <div className="row">
          {resume?.courses?.map((course, index) => (
            <div className="col-lg-6" key={index} data-aos="fade-right">
              <div className="certificate-item">
                <div className="certi-logo">
                  <img src={course?.imageUrl} alt={course?.name} />
                </div>
                <div className="certi-content">
                  <div className="certi-title">
                    <h4>{course?.title}</h4>
                  </div>
                  <div className="certi-id">
                    <span>{course?.name}</span>
                  </div>
                  <div className="certi-date">
                    <span></span>
                  </div>
                  <div className="certi-company">
                    <span></span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="row ab-row">
          <div className="col-lg-12">
            <h2 className="small-title">Skills</h2>
          </div>
        </div>
        <div className="row">
          {resume?.skills?.map((skill, index) => (
            <div className="col-lg-2 col-md-3" key={index} data-aos="fade-up">
              <div className="lm-info-block">
                <i className={`bi ${skill?.icon}`}></i>

                <h4>{skill?.name}</h4>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Resume;
