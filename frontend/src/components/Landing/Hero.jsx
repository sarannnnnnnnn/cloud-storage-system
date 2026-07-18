import { motion } from "framer-motion";
import "../../styles/Hero.css";

function Hero() {
  return (
    <section id="home" className="hero">

      <div className="hero-left">

        <motion.h1
          initial={{ opacity: 0, y: -40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          Store Your Files
          <br />
          Securely In The Cloud
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          Upload, organize and access your files anywhere
          using AWS S3 powered cloud storage.
        </motion.p>

        <motion.div
          className="hero-buttons"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          <button className="primary-btn">
            Get Started
          </button>

        </motion.div>

      </div>

      <motion.div
        className="hero-right"
        initial={{ opacity: 0, x: 80 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 1 }}
      >

        <div className="dashboard-card">

          <h2>Cloud Dashboard</h2>

          <div className="storage-bar">
            <div className="storage-fill"></div>
          </div>

          <p>4.2 GB of 10 GB Used</p>

          <div className="fake-files">

            <div className="file">📄 Resume.pdf</div>

            <div className="file">🖼 Photo.png</div>

            <div className="file">🎥 Video.mp4</div>

          </div>

        </div>

      </motion.div>

    </section>
  );
}

export default Hero;