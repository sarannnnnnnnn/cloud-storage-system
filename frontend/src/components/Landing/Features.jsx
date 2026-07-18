import "../../styles/Features.css";

import {
  FaCloudUploadAlt,
  FaShieldAlt,
  FaShareAlt,
  FaMobileAlt,
} from "react-icons/fa";

function Features() {
  const features = [
    {
      icon: <FaCloudUploadAlt />,
      title: "Fast Upload",
      desc: "Upload files securely with high-speed cloud storage.",
    },
    {
      icon: <FaShieldAlt />,
      title: "Secure Storage",
      desc: "JWT Authentication and AWS S3 protected storage.",
    },
    {
      icon: <FaShareAlt />,
      title: "Easy Sharing",
      desc: "Generate secure shareable links instantly.",
    },
    {
      icon: <FaMobileAlt />,
      title: "Access Anywhere",
      desc: "Works perfectly on Desktop, Tablet and Mobile.",
    },
  ];

  return (
    <section id="features" className="features">
      <h2>Why Choose Cloud Storage System?</h2>

      <p className="feature-subtitle">
        Powerful cloud storage with enterprise-grade security.
      </p>

      <div className="feature-grid">
        {features.map((feature, index) => (
          <div className="feature-card" key={index}>
            <div className="feature-icon">{feature.icon}</div>

            <h3>{feature.title}</h3>

            <p>{feature.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

export default Features;