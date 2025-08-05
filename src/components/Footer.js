import React from "react";
import { Link } from "react-router-dom";
import "../styles/Footer.css";

const Footer = () => {
  return (
    <footer className="site-footer">
      <div className="footer-main">
        <div className="container">
          <div className="footer-column">
            <h3>TodayTalks</h3>
            <p>
              Your trusted source for the latest news and in-depth reporting
              from around the world.
            </p>
          </div>
          {/* <div className="footer-column">
            <h4>Categories</h4>
            <ul>
              <li>
                <Link to="/category/technology">Technology</Link>
              </li>
              <li>
                <Link to="/category/business">Business</Link>
              </li>
              <li>
                <Link to="/category/environment">Environment</Link>
              </li>
              <li>
                <Link to="/category/health">Health</Link>
              </li>
              <li>
                <Link to="/category/entertainment">Entertainment</Link>
              </li>
            </ul>
          </div> */}
          <div className="footer-column">
            <h4>Company</h4>
            <ul>
              {/* <li>
                <Link to="/about">About Us</Link>
              </li> */}
              <li>
                <Link to="/contact">Contact</Link>
              </li>
            </ul>
          </div>
          <div className="footer-column">
            <h4>Legal</h4>
            <ul>
              <li>
                <Link to="/privacypolicy">Privacy Policy</Link>
              </li>
              <li>
                <Link to="/termsandconditions">Terms of Service</Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div className="footer-bottom">
        <div className="container">
          <p>
            &copy; {new Date().getFullYear()} TodayTalks. All rights reserved.
          </p>
          <div className="social-links">
            <a
              href="https://www.facebook.com/profile.php?id=61563928347546#"
              aria-label="Facebook"
            >
              <i className="fab fa-facebook"></i>
            </a>
            <a
              href="https://www.youtube.com/channel/UCrPb4cMJS9FqHIgv4_HwMEA"
              aria-label="YouTube"
            >
              <i className="fab fa-youtube"></i>
            </a>

            <a
              href="https://www.instagram.com/todaytalks4/"
              aria-label="Instagram"
            >
              <i className="fab fa-instagram"></i>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
