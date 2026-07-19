import { motion } from "framer-motion";
import { FaCloudUploadAlt, FaShieldAlt, FaDatabase } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

import "../../styles/landing/Hero.css";

function Hero() {
  const navigate = useNavigate();

  return (
    <section className="landing-hero" id="hero">

      <div className="landing-hero-glow1"></div>
      <div className="landing-hero-glow2"></div>

      <motion.div
        className="landing-hero-left"
        initial={{ opacity: 0, x: -80 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8 }}
      >

        <h1>

          Store Your Files

          <span> Securely.</span>

          <br />

          Access Them Anywhere.

        </h1>

        <p>

          A secure cloud storage platform powered by AWS S3.
          Upload, manage and access your files with enterprise-grade
          security and lightning-fast performance.

        </p>

        <div className="landing-hero-buttons">

          <button
  className="landing-primary-btn"
  onClick={() => navigate("/register")}
>
  Get Started
</button>

        </div>

      </motion.div>

      <motion.div
        className="landing-hero-right"
        initial={{ opacity: 0, x: 80 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8 }}
      >

        <div className="landing-dashboard-card">

          <h2>Cloud Dashboard</h2>

          <div className="landing-storage">

            <div className="landing-storage-fill"></div>

          </div>

          <p>4.3 GB / 10 GB Used</p>

          <div className="landing-file">

            <FaCloudUploadAlt />

            Resume.pdf

          </div>

          <div className="landing-file">

            <FaShieldAlt />

            Project.zip

          </div>

          <div className="landing-file">

            <FaDatabase />

            Database.sql

          </div>

        </div>

      </motion.div>

    </section>
  );
}

export default Hero;