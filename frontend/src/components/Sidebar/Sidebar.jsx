import { motion } from "framer-motion";
import { NavLink, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
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
  const navigate = useNavigate();

  const [mobileOpen, setMobileOpen] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

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
      name: "Profile",
      icon: <FiSettings />,
      path: "/profile",
    },
  ];

  useEffect(() => {
    const handleOpen = () => setMobileOpen(true);

    window.addEventListener("openSidebar", handleOpen);

    return () => {
      window.removeEventListener("openSidebar", handleOpen);
    };
  }, []);

  return (
    <>
      {/* Overlay */}

      <div
        className={`sidebar-overlay ${mobileOpen ? "show" : ""}`}
        onClick={() => setMobileOpen(false)}
      />

      <motion.aside
        className={`sidebar ${mobileOpen ? "show" : ""}`}
        initial={{ x: -80, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
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

        {/* Menu */}

        <nav className="sidebar-menu">
          {menuItems.map((item) => (
            <NavLink
              key={item.name}
              to={item.path}
              onClick={() => setMobileOpen(false)}
              className={({ isActive }) =>
                isActive ? "menu-item active" : "menu-item"
              }
            >
              <span className="menu-icon">{item.icon}</span>

              <span>{item.name}</span>
            </NavLink>
          ))}
        </nav>

        {/* Logout */}

        <button
          className="logout-btn"
          onClick={() => {
            setMobileOpen(false);
            handleLogout();
          }}
        >
          <FiLogOut />
          Logout
        </button>
      </motion.aside>
    </>
  );
};

export default Sidebar;