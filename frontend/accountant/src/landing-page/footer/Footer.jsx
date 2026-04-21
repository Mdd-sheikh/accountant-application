import React from "react";
import "./Footer.css";
import { assests } from "../../assets/assests";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="section-inner">

        {/* TOP */}
        <div className="footer-top">

          {/* BRAND */}
          <div className="footer-brand">
            <img
              src={assests.logo}
              alt="Bookwise Logo"
              className="footer-logo"
            />

            <p className="footer-tagline">
              The modern invoice billing platform built for businesses who
              value speed, clarity, and getting paid on time.
            </p>
          </div>

          {/* COLUMN 1 */}
          <div>
            <div className="footer-col-title">Product</div>

            <ul className="footer-links">
              <li><a href="#">Features</a></li>
              <li><a href="#">Pricing</a></li>
              <li><a href="#">Integrations</a></li>
              <li><a href="#">Changelog</a></li>
              <li><a href="#">Roadmap</a></li>
            </ul>
          </div>

          {/* COLUMN 2 */}
          <div>
            <div className="footer-col-title">Company</div>

            <ul className="footer-links">
              <li><a href="#">About</a></li>
              <li><a href="#">Blog</a></li>
              <li><a href="#">Careers</a></li>
              <li><a href="#">Press</a></li>
              <li><a href="#">Contact</a></li>
            </ul>
          </div>

          {/* COLUMN 3 */}
          <div>
            <div className="footer-col-title">Legal</div>

            <ul className="footer-links">
              <li><a href="#">Privacy Policy</a></li>
              <li><a href="#">Terms of Service</a></li>
              <li><a href="#">Security</a></li>
              <li><a href="#">GDPR</a></li>
            </ul>
          </div>

        </div>

        {/* BOTTOM */}
        <div className="footer-bottom">

          <span>© 2026 Bookwise. All rights reserved.</span>

          <div className="footer-bottom-links">
            <a href="#">Twitter</a>
            <a href="#">LinkedIn</a>
            <a href="#">GitHub</a>
          </div>

        </div>

      </div>
    </footer>
  );
};

export default Footer;