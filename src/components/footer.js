import React from "react";
import { Link } from "react-router-dom";

const footer = () => {
    return (
        <footer className="m-footer">
            <div className="container-fluid">
            <div className="row">
                <div className="col-lg-6 col-md-6 col-12 text-lg-start text-center text-md-start">
                <ul class="footer-social-links list-inline list-unstyled">
                                            <li className="list-inline-item">
                            <a href="https://www.instagram.com/yoseph.studio/" target="_blank">Instagram</a>
                        </li>
                                            <li className="list-inline-item">
                            <a href="https://www.linkedin.com/in/yoseph-sa/" target="_blank">Linkedin</a>
                        </li>
                                        </ul>
                </div>
                <div className="col-lg-6 col-md-6 col-12 text-lg-end text-md-end text-center">
                    <p className="copy-p">© 2025 All rights reserved.</p>
                </div>
            </div>
            </div>
        </footer>
    );
};

export default footer;