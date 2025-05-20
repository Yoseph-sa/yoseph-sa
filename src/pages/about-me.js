import React from "react";
import moonLightImage from "../assets/img/Moonlight.png";
import Exp from "../components/aboutExp";
import demoImg from "../assets/img/demo.jpg";
import CraftThroughImage from "../assets/img/2018.04.19.png";

const About = () => {
  return (
    <div>
      <div className="container-fluid">
        <div className="row g-0">
          <div className="col-lg-6">
            <div className="about-main entry-content">
              <h2 class="main-title">About me</h2>
              <p>I help brands tell their stories through visually engaging, strategically crafted content. My experience spans roles in both startups and corporate settings, where I’ve transformed brand identities and enhanced digital communication. With a focus on creating impactful, cohesive experiences, I blend creativity with strategy to elevate brand visibility and engagement.</p>
              <p>Throughout my career, I’ve developed a strong understanding of how design and digital content come together to create compelling narratives. From helping startups establish their brand to collaborating with larger organizations to refine their digital presence, my work is guided by each brand’s unique vision and goals.</p>
              <p>Creativity fuels my work, but clear communication and teamwork drive its success. I work closely with all stakeholders to ensure each project not only meets expectations but also creates lasting value with targeted audiences.</p>
              <p>I’m passionate about visual storytelling, design, and content creation, and bring this passion into every project. My aim is to craft thoughtful, meaningful work that engages and inspires.</p>
            </div>
          </div>
          <div className="col-lg-6">
            <div className="ab-img">
              <div className="inner-img">

              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="container-fluid entry-content">
        <div className="row ab-row">
          <div className="col-lg-4">
            <h2 className="small-title">From Passion to Profession.</h2>
            <p class="p1">Ever since I can remember, design has been a cornerstone of my life. As a child, I found immense joy in creating—whether it was decorating my school books or crafting personalized designs for my assignments. These early experiences sparked a passion that has guided me through every stage of my career. Starting with active participation in online design communities, such as <strong>Kooora.com</strong>, I explored new ways to express creativity and connect with like-minded individuals, laying the foundation for my career in design and digital communication.</p>
          </div>
          <div className="col-lg-4">
            <img src={moonLightImage} className="img-fluid w-100 rounded" alt="" />
          </div>
        </div>
        <div className="row ab-row">
          <div className="col-lg-4">
            <h2 className="small-title">Elevating My Craft Through Education.</h2>
            <p class="p1">My formal journey in design took off in the United States, where I pursued a degree in Graphic Design. During my time at the University of New Haven, I cultivated my creative vision and gained recognition for my unique approach to visual storytelling and communication. From winning design competitions to being featured on the Dean’s List, my university years were marked by constant growth. I embraced every opportunity—whether it was creating award-winning event posters or designing the university’s official tie.</p>
            <p>A significant part of my education involved blending modern design principles with <strong>Islamic art,</strong> bringing cultural elements into my work in new and meaningful ways. This fusion of tradition and modernity became a signature of my style and an important aspect of my creative and communication identity.</p>

          </div>
          <div className="col-lg-4">
            <img src={CraftThroughImage} className="img-fluid w-100 rounded" alt="" />
          </div>
        </div>
        <div className="row ab-row">
          <div className="col-lg-4">

            <p>Concerning classes, I consistently contributed to the department's success by taking the lead on multiple occasions, guiding fellow students to elevate the quality of our projects. I cultivated positive relationships with both staff and students, and many of them remain in contact with me to this day.</p>
            <p>On the technical front, my focus centered on showcasing the beauty of Islamic art and demonstrating its seamless integration into the modern realm of design. Throughout numerous projects, I incorporated elements of Islamic art into the final products, imparting a distinctive touch to my designs.</p>
          </div>
          <div className="col-lg-4">
            <img src={demoImg} className="img-fluid w-100 rounded" alt="" />
          </div>
        </div>

      </div>
      <div className="container-fluid">
        <div className="row ab-row">
          <div className="col-lg-6">
          <h2 className="small-title">Professional Experience: Building Brands and Driving Strategy.</h2>
          </div>
        </div>
        <Exp />
        <div className="row ab-row">
          <div className="col-lg-12">
          <h2 className="small-title">What Drives Me.</h2>
          <p>At the core of my work is a passion for merging creativity with strategy. My goal is to not only create visually stunning designs but also ensure that every piece of content contributes to the broader narrative of the brand. Whether I’m developing a new digital campaign, creating a visual identity from scratch, or collaborating with business leaders, my focus is always on delivering strategic, impactful communication and design solutions that drive engagement and elevate the brand.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
