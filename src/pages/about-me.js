import { useEffect, useState } from "react";
import moonLightImage from "../assets/img/Moonlight.png";
import Exp from "../components/aboutExp";
import demoImg from "../assets/img/demo.jpg";
import CraftThroughImage from "../assets/img/2018.04.19.png";
import { client } from "../server/sanityClient";
import imageUrlBuilder from "@sanity/image-url";

const builder = imageUrlBuilder(client);
function urlFor(source) {
  return builder.image(source);
}
const About = () => {
  const [about, setAbout] = useState(null);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const fetchAboutPage = async () => {
      setLoading(true);
      const query = `*[_type == "aboutPage"][0]{
        aboutHeader {
          title,
          description,
          coverImage
        },
        descriptionSections[] {
          title,
          description,
          multiImages
        },
        brands {
          title,
          items[] {
            name,
            yearFrom,
            yearTo,
            description
          }
        },
        whatDrivesMe {
          title,
          description
        }
      }`;

      try {
        const data = await client.fetch(query);

        const formatted = {
          ...data,
          aboutHeader: {
            ...data.aboutHeader,
            coverImageUrl: data.aboutHeader?.coverImage
              ? urlFor(data.aboutHeader.coverImage).url()
              : null,
          },
          descriptionSections:
            data.descriptionSections?.map((sec) => ({
              ...sec,
              imageUrls:
                sec.multiImages?.map((img) => urlFor(img).width(500).url()) ||
                [],
            })) || [],
          brands: {
            ...data.brands,
            items: data.brands?.items || [],
          },
        };

        setAbout(formatted);
        setLoading(false);
      } catch (error) {
        console.error("Failed to fetch About Page:", error);
        setLoading(false);
      }
    };

    fetchAboutPage();
  }, []);

  return (
    <div>
      <div className="container-fluid">
        <div className="row g-0">
          <div className="col-lg-6">
            <div className="about-main entry-content">
              <h2 class="main-title">{about?.aboutHeader?.title}</h2>
              <p className="whitespace-pre-wrap ">
                {about?.aboutHeader?.description}
              </p>
            </div>
          </div>
          <div className="col-lg-6">
            <div className="ab-img">
              <div className="">
                <img src={about?.aboutHeader?.coverImageUrl} alt="" />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="container-fluid entry-content">
        {about?.descriptionSections?.map((sec, index) => (
          <div className="row ab-row">
            <div className="col-lg-4">
              {sec?.title && <h2 className="small-title">{sec?.title}</h2>}
              <p class="p1 whitespace-pre-wrap">{sec?.description}</p>
            </div>
            <div className="col-lg-4">
              {sec?.imageUrls?.map((img, i) => (
                <div key={i}>
                  <img src={img} alt="" />
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
      <div className="container-fluid">
        <div className="row ab-row">
          <div className="col-lg-6">
            <h2 className="small-title">
              {about?.brands?.title}
            </h2>
          </div>
        </div>
        <Exp aboutExp={about?.brands?.items}/>
        <div className="row ab-row">
          <div className="col-lg-12">
            <h2 className="small-title">{about?.whatDrivesMe?.title}</h2>
            <p className="whitespace-pre-wrap">
              {about?.whatDrivesMe?.description}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
