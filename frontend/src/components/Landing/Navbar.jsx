import { Link } from "react-router-dom";
import { FaCloud } from "react-icons/fa";

import "../../styles/landing/Navbar.css";

const scrollToSection = (id) => {

  if (id === "home") {
    window.lenis.scrollTo(0, {
      duration: 1.5,
    });
    return;
  }

  const element = document.getElementById(id);

  if (!element || !window.lenis) return;

  const offsets = {
    features: -50,
    preview: -30,
    about: -30,
  };

  window.lenis.scrollTo(element, {
    offset: offsets[id] ?? -80,
    duration: 1.5,
  });

};


function Navbar() {
  return (
    <header className="landing-navbar">

      <div className="landing-logo">

        <FaCloud className="landing-logo-icon" />

        <h2>Cloud Storage</h2>

      </div>

      <nav className="landing-nav-links">

        <a
  href="#home"
  onClick={(e) => {
    e.preventDefault();
    scrollToSection("home");
  }}
>
  Home
</a>

        <a
  href="#features"
  onClick={(e) => {
    e.preventDefault();
    scrollToSection("features");
  }}
>
  Features
</a>

        <a
  href="#preview"
  onClick={(e) => {
    e.preventDefault();
    scrollToSection("preview");
  }}
>
  Preview
</a>

        <a
  href="#about"
  onClick={(e) => {
    e.preventDefault();
    scrollToSection("about");
  }}
>
  About
</a>

      </nav>

      <div className="landing-nav-buttons">

        <Link to="/login">
          <button className="landing-login-btn">
            Login
          </button>
        </Link>

        <Link to="/register">
          <button className="landing-register-btn">
            Register
          </button>
        </Link>

      </div>

    </header>
  );
}

export default Navbar;