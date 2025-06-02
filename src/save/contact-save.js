import React from "react";
import { Link } from "react-router-dom";
import demoImg from "../assets/img/demo.jpg";
const Contact = () => {
  return (
    <div>

      <div className="container-fluid">
        <div className="row">
          <div className="col-lg-12">
          <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3622.9490401758635!2d46.64975928001883!3d24.762936321249757!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3e2ee2c3a3c4aa87%3A0xaafb5f848c7db86d!2zUkhHQTc4OTIsIDc4OTIgSWJuIEFtZXIsIDI0MTbYjCDYrdmKINin2YTZhdix2YjYrNiMIFJpeWFkaCAxMjI4MywgU2F1ZGkgQXJhYmlh!5e0!3m2!1sen!2sus!4v1746434888670!5m2!1sen!2sus" width="100%" height="150"  allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>
         
          </div>
        </div>
        <div className="row ab-row">
          <div className="col-lg-4">
            <ul className="list-unstyled contact-ul">
              <li><i class="bi bi-phone"></i> +966566311657</li>
              <li><i class="bi bi-geo-alt"></i> Riyadh, Saudi Arabia</li>
              <li><i class="bi bi-envelope"></i> hello@yoseph.sa</li>
            </ul>
          </div>
          <div className="col-lg-7 offset-lg-1">
            <div className="con-form">
          <h2 className="small-title">How Can I Help You?</h2>
          <div className="row">
            <div className="col-lg-6">
                <div className="form-group">
                  <input type="text" className="form-control" placeholder="Full Name" />
                </div>
                <div className="form-group">
                  <input type="email" className="form-control" placeholder="Email Address" />
                </div>
                <div className="form-group">
                  <input type="text" className="form-control" placeholder="Subject" />
                </div>
            </div>
            <div className="col-lg-6">
              <div className="form-group">
              <textarea className="form-control" placeholder="Message"></textarea>
              </div>
            </div>
            <div className="col-lg-12">
              <button type="submit" class="main-btn home-btn">Send Message</button>
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
