import { useEffect, useState } from "react";
import { client } from "../server/sanityClient";
const Contact = () => {
  const [contactData, setContactData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchHome = async () => {
      const query = `*[_type == "homePage"][0]{
          contact {
          phone,
          location,
          email,
          mapIframe
        }
        }`;

      try {
        const data = await client.fetch(query);

        setContactData({
          contact: data?.contact || {},
        });

        setLoading(false);
      } catch (error) {
        console.error("Error fetching home page:", error);
        setLoading(false);
      }
    };

    fetchHome();
  }, []);
  console.log(779461, contactData);

  return (
    <div>
      <div className="container-fluid">
        <div className="row">
          <div className="col-lg-12">
            <iframe
              src={contactData?.contact?.mapIframe || ""}
              width="100%"
              height="150"
              allowfullscreen=""
              loading="lazy"
              referrerpolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>
        </div>
        <div className="row ab-row">
          <div className="col-lg-4">
            <ul className="list-unstyled contact-ul">
              <li>
                <i class="bi bi-phone"></i> {contactData?.contact?.phone || ""}
              </li>
              <li>
                <i class="bi bi-geo-alt"></i>{" "}
                {contactData?.contact?.location || ""}
              </li>
              <li>
                <i class="bi bi-envelope"></i>{" "}
                {contactData?.contact?.email || ""}
              </li>
            </ul>
          </div>
          <div className="col-lg-7 offset-lg-1">
            <div className="con-form">
              <h2 className="small-title">How Can I Help You?</h2>
              <div className="row">
                <div className="col-lg-6">
                  <div className="form-group">
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Full Name"
                    />
                  </div>
                  <div className="form-group">
                    <input
                      type="email"
                      className="form-control"
                      placeholder="Email Address"
                    />
                  </div>
                  <div className="form-group">
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Subject"
                    />
                  </div>
                </div>
                <div className="col-lg-6">
                  <div className="form-group">
                    <textarea
                      className="form-control"
                      placeholder="Message"
                    ></textarea>
                  </div>
                </div>
                <div className="col-lg-12">
                  <button type="submit" class="main-btn home-btn">
                    Send Message
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
