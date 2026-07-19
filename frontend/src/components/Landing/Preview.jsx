import { motion } from "framer-motion";
import {
  FaFilePdf,
  FaImage,
  FaVideo,
  FaFolder,
  FaCloudUploadAlt,
} from "react-icons/fa";

import "../../styles/landing/Preview.css";
import { useNavigate } from "react-router-dom";

function Preview() {
  const navigate = useNavigate();
  return (
    <section className="landing-preview" id="preview">

      <motion.div
        className="landing-preview-left"
        initial={{ opacity: 0, x: -70 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >

        <span className="landing-preview-tag">
          Dashboard Preview
        </span>

        <h2>
          Beautiful Dashboard
          <span> Designed For Productivity.</span>
        </h2>

        <p>
          Organize files, upload instantly, monitor storage,
          and manage everything from one modern dashboard.
        </p>

        <button className="landing-primary-btn"
      onClick={() => navigate("/login")}>
          <FaCloudUploadAlt />
          Start Uploading
        </button>

      </motion.div>

      <motion.div
        className="landing-preview-right"
        initial={{ opacity: 0, x: 70 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >

        <div className="landing-preview-card">

          <div className="landing-preview-top">

            <h3>Cloud Storage</h3>

            <span>10 GB</span>

          </div>

          <div className="landing-preview-storage">

            <div className="landing-preview-fill"></div>

          </div>

          <p>6.9 GB Used</p>

          <div className="landing-preview-files">

            <div className="landing-preview-file">
              <FaFilePdf />
              Resume.pdf
            </div>

            <div className="landing-preview-file">
              <FaImage />
              Vacation.png
            </div>

            <div className="landing-preview-file">
              <FaVideo />
              Demo.mp4
            </div>

            <div className="landing-preview-file">
              <FaFolder />
              Projects
            </div>

          </div>

        </div>

      </motion.div>

    </section>
  );
}

export default Preview;