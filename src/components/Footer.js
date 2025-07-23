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
              Your trusted source for the latest news and in-depth reporting from
              around the world.
            </p>
          </div>
          <div className="footer-column">
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
          </div>
          <div className="footer-column">
            <h4>Company</h4>
            <ul>
              <li>
                <Link to="/about">About Us</Link>
              </li>
              <li>
                <Link to="/contact">Contact</Link>
              </li>
              <li>
                <Link to="/careers">Careers</Link>
              </li>
              <li>
                <Link to="/advertise">Advertise</Link>
              </li>
            </ul>
          </div>
          <div className="footer-column">
            <h4>Legal</h4>
            <ul>
              <li>
                <Link to="/privacy">Privacy Policy</Link>
              </li>
              <li>
                <Link to="/terms">Terms of Service</Link>
              </li>
              <li>
                <Link to="/cookies">Cookie Policy</Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div className="footer-bottom">
        <div className="container">
          <p>
            &copy; {new Date().getFullYear()} NewsHub. All rights reserved.
          </p>
          <div className="social-links">
            <a href="https://facebook.com" aria-label="Facebook">
              <i className="icon-facebook"></i>
            </a>
            <a href="https://twitter.com" aria-label="Twitter">
              <i className="icon-twitter"></i>
            </a>
            <a href="https://instagram.com" aria-label="Instagram">
              <i className="icon-instagram"></i>
            </a>
            <a href="https://linkedin.com" aria-label="LinkedIn">
              <i className="icon-linkedin"></i>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;