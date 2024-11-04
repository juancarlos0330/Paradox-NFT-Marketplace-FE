import React from "react";
import FooterLogo from "../assets/image/explore_logo.png";
import { Link } from "react-router-dom";

const Footer = () => {
  const scrollTopfunc = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="footer">
      <div className="main">
        <div className="section">
          <div className="lsection">
            <span>Copyright © Paradox Labs Inc 2022. All rights reserved.</span>
          </div>
          <div className="msection">
            <img src={FooterLogo} alt="footer-logo" />
            <div className="footer-marker" onClick={() => scrollTopfunc()}>
              <svg
                width="54"
                height="54"
                viewBox="0 0 54 54"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <g opacity="0.5">
                  <path
                    d="M9 53L0.999999 53L1 45"
                    stroke="white"
                    strokeLinecap="square"
                  ></path>
                  <path
                    d="M53 45L53 53L45 53"
                    stroke="white"
                    strokeLinecap="square"
                  ></path>
                  <path
                    d="M9 1L0.999999 1L1 9"
                    stroke="white"
                    strokeLinecap="square"
                  ></path>
                  <path
                    d="M53 9L53 0.999999L45 0.999999"
                    stroke="white"
                    strokeLinecap="square"
                  ></path>
                </g>
                <path
                  d="M27 37V18M27 18L19 25.9677M27 18L35 25.9677"
                  stroke="white"
                  strokeWidth="2"
                ></path>
              </svg>
            </div>
          </div>
          <div className="rsection">
            <Link to="/contact" className="footera">
              Support
            </Link>
            <a
              href="https://static.rarible.com/privacy.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="footera"
            >
              Privacy policy
            </a>
            <a
              href="https://static.rarible.com/terms.pdf"
              rel="noopener noreferrer"
              target="_blank"
              className="footera"
            >
              Terms
            </a>
          </div>
          <div
            className="footer-scroll-section"
            onClick={() => scrollTopfunc()}
          >
            <svg
              width="54"
              height="54"
              viewBox="0 0 54 54"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <g opacity="0.5">
                <path
                  d="M9 53L0.999999 53L1 45"
                  stroke="white"
                  strokeLinecap="square"
                ></path>
                <path
                  d="M53 45L53 53L45 53"
                  stroke="white"
                  strokeLinecap="square"
                ></path>
                <path
                  d="M9 1L0.999999 1L1 9"
                  stroke="white"
                  strokeLinecap="square"
                ></path>
                <path
                  d="M53 9L53 0.999999L45 0.999999"
                  stroke="white"
                  strokeLinecap="square"
                ></path>
              </g>
              <path
                d="M27 37V18M27 18L19 25.9677M27 18L35 25.9677"
                stroke="white"
                strokeWidth="2"
              ></path>
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
