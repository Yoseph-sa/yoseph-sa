import React from "react";
import { Link } from "react-router-dom";
import mainImg from "../assets/img/Front-Page.png";
const Home = () => {
  return (
    <div>
      <div className="home-main">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-lg-10">
              <div className="row">
                <div className="col-lg-5 my-auto">
                  <img src={mainImg} className="img-fluid w-100 "  data-aos="fade-right" data-aos-delay="700" alt="" />
                </div>
                <div className="col-lg-7 my-auto">
                  <div className="main-con">
                    <h4  data-aos="fade-left" data-aos-delay="300">Graphic Designer</h4>
                    <h1  data-aos="fade-left" data-aos-delay="600">Yoseph Aljohani</h1>
                    <p data-aos="fade-left" data-aos-delay="900">  I help brands tell their stories through visually engaging and strategically crafted content. My work spans various roles across startups and corporate environments, where I've successfully transformed brand identities and driven digital communication. I focus on creating impactful, cohesive experiences that resonate with audiences, blending creativity with strategy to ensure every design and campaign enhances brand visibility and engagement. Let's create something extraordinary.</p>
                    <a  data-aos="fade-left" data-aos-delay="1200" href="/about-me" className="main-btn home-btn">About Me</a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
