import { motion } from "framer-motion";
import { NavLink } from "react-router-dom";
import {
  FiHome,
  FiFolder,
  FiTrash2,
  FiSettings,
  FiLogOut,
  FiHardDrive,
} from "react-icons/fi";

import "./Sidebar.css";

const Sidebar = () => {
  const menuItems = [
    {
      name: "Dashboard",
      icon: <FiHome />,
      path: "/dashboard",
    },
    {
      name: "My Files",
      icon: <FiFolder />,
      path: "/files",
    },
    {
      name: "Trash",
      icon: <FiTrash2 />,
      path: "/trash",
    },
    {
      name: "Settings",
      icon: <FiSettings />,
      path: "/settings",
    },
  ];

  return (
    <motion.aside
      className="sidebar"
      initial={{ x: -80, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ duration: 0.6 }}
    >
      {/* Logo */}

      <div className="sidebar-logo">

        <div className="logo-circle">

          <FiHardDrive />

        </div>

        <div>

          <h2>CloudBox</h2>

          <span>Cloud Storage</span>

        </div>

      </div>

      {/* Navigation */}

      <nav className="sidebar-menu">

        {menuItems.map((item) => (
          <NavLink
            key={item.name}
            to={item.path}
            className={({ isActive }) =>
              isActive ? "menu-item active" : "menu-item"
            }
          >
            <span className="menu-icon">{item.icon}</span>

            <span>{item.name}</span>
          </NavLink>
        ))}

      </nav>

      {/* Storage */}

      <div className="storage-card">

        <div className="storage-top">

          <span>Storage</span>

          <span>24%</span>

        </div>

        <div className="storage-bar">

          <div className="storage-fill"></div>

        </div>

        <p>2.4 GB of 10 GB Used</p>

      </div>

      {/* Logout */}

      <button className="logout-btn">

        <FiLogOut />

        Logout

      </button>

    </motion.aside>
  );
};

export default Sidebar;