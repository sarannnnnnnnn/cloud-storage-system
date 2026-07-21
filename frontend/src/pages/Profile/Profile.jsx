import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  FiUser,
  FiMail,
  FiHardDrive,
  FiLogOut,
  FiCheckCircle,
  FiStar,
} from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import api from "../../api/api";

import "./Profile.css";

const Profile = () => {
  const navigate = useNavigate();

  const [user, setUser] = useState(
    JSON.parse(localStorage.getItem("user")) || {}
  );

  const [showConfirm, setShowConfirm] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
  };

  const formatBytes = (bytes = 0) => {
    if (bytes === 0) return "0 Bytes";

    const sizes = ["Bytes", "KB", "MB", "GB", "TB"];
    const i = Math.floor(Math.log(bytes) / Math.log(1024));

    return (
      (bytes / Math.pow(1024, i)).toFixed(2) +
      " " +
      sizes[i]
    );
  };

  const storagePercent = user.storage_limit
    ? (user.storage_used / user.storage_limit) * 100
    : 0;

  const confirmUpgrade = async () => {
    try {
      const res = await api.post("/profile/upgrade-storage");

      setUser(res.data.user);

      localStorage.setItem(
        "user",
        JSON.stringify(res.data.user)
      );

      toast.success("🎉 Storage upgraded to 10 GB!");

      setShowConfirm(false);
    } catch (err) {
      toast.error(
        err.response?.data?.detail || "Upgrade failed."
      );

      setShowConfirm(false);
    }
  };

  return (
    <motion.div
      className="profile-page"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      <motion.div
        className="profile-card"
        initial={{ y: 40, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
      >
        <div className="profile-avatar">
          <FiUser />
        </div>

        <h2>My Profile</h2>

        <div className="profile-details">

          <div className="profile-row">
            <FiUser />
            <span>Username</span>
            <strong>{user.name}</strong>
          </div>

          <div className="profile-row">
            <FiMail />
            <span>Email</span>
            <strong>{user.email}</strong>
          </div>

          <div className="profile-row">
            <FiHardDrive />
            <span>Storage Used</span>
            <strong>{formatBytes(user.storage_used)}</strong>
          </div>

          <div className="profile-row">
            <FiHardDrive />
            <span>Storage Limit</span>
            <strong>{formatBytes(user.storage_limit)}</strong>
          </div>

        </div>

        <div className="upgrade-card">

          <h3>
            <FiStar />
            Storage Upgrade
          </h3>

          <div className="upgrade-row">
            <span>Current Plan</span>

            <strong>
              {user.extra_storage ? "Premium Plan" : "Free Plan"}
            </strong>
          </div>

          <div className="upgrade-row">
            <span>Status</span>

            <strong className={user.extra_storage ? "active" : "inactive"}>
              {user.extra_storage ? "Activated" : "Not Activated"}
            </strong>
          </div>

          <p>
            {user.extra_storage
              ? "Extra 5 GB storage has been activated."
              : "Upgrade from 5 GB to 10 GB instantly."}
          </p>

          <button
            className={
              user.extra_storage
                ? "upgrade-btn activated"
                : "upgrade-btn"
            }
            disabled={user.extra_storage}
            onClick={() => setShowConfirm(true)}
          >
            {user.extra_storage ? (
              <>
                <FiCheckCircle />
                Activated
              </>
            ) : (
              <>
                <FiStar />
                Upgrade to 10 GB
              </>
            )}
          </button>

        </div>

        {showConfirm && (
          <div className="confirm-overlay">
            <div className="confirm-box">

              <h2>⭐ Upgrade Storage</h2>

              <p>
                Upgrade your storage from
                <strong> 5 GB </strong>
                to
                <strong> 10 GB</strong>?
              </p>

              <p>This action can only be performed once.</p>

              <div className="confirm-buttons">

                <button
                  className="cancel-btn"
                  onClick={() => setShowConfirm(false)}
                >
                  Cancel
                </button>

                <button
                  className="upgrade-confirm-btn"
                  onClick={confirmUpgrade}
                >
                  Upgrade
                </button>

              </div>

            </div>
          </div>
        )}

        <button
          className="logout-button"
          onClick={handleLogout}
        >
          <FiLogOut />
          Logout
        </button>

      </motion.div>
    </motion.div>
  );
};

export default Profile;