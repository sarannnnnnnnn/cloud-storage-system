import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import api from "../../api/api";
import Sidebar from "../../components/Sidebar/Sidebar";
import Topbar from "../../components/Topbar/Topbar";
import "./Notifications.css";

const Notifications = () => {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const response = await api.get("/notifications");
        setNotifications(response.data);
      } catch (error) {
        console.error("Notifications error:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchNotifications();
  }, []);

  return (
    <div className="dashboard">
      <Sidebar />
      <div className="dashboard-content">
        <Topbar />

        <section className="notifications-page">
          <div className="notifications-header">
            <div>
              <p className="notifications-badge">Notifications</p>
              <h1>Recent activity</h1>
              <p className="notifications-subtitle">
                View all your notifications in one place.
              </p>
            </div>
          </div>

          {loading ? (
            <div className="notifications-loading">Loading notifications...</div>
          ) : notifications.length === 0 ? (
            <div className="notifications-empty">
              <p>No notifications available.</p>
            </div>
          ) : (
            <div className="notifications-list">
              {notifications.map((notification) => (
                <motion.div
                  key={notification.id}
                  className="notification-card"
                  whileHover={{ y: -4 }}
                >
                  <div className="notification-card-icon">
                    <span>{notification.type?.charAt(0)?.toUpperCase()}</span>
                  </div>

                  <div className="notification-card-body">
                    <h3>{notification.message}</h3>
                    <p>{new Date(notification.created_at).toLocaleString()}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </section>
      </div>
    </div>
  );
};

export default Notifications;
