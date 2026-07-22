import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import {
  FiBell,
  FiUploadCloud,
  FiChevronDown,
  FiUser,
  FiMenu,
} from "react-icons/fi";

import api from "../../api/api";
import Notifications from "../Notifications/Notifications";
import UploadModal from "../UploadModal/UploadModal";

import "./Topbar.css";

const Topbar = ({ fetchDashboard }) => {
  const [showUpload, setShowUpload] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [notificationCount, setNotificationCount] = useState(0);

  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem("user")) || {};
  const openSidebar = () => {
  window.dispatchEvent(new Event("openSidebar"));
};

  const loadNotifications = async () => {
    try {
      const res = await api.get("/notifications");

      const unread = res.data.filter((n) => !n.is_read).length;

      setNotificationCount(unread);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    loadNotifications();

    const interval = setInterval(loadNotifications, 3000);

    return () => clearInterval(interval);
  }, []);

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

<button
className="mobile-menu-btn"
onClick={openSidebar}
>

<FiMenu />

</button>
          <h2 className="page-title">Dashboard</h2>

          <p className="page-subtitle">
            Manage your cloud storage securely.
          </p>
        </div>

        {/* Right */}
        <div className="topbar-right">

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
          <div style={{ position: "relative" }}>
            <motion.div
              className="icon-btn"
              whileHover={{ scale: 1.08 }}
              whileTap={{ scale: 0.95 }}
              onClick={() =>
                setShowNotifications(!showNotifications)
              }
            >
              <FiBell />

              {notificationCount > 0 && (
                <span className="notification-dot">
                  {notificationCount}
                </span>
              )}
            </motion.div>

            <Notifications
              open={showNotifications}
              onClose={() => setShowNotifications(false)}
            />
          </div>

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