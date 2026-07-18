import "../../styles/Footer.css";
import {
  FaCloud,
  FaGithub,
  FaLinkedin,
  FaPhoneAlt,
  FaEnvelope,

} from "react-icons/fa";

function Footer() {
  return (
    <footer className="footer">

      <div className="footer-container">

        {/* Logo */}

        <div className="footer-section">
          <h2 className="footer-logo">
            <FaCloud />
            Cloud Storage System
          </h2>

          <p>
            Securely upload, manage and access your files anywhere using
            React, FastAPI, PostgreSQL and AWS S3.
          </p>
        </div>

        {/* Quick Links */}

        <div className="footer-section">
          <h3>Quick Links</h3>

          <ul>

            <li
              onClick={() =>
                window.scrollTo({
                  top: 0,
                  behavior: "smooth",
                })
              }
            >
              Home
            </li>

            <li
              onClick={() =>
                document.getElementById("features").scrollIntoView({
                  behavior: "smooth",
                })
              }
            >
              Features
            </li>

            <li
              onClick={() =>
                document.getElementById("preview").scrollIntoView({
                  behavior: "smooth",
                })
              }
            >
              Preview
            </li>

            <li
              onClick={() =>
                document.getElementById("about").scrollIntoView({
                  behavior: "smooth",
                })
              }
            >
              About
            </li>

          </ul>

        </div>

        {/* Contact */}

        <div className="footer-section">

          <h3>Contact</h3>

          <p>
            <FaPhoneAlt />
            +91 9597428933
          </p>

          <p>📍 Coimbatore, India</p>

        </div>

      </div>

      {/* Social */}

      <div className="footer-social">

        <a href="https://github.com/sarannnnnnnnn/"
          target="_blank"
          rel="noopener noreferrer"
        >
          <FaGithub />
        </a>

        <a href="https://www.linkedin.com/in/sarannnn/"
          target="_blank"
          rel="noopener noreferrer"
        >
          <FaLinkedin />
        </a>

        <a href="mailto:saran16062007@gmail.com"
          target="_blank"
          rel="noopener noreferrer"
        >
          <FaEnvelope />
        </a>

      </div>

      <div className="footer-bottom">
        A Cloud Storage System | Designed & Developed by Saran
      </div>

    </footer>
  );
}

export default Footer;