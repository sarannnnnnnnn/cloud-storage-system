import { motion } from "framer-motion";
import { NavLink } from "react-router-dom";
import { useNavigate } from "react-router-dom";
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

      {/* Logout */}

      <button
  className="logout-btn"
  onClick={handleLogout}
>

        <FiLogOut />

        Logout

      </button>

    </motion.aside>
  );
};

export default Sidebar;