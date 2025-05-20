import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import About from "./pages/about-me";
import Resume from "./pages/resume";
import Contact from "./pages/contact";
import Portfolio from "./pages/portfolio";
import Navbar from "./components/Navbar";
import Footer from "./components/footer";
import "./App.css"; // Preloader styles
import AOS from "aos";
import "aos/dist/aos.css"; // AOS styles
import ProjectDetail from "./pages/ProjectDetail";

const App = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true,
    });
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <Router>
      {loading && (
        <div className="preloader">
          <div className="preloader-animation">
            <div className="preloader-spinner"></div>
          </div>
        </div>
      )}
      {!loading && (
        <div className="main-wrapper">
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about-me" element={<About />} />
            <Route path="/resume" element={<Resume />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/portfolio" element={<Portfolio />} />
            <Route path="/details/:id" element={<ProjectDetail />} />
          </Routes>
          <Footer />
        </div>
      )}
    </Router>
  );
};

export default App;
