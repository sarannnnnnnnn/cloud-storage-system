import { useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import {
  FiBell,
  FiSearch,
  FiUploadCloud,
  FiChevronDown,
  FiUser,
} from "react-icons/fi";

import UploadModal from "../UploadModal/UploadModal";

import "./Topbar.css";

const Topbar = ({ fetchDashboard }) => {
  const [showUpload, setShowUpload] = useState(false);

  const navigate = useNavigate();

  // Logged-in user (falls back to Saran if not stored yet)
  const user = JSON.parse(localStorage.getItem("user")) || {};

  return (
    <>
      <motion.header
        className="topbar"
        initial={{ y: -30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        {/* Left */}
        <div className="topbar-left">
          <h2 className="page-title">Dashboard</h2>

          <p className="page-subtitle">
            Manage your cloud storage securely.
          </p>
        </div>

        {/* Right */}
        <div className="topbar-right">

          {/* Search */}
          <motion.div
            className="search-box"
            whileHover={{ scale: 1.02 }}
          >
            <FiSearch className="search-icon" />

            <input
              type="text"
              placeholder="Search files..."
            />
          </motion.div>

          {/* Upload */}
          <motion.button
            className="upload-btn"
            whileHover={{
              scale: 1.05,
              y: -2,
            }}
            whileTap={{
              scale: 0.95,
            }}
            onClick={() => setShowUpload(true)}
          >
            <FiUploadCloud />
            Upload
          </motion.button>

          {/* Notification */}
          <motion.div
            className="icon-btn"
            whileHover={{ scale: 1.1 }}
          >
            <FiBell />
            <span className="notification-dot"></span>
          </motion.div>

          {/* Profile */}
          <motion.div
            className="profile-box"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => navigate("/profile")}
          >
            <div className="profile-icon">
              <FiUser />
            </div>

            <div className="profile-info">
              <h4>{user.name || "Saran"}</h4>
              <span>Cloud User</span>
            </div>

            <FiChevronDown className="dropdown-icon" />
          </motion.div>

        </div>
      </motion.header>

      <UploadModal
        isOpen={showUpload}
        onClose={() => setShowUpload(false)}
        fetchDashboard={fetchDashboard}
      />
    </>
  );
};

export default Topbar;