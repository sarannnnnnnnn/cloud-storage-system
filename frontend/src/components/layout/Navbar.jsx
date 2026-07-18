import { Link } from "react-router-dom";
import { FaCloud } from "react-icons/fa";
import "../../styles/Navbar.css";

function Navbar() {
  return (
    <nav className="navbar">

      <div className="logo">
        <FaCloud className="cloud-icon" />
        <span>Cloud Storage System</span>
      </div>

      <ul className="nav-links">

  <li
  onClick={() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }}
>
  Home
</li>

  <li
    onClick={() =>
      document.getElementById("features").scrollIntoView({
        behavior: "smooth",
      })
    }
  >
    Features
  </li>

<li
  onClick={() =>
    document.getElementById("preview").scrollIntoView({
      behavior: "smooth",
      block: "start",
    })
  }
>
  Preview
</li>

  <li
    onClick={() =>
      document.getElementById("about").scrollIntoView({
        behavior: "smooth",
      })
    }
  >
    About
  </li>

</ul>

      <div className="nav-buttons">
        <Link to="/login">
          <button className="login-btn">
            Login
          </button>
        </Link>

        <Link to="/register">
          <button className="register-btn">
            Register
          </button>
        </Link>
      </div>

    </nav>
  );
}

export default Navbar;