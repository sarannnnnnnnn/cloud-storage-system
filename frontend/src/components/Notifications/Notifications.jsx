// frontend/src/components/Notifications/Notifications.jsx

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FiBell,
  FiUploadCloud,
  FiTrash2,
  FiRefreshCcw,
  FiEdit2,
  FiXCircle,
  FiAlertTriangle,
} from "react-icons/fi";

import api from "../../api/api";
import "./Notifications.css";

export default function Notifications({ open, onClose }) {
  const [notifications, setNotifications] = useState([]);
  const [showClear, setShowClear] = useState(false);

  const boxRef = useRef();

  useEffect(() => {
    if (!open) return;

    loadNotifications();

    const handler = (e) => {
      if (boxRef.current && !boxRef.current.contains(e.target)) {
        onClose();
      }
    };

    document.addEventListener("mousedown", handler);

    return () =>
      document.removeEventListener("mousedown", handler);
  }, [open]);

  const loadNotifications = async () => {
    try {
      const res = await api.get("/notifications");
      setNotifications(res.data);
    } catch {}
  };

  const icon = (type) => {
    switch (type) {
      case "upload":
        return <FiUploadCloud className="n-icon blue" />;
      case "trash":
        return <FiTrash2 className="n-icon red" />;
      case "restore":
        return <FiRefreshCcw className="n-icon green" />;
      case "rename":
        return <FiEdit2 className="n-icon orange" />;
      case "delete":
        return <FiXCircle className="n-icon darkred" />;
      default:
        return <FiBell className="n-icon" />;
    }
  };

  const clearAll = async () => {
    try {
      await api.delete("/notifications/clear");
      setNotifications([]);
      setShowClear(false);
    } catch {}
  };

  if (!open) return null;

  return (
    <>
      <AnimatePresence>
        <motion.div
          ref={boxRef}
          className="notify-box"
          initial={{ opacity: 0, y: -15 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -15 }}
        >
          <div className="notify-header">
            <h3>Notifications</h3>

            {notifications.length > 0 && (
              <button
                onClick={() => setShowClear(true)}
                className="clear-all"
              >
                Clear All
              </button>
            )}
          </div>

          <div className="notify-list">
            {notifications.length === 0 ? (
              <div className="notify-empty">
                <FiBell />
                <p>No Notifications</p>
              </div>
            ) : (
              notifications.map((item) => (
                <motion.div
                  key={item.id}
                  whileHover={{ scale: 1.02 }}
                  className="notify-card"
                >
                  {icon(item.type)}

                  <div className="notify-content">
                    <h4>{item.message}</h4>

                    <span>
                      {new Date(
                        item.created_at
                      ).toLocaleString()}
                    </span>
                  </div>

                  {!item.is_read && (
                    <div className="blue-dot"></div>
                  )}
                </motion.div>
              ))
            )}
          </div>
        </motion.div>
      </AnimatePresence>

      <AnimatePresence>
        {showClear && (
          <motion.div
            className="modal-bg"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="clear-modal"
              initial={{ scale: .85 }}
              animate={{ scale: 1 }}
            >
              <div className="warning-circle">
                <FiAlertTriangle />
              </div>

              <h2>Clear Notifications</h2>

              <p>
                This action cannot be undone.
              </p>

              <div className="modal-actions">
                <button
                  className="cancel"
                  onClick={() =>
                    setShowClear(false)
                  }
                >
                  Cancel
                </button>

                <button
                  className="delete"
                  onClick={clearAll}
                >
                  Clear All
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}