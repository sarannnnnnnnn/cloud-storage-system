import "../../styles/Preview.css";
import { motion } from "framer-motion";
import {
  FaFolder,
  FaFilePdf,
  FaImage,
  FaVideo,
  FaSearch,
} from "react-icons/fa";

function Preview() {
  return (
    <section id="preview" className="preview">

      <motion.div
        className="preview-left"
        initial={{ opacity: 0, x: -80 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8 }}
      >

        <h2>
          Experience Cloud Storage
          Like Never Before
        </h2>

        <p>
          Manage folders, upload files, preview documents,
          search instantly and organize everything in one place.
        </p>


      </motion.div>

      <motion.div
        className="preview-right"
        initial={{ opacity: 0, x: 80 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8 }}
      >

        <div className="dashboard-preview">

          <div className="dashboard-top">

            <FaSearch />

            <input
              type="text"
              placeholder="Search files..."
              disabled
            />

          </div>

          <div className="dashboard-files">

            <div className="dashboard-file">

              <FaFolder />

              <span>Projects</span>

            </div>

            <div className="dashboard-file">

              <FaFilePdf />

              <span>Resume.pdf</span>

            </div>

            <div className="dashboard-file">

              <FaImage />

              <span>Vacation.png</span>

            </div>

            <div className="dashboard-file">

              <FaVideo />

              <span>Presentation.mp4</span>

            </div>

          </div>

        </div>

      </motion.div>

    </section>
  );
}

export default Preview;