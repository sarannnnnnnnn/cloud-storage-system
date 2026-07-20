import "./Welcome.css";
import { motion } from "framer-motion";
import {
  FiHardDrive,
  FiFolder,
  FiCheckCircle,
  FiCalendar,
} from "react-icons/fi";

const Welcome = ({ dashboard }) => {
  // Format file sizes automatically (Bytes, KB, MB, GB, TB)
  const formatFileSize = (bytes) => {
    if (bytes === 0) return "0 Bytes";

    const units = ["Bytes", "KB", "MB", "GB", "TB"];
    const index = Math.floor(Math.log(bytes) / Math.log(1024));

    return `${(bytes / Math.pow(1024, index)).toFixed(2)} ${units[index]}`;
  };

  const today = new Date().toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
    year: "numeric",
  });

  return (
    <motion.section
      className="welcome"
      initial={{ opacity: 0, y: 25 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      {/* Left */}
      <div className="welcome-left">
        <div className="date">
          <FiCalendar />
          <span>{today}</span>
        </div>

        <h1>
          Welcome back, <span>{dashboard.username}</span> 👋
        </h1>

        <p>
          Manage your cloud files securely using AWS Cloud Storage.
        </p>

        <div className="welcome-stats">
          <div className="mini-card">
            <FiFolder />
            <div>
              <h2>{dashboard.total_files}</h2>
              <span>Total Files</span>
            </div>
          </div>

          <div className="mini-card">
            <FiHardDrive />
            <div>
              <h2>{formatFileSize(dashboard.storage_used)}</h2>
              <span>Storage Used</span>
            </div>
          </div>

          <div className="mini-card">
            <FiCheckCircle />
            <div>
              <h2>Online</h2>
              <span>Cloud Status</span>
            </div>
          </div>
        </div>
      </div>

      {/* Right */}
      <div className="welcome-right">
        <div className="cloud-glow"></div>

        <img
          src="https://cdn-icons-png.flaticon.com/512/4144/4144516.png"
          alt="Cloud"
        />

        <div className="storage-box">
          <span>Storage</span>

          <h2>
            {formatFileSize(dashboard.storage_used)}
            {" / "}
            {formatFileSize(dashboard.storage_limit)}
          </h2>
        </div>
      </div>
    </motion.section>
  );
};

export default Welcome;