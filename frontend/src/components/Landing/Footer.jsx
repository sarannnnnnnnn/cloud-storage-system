import {
  FaCloud,
  FaGithub,
  FaLinkedin,
  FaEnvelope,
  FaPhoneAlt,
} from "react-icons/fa";

import "../../styles/landing/Footer.css";

function Footer() {
  return (
    <footer className="landing-footer">

      <div className="footer-top">

        {/* Brand */}

        <div className="footer-brand">

          <div className="footer-logo">
            <FaCloud />
          </div>

          <h2>Cloud Storage</h2>

          <p>
            Securely upload, manage and access your files from
            anywhere using FastAPI, PostgreSQL and AWS S3.
          </p>

        </div>

        {/* Built With */}

        <div className="footer-tech">

          <h3>Built With</h3>

          <div className="tech-item">
            <span>⚛</span>
            <p>React + Vite</p>
          </div>

          <div className="tech-item">
            <span>⚡</span>
            <p>FastAPI</p>
          </div>

          <div className="tech-item">
            <span>☁</span>
            <p>AWS S3</p>
          </div>

          <div className="tech-item">
            <span>🐘</span>
            <p>PostgreSQL</p>
          </div>

          <div className="tech-item">
            <span>🔐</span>
            <p>JWT Authentication</p>
          </div>

        </div>

        {/* Contact */}

        <div className="footer-contact">

          <h3>Contact</h3>

          <p>
            <FaEnvelope />
            saran16062007@gmail.com
          </p>
          <p>
    <FaPhoneAlt />
    +91 95974 28933
  </p>

          <div className="footer-social">

            <a href="https://github.com/sarannnnnnnnn/"
            target="_blank" rel="noopener noreferrer">
              <FaGithub />
            </a>

            <a href="https://www.linkedin.com/in/sarannnn"
            target="_blank" rel="noopener noreferrer">
              <FaLinkedin />
            </a>

          </div>

        </div>

      </div>

      <div className="footer-bottom">

        <p>
          A Cloud Storage System | Developed & Designed by Saran
        </p>

      </div>

    </footer>
  );
}

export default Footer;